FROM node:14-alpine
COPY . /app
WORKDIR /app
CMD "yarn start -p 2085"
