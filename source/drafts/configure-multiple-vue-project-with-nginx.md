---
title: CONFIGURE MULTIPLE VUE PROJECT WITH NGINX
date: 2018-03-15 21:32:26
tags: 
	- Web 
	- Nginx
---

# NGINX + VUE | 多个项目映射同一端口 | 多端口、不同路径指向同一项目


Nginx 的配置文件是学习 Nginx 的必经之路，配置文件的父子级关系是：main context \> http & event \> server \> location。[官网的配置文件示例](https://www.nginx.com/resources/wiki/start/topics/examples/full/)

## 多项目指向同一个端口

这是最常见的需求了，一般用 80 端口映射多个目录，根据不同的项目名字来划分访问的地址。

<!-- more -->

### VUE 项目配置
1. 找到并修改 `config/index.js` 这个文件，在配置的 build 中的 `assetsPublicPath` 从 `/` 修改为`/<项目名>/`。


2. 找到并修改 `src/router.js`。
```xml
	const router = new VueRouter({
		    base: "/<项目名>/",  // 添加这句
	    routes
	})
```

### Nginx配置
1. 找到并修改 Nginx 的配置文件。
```xml
		server {
		        listen       80;
		        server_name www.iweeek.com;
		        root  /usr/local/webserver/nginx/html;
		        index index.html;
		
		        location /<项目名1>{
		                index index.html;
		        }
		        location /<项目名2>  {
		        }
		        access_log on;
		        error_log  on;
		        include server.conf;
		}
```
2. 重启 Nginx ，使 Nginx 配置生效。
```bash
	$ ./nginx -s reload
```
3. 访问一下试试吧。
	`http://www.iweeek.com/项目名1`
	`http://www.iweeek.com/项目名2`
	这两个访问的效果是一样的。



## 多端口、不同路径指向同一项目

这个需求是我在工作上碰到的，之前已经发布了带着端口的链接，上面领导看到了，认为这丫的端口哪能随便暴露出去呢，改！不过想想也是，见过哪个网站域名后面加上端口的？一般都是内部使用带端口，端口又是越用越少的（包括 1023 以内的都是公认端口，在 /etc/services 里面可以看到这种映射关系），既然一个端口能抵多个项目，我何乐而不为呢！[端口的概念](http://www.cnblogs.com/kerrycode/p/5609010.html)

### VUE 项目配置

这个和多项目指向同一个端口一样，不用动。

### Nginx配置
1. 找到并修改 Nginx 配置文件。
```xml
		server {
		        listen       81;
		        server_name www.iweeek.com;
		        root  /usr/local/webserver/nginx/html;
		        index index.html;
		        location / {
		                index /<项目名>/index.html;
		        }
		        access_log on;
		        error_log  on;
		        include server.conf;
		}
```
2. 访问一下吧。

	`http://www.iweeek.com/项目名`
	`http://www.iweeek.com:81/` 
这两个访问的效果也是一样滴。


