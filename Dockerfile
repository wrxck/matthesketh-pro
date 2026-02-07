# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY svelte.config.js vite.config.ts tsconfig.json ./
COPY src/ ./src/
COPY static/ ./static/

RUN npm run build

# Production stage
FROM node:20-alpine

RUN apk add --no-cache dumb-init curl

WORKDIR /app

RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 -G appuser

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/build ./build

RUN chown -R appuser:appuser /app

USER appuser

ENV NODE_ENV=production
ENV PORT=60610
ENV ORIGIN=https://matthesketh.pro

EXPOSE 60610

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:60610/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "build"]
