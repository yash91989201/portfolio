FROM oven/bun:1.4.0 AS builder
WORKDIR /app
ENV SKIP_ENV_VALIDATION=1
# the build evaluates the auth config; the real secret comes from compose at runtime
ENV BETTER_AUTH_SECRET=build-time-placeholder-secret-not-used-at-runtime

COPY . .
RUN --mount=type=cache,target=/root/.bun/install/cache bun install

ENV NODE_ENV=production
RUN cd apps/web && bun run build
ENV SKIP_ENV_VALIDATION=
ENV BETTER_AUTH_SECRET=

FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app /app

ENV HOST=0.0.0.0
ENV PORT=3001
# node:24-slim ships no curl/wget; Node 24 has global fetch, so probe via node.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3001/').then(r=>process.exit(r.status<500?0:1)).catch(()=>process.exit(1))"

# SSR chunks require workspace dependencies at runtime
WORKDIR /app/apps/web
CMD ["node", ".output/server/index.mjs"]
