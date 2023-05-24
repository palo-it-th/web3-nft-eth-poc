# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 synthetixio/docker-e2e:18.16-debian as base

RUN mkdir /app
WORKDIR /app
RUN apt-get update && apt-get install netcat -y

# Don't copy as everything is already copied in the last step
# COPY node_modules ./node_modules

FROM base as test
COPY . .