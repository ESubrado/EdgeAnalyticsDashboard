FROM node:20-alpine AS client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm ci --legacy-peer-deps
COPY client/ ./
RUN npm run build

FROM node:20-alpine AS server-build
WORKDIR /server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY --from=server-build /server/dist ./dist
COPY --from=client-build /client/build/client ./client/build/client
EXPOSE 10000
ENV NODE_ENV=production
CMD ["node", "dist/server.js"]
