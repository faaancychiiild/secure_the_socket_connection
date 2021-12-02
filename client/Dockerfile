FROM node:14.17
WORKDIR /app/client
COPY ["package.json", "./"]
RUN npm install --production
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start", "-e", "production"]