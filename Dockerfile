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
# Install only production dependencies (skip postinstall scripts since nuxt is a dev dependency)
RUN npm ci --omit=dev --ignore-scripts

FROM node:20-slim AS runner


WORKDIR /app

# Copy production dependencies first
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy Prisma schema (needed for migrations at runtime if needed)
COPY --from=build /app/prisma ./prisma

# Copy Prisma generated client from build stage (overwrites the one from prod-deps)
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

# Copy built application
COPY --from=build /app/.output .output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

