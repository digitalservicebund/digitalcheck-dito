# Download and install the dependencies for building the app
FROM node:24.11.0-alpine3.22 AS build-dependencies

WORKDIR /src
COPY ./package.json package-lock.json /src/
RUN npm ci --ignore-scripts

# Download and install the dependencies for running the app
FROM node:24.11.0-alpine3.22 AS production-dependencies

ENV NODE_ENV=production
WORKDIR /src
COPY ./package.json package-lock.json /src/
RUN npm ci --ignore-scripts

# Build the app
FROM node:24.11.0-alpine3.22 AS build

# Create app directory
WORKDIR /src

# Copy the build dependencies
COPY --from=build-dependencies /src/node_modules node_modules/

# Copy root level files
COPY package.json package-lock.json tsconfig.json vite.config.ts ./
COPY app/ app/
COPY public/ public/

# Allow DEBUG_BUILD to be passed as build arg to disable minification for debugging
# Usage: docker build --build-arg DEBUG_BUILD=true ...
ARG DEBUG_BUILD=false
ENV DEBUG_BUILD=${DEBUG_BUILD}

# Set NODE_ENV based on DEBUG_BUILD to enable React development mode for better error messages
# When DEBUG_BUILD=true, use development mode; otherwise use production
# This must be set before the build so React uses the development build
RUN if [ "$DEBUG_BUILD" = "true" ]; then \
      export NODE_ENV=development; \
    else \
      export NODE_ENV=production; \
    fi && \
    npm run build

# Final image that runs the app
FROM node:24.11.0-alpine3.22

# Allow DEBUG_BUILD to be passed to runtime as well
ARG DEBUG_BUILD=false
ENV DEBUG_BUILD=${DEBUG_BUILD}

# Default to production, will be overridden in CMD if DEBUG_BUILD=true
ENV NODE_ENV=production

ENV npm_config_cache=/tmp/.npm

WORKDIR /home/node/src
# Move only the files to the final image that are really needed
COPY package.json package-lock.json ./
COPY --from=production-dependencies /src/node_modules/ ./node_modules/
COPY --from=build /src/build/ ./build/
COPY --from=build /src/public/ ./public/

# Ensure the node user owns all files in the working directory
RUN chown -R node:node /home/node/src

# Switch to non-root user
USER node

EXPOSE 3000

# Set NODE_ENV at runtime based on DEBUG_BUILD
CMD sh -c 'if [ "$DEBUG_BUILD" = "true" ]; then export NODE_ENV=development && npm run start; else export NODE_ENV=production && npm run start; fi'
