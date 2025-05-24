FROM node:20-alpine

WORKDIR /app

COPY app/frontend/.yarnrc.yml ./
COPY app/frontend/.yarn ./.yarn
COPY app/frontend/package.json app/frontend/yarn.lock ./

RUN yarn install

COPY app/frontend/ .

EXPOSE 3000

CMD ["yarn", "dev"]