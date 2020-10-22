FROM node:10.15.3
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${EXTERNAL_SERVER_PORT}
CMD npm run prod
