FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN NODE_ENV=production npm ci
RUN npm install --silent
COPY . .
CMD ["npm", "start"]