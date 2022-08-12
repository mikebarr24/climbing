FROM node:16-alpine3.16
WORKDIR /app
RUN npm install -g nodemon
RUN addgroup nonroot && adduser -S -D -G nonroot nonroot
COPY package*.json .
RUN apk add --update --no-cache make gcc g++ python3 && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3
RUN chown -R nonroot /app
USER nonroot
COPY . .
EXPOSE 3001
CMD ["nodemon", "index.js"]