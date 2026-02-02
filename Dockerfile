# 静态站点：Nginx 托管当前目录
# 使用国内镜像，避免阿里云构建时拉取 Docker Hub 超时
FROM docker.m.daocloud.io/library/nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html/

# 若用子路径部署可加：COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
