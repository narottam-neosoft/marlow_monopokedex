# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:16 as base
WORKDIR /app
COPY ./package.json ./

COPY ./lerna.json ./
COPY . /app
RUN yarn bootstrap
RUN yarn build

EXPOSE 3000
CMD ["yarn", "prod"]