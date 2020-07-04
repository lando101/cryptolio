# smaller version of node modules
FROM node:alpine

# name of app in docker
WORKDIR '/app'

# copying file into docker
COPY package.json .

# install node modules into container
RUN npm-install

COPY . .

# port number
EXPOSE 4200

# when container is spun up this command will run :: ng serve
CMD npm run start
