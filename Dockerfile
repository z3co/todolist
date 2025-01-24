FROM node:23-alpine

USER node

WORKDIR /node

COPY package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node ./build .

EXPOSE 3000

CMD [ "node", "index.js" ]
