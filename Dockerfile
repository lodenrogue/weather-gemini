FROM alpine:3.13.5

RUN apk add --update nodejs nodejs-npm

RUN apk add --update openssl

COPY ./ /app

WORKDIR /app

RUN openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj '/CN=localhost'

RUN npm install

ENTRYPOINT ["node", "app.js"]
