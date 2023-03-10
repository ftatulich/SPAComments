# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the production version of the application
RUN npm run build

# Expose port 3000 for the application to run on
EXPOSE 3000

# Set the command to start the application
CMD [ "npm", "start" ]
