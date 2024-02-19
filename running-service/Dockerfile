FROM node:20-alpine3.18 as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine3.18

WORKDIR /app

COPY --from=builder /app/package.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 4005

CMD ["npm", "start"]