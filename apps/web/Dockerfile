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
# Coolify's health probe requires curl/wget in the image
RUN apt-get update \
  && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app /app

ENV HOST=0.0.0.0
# Nitro's node-server defaults to 3000; the PORT env set by the image is not
# reliably carried into Coolify's container launch, so the server listens on 3000.
ENV PORT=3000
# node:24-slim has no curl/wget by default; installed above for Coolify's probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ -o /dev/null

EXPOSE 3000
WORKDIR /app/apps/web
CMD ["node", ".output/server/index.mjs"]
