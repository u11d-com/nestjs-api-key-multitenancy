FROM node:22.16.0-alpine3.22 AS dependencies
WORKDIR /dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && \
    yarn cache clean

FROM node:22.16.0-alpine3.22 AS builder
WORKDIR /build
COPY . .
COPY --from=dependencies /dependencies .
ENV NODE_ENV=production
RUN yarn build
RUN yarn install --frozen-lockfile --prod && \
    yarn cache clean

FROM node:22.16.0-alpine3.22 AS runner
WORKDIR /app
COPY --chown=node:node --from=builder /build/node_modules ./node_modules
COPY --chown=node:node --from=builder /build/dist ./dist
USER node
EXPOSE 8000
CMD ["sh", "-c", "node --trace-warnings dist/main.js"]
