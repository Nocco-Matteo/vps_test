FROM node:14

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    curl \
    gnupg \
    build-essential

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
