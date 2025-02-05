# Stage 1: Prune dependencies
FROM node:latest AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=email-service --docker

# Stage 2: Install dependencies
FROM node:latest AS installer
WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm install

# Stage 3: Build the service
FROM node:latest AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
CMD ["npm", "run", "build"]

# Stage 4: Run the service
FROM node:latest AS runner
WORKDIR /app
COPY --from=builder /app/ .
CMD ["node", "apps/email-service/dist/index.js"]
