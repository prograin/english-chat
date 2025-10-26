# -------------------------------
# 1. Use official Node.js LTS image
# -------------------------------
FROM node:20-alpine AS base

# Set working directory inside container
WORKDIR /usr/hey-app/services/search-service

# -------------------------------
# 2. Copy package files first for dependency installation
# -------------------------------
COPY services/search-service/package*.json ./ 

# Install only production dependencies (no dev)
RUN npm ci --omit=dev


# -------------------------------
# 3. Copy the rest of the source code
# -------------------------------
# Copy service code
COPY services/search-service/src ./src

# Copy shared folder
COPY shared /usr/hey-app/shared

# Copy env
COPY services/search-service/.search.env .

# -------------------------------
# 4. Expose the service port
# -------------------------------
EXPOSE 3005

# -------------------------------
# 5. Set environment variables (optional defaults)
# -------------------------------
ENV NODE_ENV=production
ENV DB_HOST=host.docker.internal
ENV REDIS_HOST=host.docker.internal
ENV API_URL=host.docker.internal
ENV ELASTIC_HOST=host.docker.internal

# -------------------------------
# 6. Run the application
# -------------------------------
CMD ["node", "src/server.js"]
