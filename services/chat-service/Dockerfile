# -------------------------------
# 1. Use official Node.js LTS image
# -------------------------------
FROM node:20-alpine AS base

# Set working directory inside container
WORKDIR /usr/hey-app/services/chat-service

# -------------------------------
# 2. Copy package files first for dependency installation
# -------------------------------
COPY services/chat-service/package*.json ./ 

# Install only production dependencies (no dev)
RUN npm ci --omit=dev


# -------------------------------
# 3. Copy the rest of the source code
# -------------------------------
# Copy service code
COPY services/chat-service/src ./src

# Copy shared folder
COPY shared /usr/hey-app/shared

# Copy env
COPY services/chat-service/.chat.env .

# -------------------------------
# 4. Expose the service port
# -------------------------------
EXPOSE 3006

# -------------------------------
# 5. Set environment variables (optional defaults)
# -------------------------------
ENV NODE_ENV=production
ENV DB_HOST=host.docker.internal
ENV REDIS_HOST=host.docker.internal
ENV API_URL=host.docker.internal

# -------------------------------
# 6. Run the application
# -------------------------------
CMD ["node", "src/server.js"]
