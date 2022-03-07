FROM nginx:1.15.8

RUN rm -f /etc/nginx/conf.d/*

RUN mkdir /public

CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf