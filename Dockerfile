# Download and install the dependencies for building the app
FROM node:24.11.0-alpine3.22 AS build-dependencies

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

WORKDIR /src
COPY ./package.json pnpm-lock.yaml /src/
RUN pnpm install --frozen-lockfile --ignore-scripts

# Download and install the dependencies for running the app
FROM node:24.11.0-alpine3.22 AS production-dependencies

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

WORKDIR /src
COPY ./package.json pnpm-lock.yaml /src/
RUN pnpm install --frozen-lockfile --ignore-scripts --prod

# Build the app
FROM node:24.11.0-alpine3.22 AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Create app directory
WORKDIR /src

# Copy the build dependencies
COPY --from=build-dependencies /src/node_modules node_modules/

# Copy root level files
COPY package.json pnpm-lock.yaml tsconfig.json vite.config.ts ./
COPY app/ app/
COPY public/ public/

RUN pnpm run build

# Final image that runs the app
FROM node:24.11.0-alpine3.22

ENV NODE_ENV=production

WORKDIR /home/node/src
# Move only the files to the final image that are really needed
COPY package.json pnpm-lock.yaml ./
COPY --from=production-dependencies /src/node_modules/ ./node_modules/
COPY --from=build /src/build/ ./build/
COPY --from=build /src/public/ ./public/

# Ensure the node user owns all files in the working directory
RUN chown -R node:node /home/node/src

# Switch to non-root user
USER node

EXPOSE 3000

CMD ["node_modules/.bin/react-router-serve", "build/server/index.js"]
