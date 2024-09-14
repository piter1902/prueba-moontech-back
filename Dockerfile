from node:20

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npm install

RUN npm run build

WORKDIR /app/dist

ENTRYPOINT [ "npm", "run", "start:prod"]