FROM node:12.2.0 as builder

WORKDIR '/app'

COPY package.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -y
RUN npm install -g @angular/cli -y

COPY ./ ./

RUN ng build --prod

COPY ./ ./

FROM nginx:latest

EXPOSE 80:80

COPY --from=builder /app/dist/angular-app /usr/share/nginx/html
