FROM node:20-slim AS deps

WORKDIR /app

COPY package*.json ./
# Install all dependencies (including devDependencies for build)
RUN npm ci

FROM node:20-slim AS build

WORKDIR /app

COPY --from=deps /app/node_modules node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

FROM node:20-slim AS prod-deps

WORKDIR /app

COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production

FROM node:20-slim AS runner

ENV NODE_ENV=production \
    NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0

WORKDIR /app

# Copy Prisma schema (needed for migrations at runtime if needed)
COPY --from=build /app/prisma ./prisma

# Copy Prisma generated client from build stage
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application
COPY --from=build /app/.output .output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

