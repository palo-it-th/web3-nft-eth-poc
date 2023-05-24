# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 synthetixio/docker-e2e:18.16-debian as base

RUN mkdir /app
WORKDIR /app
RUN apt-get update && apt-get install netcat libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y
# Don't copy as everything is already copied in the last step
# COPY node_modules ./node_modules

FROM base as test
COPY . .