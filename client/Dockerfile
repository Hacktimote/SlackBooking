
#####################
# 1 - Install cordova, android sdk and yarn
#####################

# https://hub.docker.com/r/bringnow/android-sdk/~/dockerfile/
# FROM beevelop/cordova

# # Install Yarn on cordova container
# RUN apt-get update
# RUN apt-get install apt-transport-https
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get update
# RUN apt-get install -y yarn
# RUN rm -rf /var/lib/apt/lists/* && \
#     apt-get clean;

# # Run the project
# ENV HOME=/project_client
# RUN mkdir -p $HOME
# COPY package.json package-lock.json yarn.lock $HOME/
# WORKDIR $HOME
# RUN yarn install


#####################
# 2 - The install without corodva (lighter)
#####################
FROM mhart/alpine-node:8
ENV HOME=/project_client
RUN mkdir -p $HOME
COPY package.json package-lock.json yarn.lock $HOME/
WORKDIR $HOME
RUN yarn install