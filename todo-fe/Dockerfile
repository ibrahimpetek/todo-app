# ---- Derleme aşaması ----
FROM node:24-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# React ortam değişkenleri çalışma anında değil, DERLEME anında koda gömülür
ARG REACT_APP_API_BASE_URL=http://localhost:8300/api/todos
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm run build

# ---- Çalıştırma aşaması: statik dosyaları nginx sunar ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80