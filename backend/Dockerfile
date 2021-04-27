FROM node:alpine

RUN apk add --update \
  python \
  python-dev \
  py-pip \
  build-base \
  git \
  openssh-client \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

WORKDIR '/app'
COPY ./package.json ./
RUN npm install --only=prod
COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "dev"]