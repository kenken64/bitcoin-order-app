FROM node:12.2.0

WORKDIR '/app'

COPY package.json .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @angular/cli -y
RUN npm install -y

COPY . .

RUN ng build --prod

FROM nginx:latest

EXPOSE 80:80
COPY --from=0 /app/dist/bitcoin /usr/share/nginx/html