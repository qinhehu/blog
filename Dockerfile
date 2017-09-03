#设置基础镜像,如果本地没有该镜像，会从daocloud.io服务器pull镜像
FROM daocloud.io/node:latest

#创建app目录,保存我们的代码
RUN mkdir -p /usr/src/node
#设置工作目录
WORKDIR /usr/src/node

#复制所有文件到 工作目录。
COPY . /usr/src/node

#编译运行node项目，使用npm安装程序的所有依赖,利用taobao的npm安装

WORKDIR /usr/src/node/website
RUN npm install --registry=https://registry.npm.taobao.org

#暴露container的端口
EXPOSE 3000

#运行命令
cmd ["npm","start"]
