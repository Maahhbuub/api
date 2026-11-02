# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Expose application port
EXPOSE 5000

# Start application
CMD ["npm", "start"]