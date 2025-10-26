# -------------------------------
# 1. Base Node.js image
# -------------------------------
FROM node:20-alpine AS base

# Set working directory
WORKDIR /usr/hey-app/services/telegram-bot-service

# -------------------------------
# 2. Copy package files
# -------------------------------
COPY services/telegram-bot-service/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# -------------------------------
# 3. Copy source code and shared folder
# -------------------------------
COPY services/telegram-bot-service/src ./src
COPY shared /usr/hey-app/shared
COPY services/telegram-bot-service/.telegram.env ./
COPY services/telegram-bot-service/tsconfig.json ./

# -------------------------------
# 4. Install TypeScript temporarily for build
# -------------------------------
RUN npm install ts-node --no-save

# -------------------------------
# 6. Expose service port
# -------------------------------
EXPOSE 3003

# -------------------------------
# 7. Set environment variables
# -------------------------------
# ENV PROXY='socks5://host.docker.internal:10808';
ENV NODE_ENV=production
ENV API_URL=host.docker.internal
ENV DB_HOST=host.docker.internal
ENV REDIS_HOST=host.docker.internal

# -------------------------------
# 8. Run compiled JavaScript
# -------------------------------
CMD ["npx","ts-node", "src/server.ts"]
  