# Install candroid sdk
# FROM beevelop/cordova
# RUN apt-get update && apt-get install -y git && \
#     rm -rf /var/lib/apt/lists/* && apt-get clean


# Configure client aap
FROM mhart/alpine-node:8

ENV HOME=/project_client

RUN mkdir -p $HOME

COPY package.json yarn.lock $HOME/
WORKDIR $HOME
RUN yarn install
RUN yarn global add cordova

