FROM node:20

ENV VITE_BACKEND_URL=http://localhost:4000

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]