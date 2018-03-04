FROM mhart/alpine-node:8

ENV HOME=/project_client

RUN mkdir -p $HOME

COPY package.json yarn.lock $HOME/
WORKDIR $HOME
RUN yarn install

# CMD ["npm", "start"]
