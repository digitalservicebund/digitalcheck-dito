# Download and install the dependencies for building the app
FROM node:26.1.0-alpine3.23 AS base

ENV PNPM_HOME="/pnpm"
ENV MISE_DATA_DIR="/mise"
ENV PATH="$PNPM_HOME:/mise/shims:$PATH"
# Alpine v3.23's own community repo ships mise 2025.8.20, which predates aqua
# libc-variant support (https://github.com/jdx/mise/pull/9652) and fails to
# install musl-aware tools like pnpm. Pull mise from edge instead, keeping the
# rest of the base image on v3.23.
RUN apk add --no-cache --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community mise

FROM base AS build
WORKDIR /src
COPY mise.toml ./
# Installs the exact pnpm version pinned in mise.toml
RUN mise trust && mise install pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts


COPY tsconfig.json astro.config.mjs ./
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
	&& echo 'include /etc/nginx/sites-enabled/*;' > /etc/nginx/nginx.conf
USER nginx

# Default values - get overwritten by kubernetes manifests
ENV NGINX_DIR=production
ENV RESOLVER=1.1.1.1

EXPOSE 8080
CMD ["sh", "-c", "envsubst '$NGINX_DIR $RESOLVER' < /etc/nginx/nginx.template.conf > /etc/nginx/sites-enabled/nginx.conf && nginx -g 'daemon off;'"]
