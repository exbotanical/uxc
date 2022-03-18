FROM nginx:alpine
RUN rm /etc/nginx/conf.d/*
COPY ./default.conf /etc/nginx/conf.d/
COPY ./certs/localhost.key /etc/ssl/private/
COPY ./certs/localhost.crt /etc/ssl/certs/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
