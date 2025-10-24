# -------------------------------
# 1. Use official Node.js LTS image
# -------------------------------
FROM node:20-alpine AS base

# Set working directory inside container
WORKDIR /usr/src/chat-service

# -------------------------------
# 2. Copy package files first for dependency installation
# -------------------------------
COPY package*.json ./

# Install only production dependencies (no dev)
RUN npm ci --omit=dev

# -------------------------------
# 3. Copy the rest of the source code
# -------------------------------
COPY ./src ./src

# -------------------------------
# 4. Expose the service port
# -------------------------------
EXPOSE 3006

# -------------------------------
# 5. Set environment variables (optional defaults)
# -------------------------------
ENV NODE_ENV=production

# -------------------------------
# 6. Run the application
# -------------------------------
CMD ["node", "src/server.js"]
