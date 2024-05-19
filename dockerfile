# Choose the Node.js LTS (Long Term Support) version
FROM node:22

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies in the Docker container
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose the port that your app runs on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]