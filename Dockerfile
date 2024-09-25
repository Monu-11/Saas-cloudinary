FROM alpine:3.19

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Set the working directory
WORKDIR /src



# You only need to copy next.config.js if you are NOT using the default configuration
COPY next.config.js ./
COPY public ./public
COPY package.json .env .env.local env.sh ./

COPY ./prisma .
RUN npx prisma generate

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY .next/standalone ./
COPY .next/static ./.next/static

# Expose the port
EXPOSE 3000


RUN chmod +x ./env.sh
ENTRYPOINT ["./env.sh"]

# Start the application
CMD ["npm", "start"]
