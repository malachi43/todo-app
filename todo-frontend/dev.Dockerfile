FROM node:20

WORKDIR /usr/src/app

COPY . .

# we use npm install because we are running in development mode.
RUN npm install

# npm run dev starts the app in development mode
CMD ["npm", "run", "dev", "--", "--host"]