FROM node:25.9.0-alpine3.23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

FROM base AS build
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . /app
RUN pnpm run build

FROM nginx:1.29.8-alpine AS runtime
COPY ./nginx/nginx.template.conf /etc/nginx/nginx.template.conf
COPY --from=build /app/dist /usr/share/nginx/production

# assign privileges and switch to non-root user
RUN mkdir /etc/nginx/sites-enabled && \
		touch /run/nginx.pid && \
    chown -R nginx /etc/nginx/sites-enabled /var/cache/nginx /run/nginx.pid && \
		chmod -R o+w /etc/nginx/sites-enabled /var/cache/nginx /run/nginx.pid && \
 		echo 'include /etc/nginx/sites-enabled/*;' > /etc/nginx/nginx.conf

# replace variables in the NGINX configuration
ENV NGINX_DIR=production
ENV RESOLVER=1.1.1.1
USER nginx
CMD ["sh", "-c", "envsubst '$NGINX_DIR,$RESOLVER' < /etc/nginx/nginx.template.conf > /etc/nginx/sites-enabled/nginx.conf && nginx -g 'daemon off;'"]
EXPOSE 8080
