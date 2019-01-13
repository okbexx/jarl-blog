---
title: 搭建 IDEA license server 服务器
date: 2018-05-29 22:08:22
categories: dev
---

### 前言
若资金允许，请点击 [https://www.jetbrains.com/idea/buy/](https://www.jetbrains.com/idea/buy/) 购买正版

### 搭建
* 方法一：使用 nginx 反代
    ```
    server {
        location /idea/ {
            proxy_pass http://idea.lanyus.com/;
        }
    }
    ```
    然后使用 https://yourdomain.com/idea/ 即可

* 方法二：使用反代软件

    项目地址 ： [https://github.com/ilanyu/ReverseProxy](https://github.com/ilanyu/ReverseProxy)

    下载对应系统的二进制文件，下面以 linux-amd64 为例
    ```
    wget https://github.com/ilanyu/ReverseProxy/releases/download/v1.2/ReverseProxy_linux_amd64
    chmod a+x ReverseProxy_linux_amd64
    ./ReverseProxy_linux_amd64 -l "0.0.0.0:8888" -r http://idea.lanyus.com/
    ```
    然后使用 http://yourdomain.com:8888 即可

* 方法三：使用破解补丁

    [http://idea.lanyus.com/](http://idea.lanyus.com/)

### 激活网址
上面地址失效了可以换个试试

[http://xidea.online/](http://xidea.online/)
[http://idea.singee77.com/](http://idea.singee77.com/)
[http://idea.lanyus.com/](http://idea.lanyus.com/)