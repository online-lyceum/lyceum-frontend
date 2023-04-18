FROM node:slim AS runner
RUN npm install -g http-server


FROM node:lts-alpine AS builder
WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app/ .
RUN npm run build

FROM runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD npx http-server dist --proxy https://${VUE_APP_TIME_API_URL} -gb --log-ip --port 80
