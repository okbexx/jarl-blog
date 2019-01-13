---
title: 在VPS中利用vlmcsd搭建KMS激活服务器
date: 2018-06-18 12:38:22
categories: dev
---

> 如今我们经常会使用 KMS 对我们的 Windows/Office 进行激活，不过市面上流通着不少良莠不齐的 KMS 激活软件。其实，我们完全可以利用手中的闲置 VPS 资源，利用 vlmcsd 搭建KMS 激活服务器。声明仅 VOL 版本的 Windows/Office 支持此 KMS 激活，请先确认自己安装的非 Retail 零售版。

### 搭建服务器
首先需要一台 VPS，在上面搭建 vlmcsd 服务端

1. 下载最新版，查看最新版本 [github地址](https://github.com/Wind4/vlmcsd/releases)

```
    wget https://github.com/Wind4/vlmcsd/releases/download/svn1111/binaries.tar.gz
```

2. 解压并查看

```
    tar -zxvf binaries.tar.gz
    cd binaries/Linux/intel/static/
    ls
```

3. 挑选适合自己系统的版本，我们能看到适配各个系统的版本，vlmcsd-x64-musl-static 或vlmcsd-x86-musl-static（根据你 VPS 的系统为 x86 或 x64 系统而定）。

    接着以 x64 为例子：
    
```
    chmod u+x vlmcsd-x64-musl-static
    ./vlmcsd-x64-musl-static
```

​    至此，已经部署完毕

4. 如果你的 VPS 开启了 iptables ，记得开启 1688 端口的 tcp 传输：

   ```  iptables -I INPUT 5 -p tcp -m state --state NEW -m tcp --dport 1688 -j ACCEPT ```

5. 开机自启

```
    vi /etc/rc.local
    cd ~/binaries/Linux/intel/static/ && ./vlmcsd-x64-musl-static
```
### 本地测试
本地测试这里仅以本地为 Windows 环境为例

1. 下载 https://github.com/Wind4/vlmcsd/releases ，并解压

2. 进入\binaries\Windows\intel 目录，开启 PowerShell 或者其他终端

3. 根据你本地的 Windows 为 x86 或 x64，输入如下命令：
```
  ./vlmcs-Windows-x86.exe -v -l 3 你的VPS的IP或者绑定的域名
```

或
```
  ./vlmcs-Windows-x64.exe -v -l 3 你的VPS的IP或者绑定的域名
```
​       其中 -l 3表示发送 Windows 10 Enterprise 2016 LTSB 的激活请求，具体版本对应列表可以通过 ./vlmcs-	Windows-x64.exe -x 查看

​       如果显示如下，那么就搭建成功了

![kms.png](https://i.loli.net/2018/06/18/5b268a17629be.png)

### 激活
* 激活 Windows

    

    以管理员身份打开命令提示符，然执行下列命令：
```
    cd /d "%SystemRoot%\system32"
    slmgr /skms 你的VPS的IP或者绑定的域名
    slmgr /ato
    slmgr /xpr
```
![win.png](https://i.loli.net/2018/06/18/5b268a73549c1.png)
* 激活 Office

    

    以管理员身份打开命令提示符，进入软件安装目录，然后执行下列命令：

    这里以 Office 2013 为例：

    进入32位版本安装目录：``` cd /d "%ProgramFiles(x86)%\Microsoft Office\Office15 ```

    进入64位版本安装目录：``` cd /d "%ProgramFiles%\Microsoft Office\Office15 ```

    然后执行下列命令
    ```
    cscript ospp.vbs /sethst:你的VPS的IP或者绑定的域名
    cscript ospp.vbs /act
    cscript ospp.vbs /dstatus
    ```
### 题外话
​	Windows VOL 版本可以从 [http://msdn.itellyou.cn/](http://msdn.itellyou.cn/) 这里下载

​	Office VOL 版本可以从 [https://landian.la/click/OfficeToolPlus.html](https://landian.la/click/OfficeToolPlus.html) 这里下载

​	VOL 版本的镜像一般内置 GVLK key，用于 KMS 激活。如果你		   手动输过其他 key，那么这个内置的 key 就会被替换掉，这个时候如果你想用 KMS，那么就需要把 GVLK key 输回去。首先，
到 [](https://technet.microsoft.com/en-us/library/jj612867.aspx) 获取你对应版本的 key

​	如果不知道自己的系统是什么版本，可以运行以下命令查看系统版本：
```
  wmic os get caption
```
得到对应key之后，使用管理员权限运行cmd执行安装key：
```
  slmgr /ipk xxxxx-xxxxx-xxxxx-xxxxx
```
​	然后跟上面说的一样设置 KMS 服务器地址，激活。

KMS 方式激活的有效期只有180天，每隔一段时间系统会自动请求 KMS 服务器续期，只要你的服务器正常，续期就没问题
参考：

[https://luodaoyi.com/kms.html](https://luodaoyi.com/kms.html)
[https://yorkchou.com/vlmcsd.html](https://yorkchou.com/vlmcsd.html)