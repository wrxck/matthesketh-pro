# Production stage
FROM node:20-alpine

RUN apk add --no-cache dumb-init curl

WORKDIR /app

RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 -G appuser

COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY server.js ./

RUN chown -R appuser:appuser /app

USER appuser

ENV NODE_ENV=production
ENV PORT=3092

EXPOSE 3092

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3092/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
