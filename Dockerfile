FROM alpine:3.19

WORKDIR /src

COPY package* .
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm" , "start"]