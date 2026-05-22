# Download and install the dependencies for building the app
FROM node:26.1.0-alpine3.23 AS base 

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

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

FROM nginx:1.31.0-alpine AS runtime

COPY ./nginx.template.conf /etc/nginx/nginx.template.conf
COPY --from=build /src/dist_production /usr/share/nginx/production
COPY --from=build /src/dist_staging /usr/share/nginx/staging

# assign privileges and switch to non-root user
RUN mkdir /etc/nginx/sites-enabled \
	&& touch /run/nginx.pid \
	&& chown -R nginx /etc/nginx/sites-enabled /var/cache/nginx /run/nginx.pid \
	&& chmod -R o+w /etc/nginx/sites-enabled /var/cache/nginx /run/nginx.pid \
	&& echo 'include /etc/nginx/sites-enabled/*;' > /etc/nginx/nginx.conf
USER nginx

# Default values - get overwritten by kubernetes manifests
ENV NGINX_DIR=production
ENV RESOLVER=1.1.1.1

EXPOSE 8080
CMD ["sh", "-c", "envsubst '$NGINX_DIR $RESOLVER' < /etc/nginx/nginx.template.conf > /etc/nginx/sites-enabled/nginx.conf && nginx -g 'daemon off;'"]
