# Use the official Node.js image as the base image for the build stage
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm i

# Copy the application source code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use the official Node.js Alpine image as the base image for the runtime stage
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm i --only=production

# Copy the build output from the build stage
COPY --from=build /usr/src/app/dist /usr/src/app/dist

# Expose the port the app will run on
EXPOSE 8080

# Start the application
CMD ["node", "dist/src/main.js"]