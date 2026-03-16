# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Copy manifests first for better layer caching
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

# Install ALL dependencies (devDeps needed for build)
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build client + server bundle
RUN pnpm build

# ── Stage 2: Production image ────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Copy manifests
COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/

# Install ALL dependencies (vite plugins are referenced in the server bundle via dynamic imports)
RUN pnpm install --frozen-lockfile

# Copy built output from builder stage
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/index.js"]
