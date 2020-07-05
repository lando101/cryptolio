# USED FOR RUNNING IN PROD
# STEP 1
# smaller version of node modules
# FROM node:alpine as BUILD

# name of app in docker
# WORKDIR '/app'

# copying file into docker
# COPY package.json .

# install node modules into container
# RUN npm install

# COPY . .

# when container is spun up this command will run :: ng serve
# RUN npm run build


# STEP 2
# FROM nginx
# EXPOSE 80
# copies from stage 1 into nginx
# COPY --from=BUILD /app/dist/starter-kit-master /usr/share/nginx/html

#======================================================================


# USED WHEN JUST RUNNING LOCALLY IN A DOCKER CONTAINER
# smaller version of node modules
FROM node:alpine

# name of app in docker
WORKDIR '/app'

# copying file into docker
COPY package.json .

# install node modules into container
RUN npm install

COPY . .

# port number
EXPOSE 4200
