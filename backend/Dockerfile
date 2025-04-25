# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app (source files)
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port (change to your app's port if different)
EXPOSE 4000

# Run the app
CMD ["node", "dist/server.mjs"]
