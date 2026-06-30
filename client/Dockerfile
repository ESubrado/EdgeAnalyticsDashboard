FROM node:20-alpine AS build-env
WORKDIR /app
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
COPY package*.json ./
RUN npm ci --registry https://registry.npmjs.org
COPY . ./
RUN npm run build

FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=build-env /app/build/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
