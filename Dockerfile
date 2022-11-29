# syntax=docker/dockerfile:1
FROM synthetixio/docker-e2e:16.17-ubuntu as base

RUN mkdir /app
WORKDIR /app

# Don't copy as everything is already copied in the last step
# COPY node_modules ./node_modules

FROM base as test
COPY . .