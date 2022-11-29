# syntax=docker/dockerfile:1
FROM synthetixio/docker-e2e:16.17-ubuntu as base

RUN mkdir /app
WORKDIR /app

COPY node_modules ./node_modules

FROM base as test
COPY . .