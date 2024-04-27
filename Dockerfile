# Based on the official Node.js image as the base image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application source code
COPY . .

#Expose port
EXPOSE 3000

#Define startup command
CMD [ "node", "index.js" ]
