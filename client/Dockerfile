# TODO: Uncomment only this part if your env is not configured with Cordova
# Install candroid sdk
# https://hub.docker.com/r/bringnow/android-sdk/~/dockerfile/
# FROM beevelop/cordova
# RUN apt-get update && apt-get install -y git && \
#     rm -rf /var/lib/apt/lists/* && apt-get clean


# Configure client aap
FROM mhart/alpine-node:8

ENV HOME=/project_client

RUN mkdir -p $HOME
COPY package.json package-lock.json yarn.lock $HOME/
WORKDIR $HOME
RUN yarn install
RUN npm install -g cordova

