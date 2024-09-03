FROM node:latest
WORKDIR app/
COPY . .
RUN "sh -c 'npm install && npm run dev'"
