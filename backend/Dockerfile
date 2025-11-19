FROM node:20 AS base

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "app.js"]
