FROM node:12.21.0-alpine

#ARG NODE_ENV=production
ARG RUN_ENV=production
ARG GENERATE_SOURCEMAP=false

WORKDIR /edoctor/web/spo2

COPY ./package.json ./
COPY ./package-lock.json ./
#COPY ./.npmrc ./

RUN npm install --quiet

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD npm start
