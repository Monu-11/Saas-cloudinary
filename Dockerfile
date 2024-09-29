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

# Set environment variable from build argument
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}

# Build the project
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
