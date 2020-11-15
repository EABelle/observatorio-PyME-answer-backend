FROM node:10.15.3
ENV AMQP_URL amqp://guest:guest@rabbitmq:5672
ENV MONGODB_URI mongodb://mongo:27017/observatorio-pyme
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${EXTERNAL_SERVER_PORT}
CMD npm run prod
