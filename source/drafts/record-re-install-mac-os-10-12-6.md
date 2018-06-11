---
title: RECORD RE-INSTALL MAC OS 10.12.6
date: 2018-03-15 22:24:31
tags: 
	- Mac
---

# 从  macOS 10.13.1 降级到 10.12.6 的一些记录

## 重装系统
1. 下载 macOS 的系统镜像文件。

2. 准备一个大于等于 8G 的 USB 3.0 的U盘，制作 macOS 的系统安装盘。
将U盘插入电脑，打开磁盘工具，将U盘抹掉（格式化）成HFS格式（OS X 扩展），方案选择 GUID 分区图。

3. 输入终端命令制作系统安装盘
其他版本只要更换这里的名字即可。回车，输入密码，开始制作，继续等待其显示成 “Copy complete. Done.” 即可。
```bash
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/Canvio --applicationpath /Applications/Install\ macOS\ Sierra.app --nointeraction
```

4. 重新启动，开机按下 option 键，选择系统安装盘，抹掉系统盘，命名为 “APPLE SSD SM0512L Media”，继续安装，读条之后，U盘就可以拔掉了。继续等待至进入欢迎界面。

5. 过程中遇到一些问题，第一次盘全部抹掉之后，U盘安装，拷贝文件至电脑之后，重新启动，读条到一半变成 “禁止” 符号，表示系统文件丢失或者没有系统。重新再走一遍安装流程却又正常了。

在使用磁盘工具格式化U盘的时候，出现 `MediaKit reports not enough space on device for requested operation` ，详细参考[这里](https://priyanksharma.com/tech/mediakit-reports-not-enough-space-on-device-for-requested-operation/)。

<!-- more -->

## 恢复软件和工作状态

### [Home Brew](https://brew.sh/) 
首先安装 Home Brew

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
```

### [Home Brew Cask](http://caskroom.github.io/)
 
 首先安装 Home Brew Cask
 
 ```shell
$ brew tap caskroom/cask
 ```
 
 常用软件安装
 
 ```shell
$ brew cask install qq
$ brew cask install evernote
$ brew cask install the-unarchiver
$ brew cask install google-chrome
$ brew cask install sublime-text
$ brew cask install cheatsheet
$ brew cask install iterm2
$ brew cask install autojump
$ brew cask install zsh
$ brew cask install zsh-autosuggestions
$ brew cask install zsh-completions
$ brew cask install zsh-syntax-highlighting
$ brew cask install go
$ brew cask install anki
$ brew cask install neteasemusic
$ brew cask install postman
$ brew cask install macdown
$ brew cask install handshaker
$ brew cask install kindle
$ brew cask install sip
$ brew cask install imazing
$ brew cask install thunder
$ brew cask install macdown
$ brew cask install macdown
$ brew cask install macdown
 ```
 附上常用的 `brew` 命令。
 
```shell
$ brew search qq // 搜索
$ brew install telnet // 安装
$ brew uninstall telnet // 卸载
$ brew list // 列出已安装的软件
$ brew update // 更新brew
$ brew home // 用浏览器打开brew的官方网站
$ brew info // 显示软件信息
$ brew deps //显示包依赖
```
 
### oh-my-zsh
在命令行输入以下命令安装 oh-my-zsh：

```shell
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
配置 iTerm2 主题，设置了主题「agnoster」之后，发现命令行出现了乱码，点击这个「[Monaco PowerLine](https://gist.github.com/kevinis/c788f85a654b2d7581d8)」，解决 agnoster 出现的乱码问题。

配置 iTerm2 字符颜色，「ls -ilh」命令没有出现应有的颜色，在 iTerm2 的设置 `Preferences/Profiles/Text` 去掉 `Draw bold text in bright colors`，即可使列出的文件和文件夹的名字高亮显示。

配置 iTerm2 的呼出快捷键，`Preferences/Keys/Hotkey`下，将 `Show/hide all windows with a system-wide hotkey`勾上，并设置快捷键为`⌘.`。

- 检查版本 `brew search node`
-  [https://nodejs.org/dist/latest-v6.x/]
- `shift + command + .`



1. 安装 Java SE，安装 Eclipse，导入项目（gradle），自动下载 Gradle 和 依赖包，不需要翻墙，速度很快。

2. 安装 ShadowsocksX-NG-R8，输入配置文件，没问题。

3. 安装 Bartender 3，需要重新输入 License，输入后没问题。

4. 安装 1Password，将备份的 1password vaults 文件放到 `~/Library/Application Support/` 中，打开 `Preferences/Backup` 还原即可，然后在  `Sync` 中同步到 `iCloud`。

5. 安装 Chrome，登录即可。

6. 安装 TextExpander，第一次使用会发现在中文输入法状态下无法使用，解决办法是，先安装 [Dropbox]，然后打开 `TextExpander/Preferences/Sync`，勾选 `Sync with TextExpander 4 ot TextExpander touch 3.2（Dropbox only）`，然后打开 [工具]，将中文删除即可。最后同样需要将备份的文件放到 `~/Library/Application Support/` 最后还原。

7. oh my zsh 
- 安装 oh my zsh 
	`curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh`
[powerline 字体]
- 卸载 oh my zsh
	`uninstall_oh_my_zsh`
- 更新 oh my zsh
	`upgrade_oh_my_zsh`



8. oh my zsh 插件
- zsh-syntax-highlighting
- [zsh-autosuggestions]
- [sublime]
- [vi-mode]
- [官方 wiki]
- [autojump]
- sudo
- extract
- osx

Oh my zsh 命令
- `zsh_stats ` 查看使用频率前 20 的命令
- `take` 

Oh my zsh 主题
- [官方主题]
- [外部主题]

其他工具
- htop `./configure; make; sudo make; sudo make check; sudo make install`


9. HHKB
下载 Karabiner[]