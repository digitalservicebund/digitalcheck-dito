# Download and install the dependencies for building the app
FROM node:24.11.0-alpine3.22 AS base 

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

WORKDIR /src
COPY ./package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

FROM base AS build

COPY tsconfig.json astro.config.mjs ./
# perspektivisch wird app nicht mehr gebraucht bei abgeschlossener Migration
COPY app/ app/
COPY src/ src/
COPY public/ public/


RUN PUBLIC_STAGE=production pnpm run build --outDir dist_production
RUN PUBLIC_STAGE=staging    pnpm run build --outDir dist_staging

FROM nginx:1.29.8-alpine AS runtime

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist_production /usr/share/nginx/production
COPY --from=build /src/dist_staging /usr/share/nginx/staging

# run as non root user
RUN chown -R nginx:nginx /usr/share/nginx/html /etc/nginx/conf.d /var/cache/nginx /var/log/nginx \
	&& touch /var/run/nginx.pid \
	&& chown nginx:nginx /var/run/nginx.pid
USER nginx

# Default values - get overwritten by kubernetes manifests
ENV NGINX_DIR=production
ENV RESOLVER=1.1.1.1

EXPOSE 8080
CMD ["sh", "-c", "envsubst '$NGINX_DIR $RESOLVER' < /etc/nginx/conf.d/default.conf > /tmp/default.conf && mv /tmp/default.conf /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]