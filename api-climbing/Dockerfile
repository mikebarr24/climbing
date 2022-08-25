FROM node:16-alpine3.16
WORKDIR /app
RUN npm install -g nodemon
RUN addgroup nonroot && adduser -S -D -G nonroot nonroot
COPY package*.json .
RUN npm install
RUN chown -R nonroot /app
USER nonroot
COPY . .
EXPOSE 3001
CMD ["nodemon", "index.js"]