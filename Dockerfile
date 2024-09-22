FROM alpine:3.19

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

WORKDIR /src

COPY package* .
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm" , "start"]