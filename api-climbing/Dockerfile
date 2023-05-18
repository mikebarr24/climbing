FROM node:18.16-alpine3.17
WORKDIR /app
RUN npm install -g nodemon
RUN addgroup nonroot && adduser -S -D -G nonroot nonroot
COPY package*.json .
RUN npm install
RUN chown -R nonroot /app
USER nonroot
COPY . .
EXPOSE 8080
CMD ["nodemon", "index.js"]