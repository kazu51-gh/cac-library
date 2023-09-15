FROM node:18.12-alpine

WORKDIR /app/

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.js .


CMD npm run dev
