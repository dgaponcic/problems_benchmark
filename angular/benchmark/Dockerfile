
# FROM node AS build-stage
# WORKDIR /app

# COPY package.json ./
# COPY angular.json ./
# COPY tsconfig.json ./
# RUN npm install -g @angular/cli && npm install

# COPY . .
# EXPOSE 4200

# CMD ["ng","serve","--host", "0.0.0.0", "--disableHostCheck"]


# ============================

FROM node AS build-stage
WORKDIR /app

COPY package.json ./
COPY angular.json ./
COPY tsconfig.json ./
RUN npm install -g @angular/cli && npm install

COPY . .

ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration


# Build runtime image
FROM nginx:alpine

FROM nginx
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build-stage /app/dist/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 4200 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
