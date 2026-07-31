# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./

# Install all dependencies including devDependencies for build
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm ci --omit=dev

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8787

# Expose port
EXPOSE 8787

# Start the application
CMD ["node", "dist/index.js"]
