# 静态站点：Nginx 托管当前目录
FROM nginx:alpine

# 国内可换镜像：docker.m.daocloud.io/library/nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html/

# 若用子路径部署可加：COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
