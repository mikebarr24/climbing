FROM node:16-alpine3.16
WORKDIR /app
RUN apk add --no-cache python3 py3-pip && \
  pip3 install --upgrade pip && \
  pip3 install awscli
RUN npm install -g nodemon
RUN addgroup nonroot && adduser -S -D -G nonroot nonroot
COPY package*.json .
RUN npm install
RUN chown -R nonroot /app
USER nonroot
COPY . .
EXPOSE 8080
CMD ["nodemon", "index.js"]