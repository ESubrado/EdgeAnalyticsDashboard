FROM node:20-alpine AS build
WORKDIR /app
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
COPY client/package*.json ./
RUN npm install --legacy-peer-deps --registry https://registry.npmjs.org
COPY client/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve --registry https://registry.npmjs.org
COPY --from=build /app/build/client ./public
EXPOSE 3000
CMD ["sh", "-c", "serve -s public -l ${PORT:-3000}"]
