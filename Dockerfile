# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 synthetixio/docker-e2e:20.0-debian

# Use bash for RUN/CMD
SHELL ["/bin/bash", "-c"]

RUN mkdir /app
WORKDIR /app
# Recommended dependencies for cypress
# https://docs.cypress.io/guides/getting-started/installing-cypress#UbuntuDebian
RUN apt-get update && apt-get install netcat libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y

# Install NVM to choose compatible node version
RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN source $NVM_DIR/nvm.sh && nvm install 18.14.2
CMD node -v

# Copy project into docker image
COPY . .