FROM node:14.16.0-alpine3.13 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=build /app/dist/Mysmitch /usr/share/nginx/html
EXPOSE 80