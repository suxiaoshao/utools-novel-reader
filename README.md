# 小说阅读器使用文档

## 联系方式

如出现bug或者希望添加的功能可用以下联系方式联系

1. 我的个人博客[sushao'bolg](https://www.sushao.blog)

2. 我的github[sushao](https://github.com/suxiaoshao)

3. 这个插件的开源地址[utools-novel-reader](https://github.com/suxiaoshao/utools-novel-reader)

4. 这是我插件在官方论坛的[帖子](https://yuanliao.info/d/1392)，这个帖子下回复我会有提醒的

## 更新

### v0.3.1

1. 因为utools官方服务器的压力，现在本地读取小说的限制为2MB,之前储存的
大于2MB的小说也将会被删除,如给你带来不便请见谅。

2. 具体原因，请看这个 [帖子](https://yuanliao.info/d/1877)

### v0.2.12

1. 减少插件体积

### v0.2.11

1. 修改了后台api,提升了页面访问速度

### v0.2.10

1. 修复数据没有完全得到就可以加入书架的bug

2. 修复书架数据不完整整个页面卡死的bug

### v0.2.9

1. 添加了在阅读页面和章节页面返回书架的功能

### v0.2.8

1. 添加了新小说源:[九桃小说](https://www.9txs.com/)

### v0.2.7

1. 修复小说阅读页面第一章和最后一章的上一章和下一章错误出现的bug

2. 修复读取本地小说时使用章节数提取小说有时会多出一章的情况

### v0.2.6

1. 添加爬虫解析html失败的提示

2. 修复了多个解析html的bug

### v0.2.5

1. 修复进入插件后，没有进入正确的页面的bug

2. 更改开发语言，将js改成ts，有利后期维护

### v0.2.3 v0.2.4

1. 修复bug

2. 添加了新小说源

3. 更改了插件的api

4. 注:有什么想要的字体和想要的小说源可以在这个[帖子](https://yuanliao.info/d/1392)
下提出，下个版本会加入字体和添加更多小说源。

### v0.2.1

1. 修复放回按钮bug，因为新版本utools禁止了`windows.history`的用法，
所以之前的版本的小说插件在新版utools下返回按钮出现bug，
我换了一种方法实现修复了这个问题

1. 修改了爬虫的逻辑,把xmldom+xpath的解析html方式换成了
[cheerio](https://github.com/cheeriojs/cheerio) 的方式,
增强了解析html的兼容性。把axios的网络资源获取方式换成了
[node](https://nodejs.org/zh-cn/) 自带的
[http](https://nodejs.org/zh-cn/docs/guides/anatomy-of-an-http-transaction/)
 和[https](http://nodejs.cn/api/https.html) 模块。
 添加了[iconv-lite](https://www.npmjs.com/package/iconv-lite) 作为网页编码，
 用来处理gbk页面。
 
 3. 后续更新，更改了以上之后，下个版本可以加入更多的用户自定义元素，比如用户自定义
 小说源之类的，我也会加入其他小说源，字体什么的也在下个版本推出。
 
### v0.2.0

1. 适配新版本utools1.0.0-beta的api

2. 加入阅读页面行间距的自定义设置

### v0.1.2

1. 添加了阅读页面的滚动快捷键设置
    ![UTOOLS1587719082717.png](http://yanxuan.nosdn.127.net/a65c28187b2ca24cbede5f41016b5c38.png)
    默认快捷键为空格
    
2. 设置滚动长度，数字越大滚动远，最大1000

3. 设置滚动速度，数字越大滚动越慢，为0时立即滚动，最大20

4. 效果展示
    ![1.gif](http://yanxuan.nosdn.127.net/5828be5754043104ae4436db0ffc644c.gif)



### v0.1.1

1. 添加了在插件内读取文件页面可以直接读取文件的功能

![UTOOLS1587525616929.png](http://yanxuan.nosdn.127.net/5d39dc7473080776c288eff54ccc5459.png)

### v0.1.0

1. 添加了读取本地文件的功能，目前仅适用于.txt结尾的utf-8的文件，如果是其他编码方式，可以通过文本编辑器如windows自带的记事本转换成utf-8编码，如果不会可自行搜索。

1. 读取文件的方式为复制想要读取的小说文件,唤出utools出现

    ![UTOOLS1587448276149.png](http://yanxuan.nosdn.127.net/66edf6809bf333cd34d45a75695ccdd1.png)

    进入就会出现编辑界面

    ![UTOOLS1587448374211.png](http://yanxuan.nosdn.127.net/81511f68ea2597651d1544e3a5a14e71.png)

    可以自由的编辑作者，书名，提取章节的方式，也可以点击获取章节来测试是否正确提取到章节，也可以直接加入书架，获取章节会在加入前完成。

2. 读取文件的分章节提供了正则和按字数两种方式，推荐使用正则的方式，如果不会正则，也可以使用字数分章节。

3. 正则分章节的方式下面举个例子说明

    小说文本

    ```txt
    电磁阀赶不回来家门口
    第1章 7777
    下得厨房VG不会将你看嘛，了
    第2章 8888
    大风车赶不回来节开幕
    ```

    正则表达式`第\d+章.*?\r\n`

    那么`第一章 7777`匹配到的内容为*下得厨房VG不会将你看嘛，了*,章节名就是*第1章 7777*

    而第一个匹配之前的内容则会丢失 如这个例子中的*电磁阀赶不回来家门口*就会丢失

    `第2章 8888`后面的*大风车赶不回来节开幕*会被`第2章 8888`匹配到不会丢失

1. 在加入书架后， 可以把文件删除，小说内容会保存到utools数据中。但是小说的路径会作为数据的唯一id，所以你如果在同一个路径读取同一个文件名和扩展名的文件，后面读取的文件会把前一个文件覆盖。

### v0.0.8

1. 修复了外观设置保存不了的bug

### v0.0.7

1. 新增设置阅读页面颜色改变，只写了三个主题。

2. 本来这个版本要加入读取本地小说的功能，因为下个utools的api改变，所以等下个utools的新版本会加入

3. 由于utools下个版本时间未定，所以本插件的下个版本时间也未定，如果有重大bug的话我还会更新，不过不会加入新功能

### v0.0.6

1. 小说api重新设计，以备下次更新使用

2. 加入消息提醒的设置，在设置栏中选择

3. 每个页面右上角都加入设置和刷新按钮，以便卡死时刷新

4. 下次更新提示:下个版本我打算加一点新功能，比如切换样式和读取本地文件之类的，所以可能要一段时间才能更新了，不过如果这个版本出现大问题，可以在这个帖子里提出，我会更新小版本。

### v0.0.5

小说阅读页面优化

### v0.0.4

1. 搜索:目前可在所有页面输入字符，不过一旦输入一个字符会自动跳转至搜索页面，不需要按下回车。

2. 加入快捷键切换章节，默认不开启，搜索页面和书架页面右上角打开设置设置，默认切换按键是左右方向键对应上一章和下一章，可以再设置中更改。

3. 设置说明:设置快捷键时需要打开快捷键切换，自定义快捷键，需要鼠标点击输入框，在输入框被激活后直接在键盘上点击想要设置的快捷键，目前只支持一个键位，不能是组合键，输入框内的内容会随着你的设置而改变。输入框内的内容是键盘上的每个键对应的键盘名称，可以百度到对应的键是什么。

4. 设置保存:需要按保存才能将设置保存，直接退出是不会保存修改的设置，取消是取消还没保存的设置，如果已经保存了，取消只能恢复到最后一次保存的设置。

5. 提醒优化:成功的提醒三秒后悔自动消失，失败的提醒会保留在那边。

### v0.02,v0.03

压缩体积,页面优化

## 搜索

在utools按下 **novel** 或者 **小说**

输入要搜索的书名，按下回车

就可以获取需要的小说，可以点入小说页面

## 加入书架

在小说页面，点击加入书架。

加入书架后，这本书的最后一次阅读都会被记录下来，使用了utools的数据库，你可以在多个设备中同步最后阅读记录。

如果你加入书架却没打开过，默认最后阅读章节是第一章。

## 书架使用

你可以在utools输入 **bookshelf** 或者 **书架**进入书架页面

在这个页面和书籍页面，你都可以管理书架内的书。

也可以快速进入保存在书架的书。

## 测试页面

注:普通用户可以忽略这个页面，这个页面可以用来爬虫检测，对小说阅读没有任何影响

这个页面是用来爬虫测试的，你可以在url栏输入网页的url地址

在编码栏输入网页编码方式，目前只支持utf-8和gbk

在选择器栏输入jquery选择器(也就是现在的js选择器),点击获取就可以获取匹配的页面

选择器是使用了[cheerio](https://github.com/cheeriojs/cheerio) 包,网页获取使用了[node](https://nodejs.org/zh-cn/)
 自带的[http](https://nodejs.org/zh-cn/docs/guides/anatomy-of-an-http-transaction/)
 和[https](http://nodejs.cn/api/https.html) 模块 ,
 网页编码解码使用了[iconv-lite](https://www.npmjs.com/package/iconv-lite)

获取按钮的源代码如下

```ts

this.loading = true       
getHtml(this.url, this.encoding)
    .then(htmlString => {
        console.log(htmlString)
        this.loading = false
        const $ = cheerio.load(htmlString, {decodeEntities: false});
        this.html_list = []
        $(this.select).each((index: number, value: CheerioElement) => {
            const $value = $(value)
            console.log($.html($value))
            this.html_list.push($.html($value))
        })
    })
    .catch(error => {
        console.log(error)
    })

```

getHtml的源代码

```ts
async function getHtml(url: string, encoding: string): Promise<string> {
    const response = await axios.get<ArrayBuffer>(url, {
        responseType: "arraybuffer"
    })
    const htmlBuf = response.data
    return iconv.decode(Buffer.from(htmlBuf), encoding)
}
```

用户输入的url和xpath选择方式绑定在呢this.url和this.select,axios,xmldom,xpath这三个包也绑定在this.axios,this.xmldom,this.xpath上

最后获取的this.html_list会被逐行渲染到页面上，在渲染的下面原始字符串也会显示

## 关于作者

我的个人博客[sushao'bolg](https://www.sushao.blog)

我的github[sushao](https://github.com/suxiaoshao)

这个插件的开源地址[utools-novel-reader](https://github.com/suxiaoshao/utools-novel-reader)

因为第一次写插件，使用了前端框架vue.js，vue-router和ui框架element-ui，目前我还在学习前端中，
所以有任何bug或者问题都可以在我的这篇博客下留言:[【前端】utools小说阅读插件](https://www.sushao.top/article/21)。
在这个帖子里留言最好留下联系方式，不然只能过一段时间上去看看我有没有回复。

或者我的猿料页面下找我[sushao](https://yuanliao.info/u/32696)，
这是我插件在官方论坛的[帖子](https://yuanliao.info/d/1392)，这个帖子下回复我会有提醒的

## utools使用

可在这个页面下寻找[V0.8.9-beta 版本更新说明](https://yuanliao.info/d/1020)下载链接，这是utools的官方论坛

也可以在官网上下载使用[utools](https://www.u.tools/)

使用方式可以看这个文章[uTools | 时隔一年，uTools 这位 Spotlight 新秀现在变得怎么样了?](https://sspai.com/post/56739)或者在官方论坛查看：[猿料](https://yuanliao.info/)

## 插件下载

* utools插件中心搜索小说阅读
* 把[utools-novel-reader](https://github.com/suxiaoshao/utools-novel-reader)git clone下来，找到result文件夹,这个就是最终结果，通过[utools文档](https://www.u.tools/docs/guide/about-uTools.html)介绍的方法打包就可以使用了
