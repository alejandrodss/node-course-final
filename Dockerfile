FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir build

COPY ./build/ ./build

EXPOSE 3000

RUN ls -ls ./build

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

CMD ["npm", "run",  "start-prod"]
