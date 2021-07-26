# 小说阅读器使用文档

## 打包教程

因为法律原因，本插件不能在 utools 官方插件市场上架。
所以我提供打包教程供大家自行打包使用

### 依赖库安装

#### node npm 安装

进入 [官网](https://nodejs.org/zh-cn/download/),自行下载

完成后打开命令行输入

```shell
node -v
npm -v
```

没有报错说明安装完成，
如果报错也可能是 `node`, `npm` 路径没有加到环境变量

最后再安装 yarn

执行

```shell
npm install yarn -g
```

如果没有流畅访问国外网站的条件，也可给 `yarn` `npm` 换源，
照这 [此教程](https://zhuanlan.zhihu.com/p/35856841) 即可

#### rust wasm-pack 安装

到 `rust` [官网](https://www.rust-lang.org/zh-CN/learn/get-started)

照着教程走就 ok

如果遇到下载速度的问题可参考一下文章: 
[Rust 下载安装加速指南](https://zhuanlan.zhihu.com/p/126201430),
[windows 下rust安装工具链 下载加速](https://www.cnblogs.com/skycandy/p/11402170.html)

安装完成之后也可配置 `rust` 的换源，推荐使用字节源(速度比较快)

进入 [此网站](https://rsproxy.cn/) ,复制 `~/.cargo/config:` 下的内容添加到
你本地的 `~/.cargo/config` 文件里

或者按照 [这篇文章](https://segmentfault.com/a/1190000017483415) 换成中科大源

安装好 `rust` 后安装 `wasm-pack`

命令行下运行
```shell
cargo install wasm-pack
```

安装之后运行

```shell
wasm-pack --version
```

如果能正确显示版本说明安装成功

### 打包过程

进入项目根目录运行以下命令来安装项目的依赖包

```shell
yarn install
```

打包前端代码，运行

```shell
yarn build
```

进入 utools 开发者插件,点击新建项目，
必要内容填好后，点击 `选择 plugin.json 文件` 选择 `build/plugin.json` 文件，
然后点击打包即可完成

## 联系方式

如出现bug或者希望添加的功能可用以下联系方式联系

1. 我的个人博客[sushao'bolg](https://www.sushao.blog)

2. 我的github[sushao](https://github.com/suxiaoshao)

3. 这个插件的开源地址[utools-novel-reader](https://github.com/suxiaoshao/utools-novel-reader)

4. 这是我插件在官方论坛的[帖子](https://yuanliao.info/d/1392)，这个帖子下回复我会有提醒的

## 更新

### v0.5.0

1. 添加源自定义源

2. 字体有更多大小调节

### v0.4.1

1. 添加了一个小说源

2. 支持左右键切换章节

## 使用方式

因为之前源的错误加上还没适配 utools 的暗黑模式,所以我决定重写这个插件

### 新版本说明

因为之前源已经无法访问,所以之前储存的小说阅读记录将不再存在, 这个版本主要作为测试,所以只添加了一个源,下个版本会有更多的源和自定义

另外这个版本使用了 rust 编写的 wasm 文件, 因为在我的本机运行正确,所以如果有问题可以在这个帖子下找我

#### todo

这个版本还不完善, 以下是还未完成的功能

- 读取小说文件

### 搜索

搜索功能和上个版本一样

### 主题

这个版本一共支持 4 个主题,并可以选择在暗黑和明亮模式下指定主题, 也可以选择固定主题

### 自定义源

可以打开设置页面自定义源,添加源是通过 `json` 文件形式创建的

![](https://files.catbox.moe/0drsf1.png)

每一项都会有提示,mainPageUrl 不允许重复

并且可以在上一个页面删除源(不允许删除默认源), 删除源后,这个源的阅读记录也会被删除

![](https://files.catbox.moe/sknfho.png)

以下是默认源的例子

```json
{
  "mainPageUrl": "https://www.vbiquge.com/",
  "name": "新笔趣阁1",
  "search": {
    "li": "body > div.result-list > div",
    "novelId": "div.result-game-item-detail > h3 > a",
    "authorName": "div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)",
    "latestChapterId": "div.result-game-item-detail > div > p:nth-child(4) > a",
    "updateTime": "div.result-game-item-detail > div > p:nth-child(3) > span:nth-child(2)",
    "image": "div.result-game-item-pic > a > img",
    "label": "div.result-game-item-detail > div > p:nth-child(2) > span:nth-child(2)",
    "desc": "div.result-game-item-detail > p",
    "encoding": "utf8"
  },
  "novel": {
    "info": {
      "name": "#info > h1",
      "author": "#info > p:nth-child(2)",
      "lastUpdateTime": "#info > p:nth-child(4)",
      "latestChapterId": "#info > p:nth-child(5) > a",
      "encoding": "utf8",
      "image": "#fmimg > img",
      "desc": "#intro"
    },
    "directory": {
      "chapterId": "#list > dl > dd > a",
      "encoding": "utf8"
    }
  },
  "url": {
    "search": "https://www.vbiquge.com/search.php?keyword={##searchName##}",
    "novelInfo": "https://www.vbiquge.com/{##novelId##}/",
    "directory": "https://www.vbiquge.com/{##novelId##}/",
    "chapter": "https://www.vbiquge.com/{##novelId##}/{##chapterId##}.html",
    "searchPlaceholder": "{##searchName##}",
    "novelPlaceholder": "{##novelId##}",
    "chapterPlaceholder": "{##chapterId##}"
  },
  "content": {
    "encoding": "utf8",
    "chapterName": "#wrapper > div.content_read > div > div.bookname > h1",
    "novelName": "#wrapper > div.footer > div.footer_cont > p:nth-child(1) > a",
    "preChapterId": "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(1)",
    "nextChapterId": "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)",
    "content": "#content",
    "contentSplit": "&nbsp;"
  },
  "regex": {
    "novel": "com\\/(?<id>.*?)\\/",
    "novelIdPlaceholder": "id",
    "chapterIdPlaceholder": "id",
    "chapter": "\\/(?<id>\\d+).html"
  }
}
```

```json
{
  "mainPageUrl": "https://www.biqubao.com/",
  "name": "笔趣阁1",
  "search": {
    "li": "body > div.result-list > div",
    "novelId": "div.result-game-item-detail > h3 > a",
    "authorName": "div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)",
    "latestChapterId": "div.result-game-item-detail > div > p:nth-child(4) > a",
    "updateTime": "div.result-game-item-detail > div > p:nth-child(3) > span:nth-child(2)",
    "image": "div.result-game-item-pic > a > img",
    "label": "div.result-game-item-detail > div > p:nth-child(2) > span:nth-child(2)",
    "desc": "div.result-game-item-detail > p",
    "encoding": "utf8"
  },
  "novel": {
    "info": {
      "name": "#info > h1",
      "author": "#info > p:nth-child(2)",
      "lastUpdateTime": "#info > p:nth-child(4)",
      "latestChapterId": "#info > p:nth-child(5) > a",
      "encoding": "gbk",
      "image": "#fmimg > img",
      "desc": "#intro"
    },
    "directory": {
      "chapterId": "#list > dl > dd > a",
      "encoding": "gbk"
    }
  },
  "url": {
    "search": "https://www.biqubao.com/search.php?q={##searchName##}",
    "novelInfo": "https://www.biqubao.com/book/{##novelId##}/",
    "directory": "https://www.biqubao.com/book/{##novelId##}/",
    "chapter": "https://www.biqubao.com/book/{##novelId##}/{##chapterId##}.html",
    "searchPlaceholder": "{##searchName##}",
    "novelPlaceholder": "{##novelId##}",
    "chapterPlaceholder": "{##chapterId##}"
  },
  "content": {
    "encoding": "gbk",
    "chapterName": "#wrapper > div.content_read > div > div.bookname > h1",
    "novelName": "#wrapper > div.footer > div.footer_cont > p:nth-child(1) > a",
    "preChapterId": "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(1)",
    "nextChapterId": "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)",
    "content": "#content",
    "contentSplit": "&nbsp;"
  },
  "regex": {
    "novel": "book\\/(?<id>.*?)\\/",
    "novelIdPlaceholder": "id",
    "chapterIdPlaceholder": "id",
    "chapter": "\\/(?<id>\\d+).html"
  }
}
```

### 支持作者

可以在支持作者页面请插件作者喝茶

## utools使用

可在这个页面下寻找[V0.8.9-beta 版本更新说明](https://yuanliao.info/d/1020)下载链接，这是utools的官方论坛

也可以在官网上下载使用[utools](https://www.u.tools/)

使用方式可以看这个文章[uTools | 时隔一年，uTools 这位 Spotlight 新秀现在变得怎么样了?](https://sspai.com/post/56739)或者在官方论坛查看：[猿料](https://yuanliao.info/)

## 插件下载

* utools插件中心搜索小说阅读
* 把[utools-novel-reader](https://github.com/suxiaoshao/utools-novel-reader)git
  clone下来，找到result文件夹,这个就是最终结果，通过[utools文档](https://www.u.tools/docs/guide/about-uTools.html)介绍的方法打包就可以使用了
