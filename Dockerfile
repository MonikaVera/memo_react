# Use a Node.js base image for building the React app
FROM node:14-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files for npm install
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the entire React app source code into the container
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx base image for serving the built React app
FROM nginx:alpine

# Copy the built React app from the build stage into the Nginx server's document root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Command to start the Nginx server and serve the React app
CMD ["nginx", "-g", "daemon off;"]