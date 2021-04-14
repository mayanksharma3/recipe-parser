FROM node

COPY . /sources
WORKDIR /sources

RUN npm install && npm run build

ENTRYPOINT ["npm", "start"]
