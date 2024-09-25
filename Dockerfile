FROM alpine:3.19

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Set the working directory
WORKDIR /src

# Copy package files and prisma schema
COPY package* . 
COPY ./prisma .

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy the entire project
COPY . .

# Build the project
# RUN npm run build
RUN NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=APP_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME npm run build

# Permisions to execute script
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
