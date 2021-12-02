ARG VERSION=14.17
FROM node:${VERSION}
WORKDIR /app/api
COPY ["package.json", ".env", "./"]
RUN npm install --production
COPY . .
EXPOSE 4000
ENTRYPOINT ["node", "index"]