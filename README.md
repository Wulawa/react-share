# react 社交在线分享

===

一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点等社交网站。

![qq20151127-1 2x](https://cloud.githubusercontent.com/assets/1472352/11433126/05f8b0e0-94f4-11e5-9fca-74dc9d1b633f.png)


[参考：DEMO](http://overtrue.github.io/share.js/)


# 安装

1. 使用 [npm](https://npmjs.com)

    ```shell
    npm install social-share-react
    ```
2. 手动下载或者 git clone 本项目。

# 使用

HTML:

```jsx
import Share from 'social-share-react'
...
<Share
  url='https://www.baidu.com'
  title='分享生活点滴',
  disabled={['google', 'facebook', 'twitter']}
></Share>
...
```

## 自定义配置

所有配置**可选**， 通常默认就满足需求：

可用的配置有：

```js

url                 : '', // 网址，默认使用 window.location.href
source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
origin              : '', // 分享 @ 相关 twitter 账号
description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
image               : '', // 图片, 默认取网页中第一个img标签
sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点
disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点
wechatQrcodeSize    : 150, // 二维码大小  单位 px
wechatQrcodeLevel   : 'Q', // 二维码level 可选('L' 'M' 'Q' 'H')
```


### 你也可以自定义图标

设置 `initialized` 配置项来禁用自动生成icon功能。

```jsx
<Share class="social-share" initialized={false}>
    <a href="#" key='weibo' class="social-share-icon icon-weibo"></a>
    <a href="#" key='qq' class="social-share-icon icon-qq"></a>
    <a href="#" key='qzone' class="social-share-icon icon-qzone"></a>
</Share>
```
以上a标题会自动加上分享链接（`a` 标签必须带 `key` 属性，不然分享链接不会自动加上）。

欢迎贡献代码及提建议！

# 引用

二维码生成部分用到了开源组件：[zpao/qrcode.react](https://github.com/zpao/qrcode.react) (ISC License)

# License

  ISC


