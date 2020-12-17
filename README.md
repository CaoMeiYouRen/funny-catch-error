<h1 align="center">funny-catch-error</h1>
<p>
   <a href="https://github.com/CaoMeiYouRen/funny-catch-error" target="_blank">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/CaoMeiYouRen/funny-catch-error">
  </a>
  <a href="https://github.com/CaoMeiYouRen/funny-catch-error/actions?query=workflow%3ARelease" target="_blank">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/CaoMeiYouRen/funny-catch-error/Release" /></a>
  <img alt="node-current"  src="https://img.shields.io/node/v/funny-catch-error" />
  <a href="https://github.com/CaoMeiYouRen/funny-catch-error#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/funny-catch-error/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/funny-catch-error/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/funny-catch-error" />
  </a>
</p>

> “正确”的异常处理方式，纯属娱乐，生产环境请勿使用，否则后果自负

出现异常时将自动跳转到搜索引擎，可自定义处理方式

### 🏠 [主页](https://github.com/CaoMeiYouRen/funny-catch-error#readme)

## 项目简介

-   出现异常时将自动跳转到搜索引擎
    -   中文环境跳转百度，英文环境跳转 Google
    -   可自定义搜索引擎。
-   纯属娱乐，生产环境请勿使用，否则后果自负
-   以前在网上看到过类似的处理方法，现在闲的无聊就把它实现和优化了一下

## 核心代码

```ts
export async function funnyCatchError(cb: () => any, config: CatchConfig = {}) {
    try {
        await cb()
    } catch (error) {
        window.open(`https://www.baidu.com/s?wd=${error.message}`)
    }
}
```

## 安装

```sh
npm i -D funny-catch-error
```

## 🚀使用

```js
import { funnyCatchError } from 'funny-catch-error'
// 直接使用
funnyCatchError(() => {
    throw new Error('xxxx is undefined') // 抛出的异常将会自动跳转页面到搜索引擎，例如 `https://www.baidu.com/s?wd=xxxx is undefined`
}
// 也支持异步函数 
funnyCatchError(async () => {
    throw new Error('async 异步异常处理')
})
// 还可以传入第二个参数作为配置项，具体说明见下文
funnyCatchError(() => {
    throw new Error('xxxx is undefined')
}, {
    searchEngines: 'https://cn.bing.com/search?q=[key]',
})

```

浏览器端也可以直接引入 `index.js` 文件，现代浏览器可以使用 `index.esm.js` 版本

```html
<script src="https://cdn.jsdelivr.net/npm/funny-catch-error@latest/dist/index.js"></script>
<script>
    const { funnyCatchError } = FunnyCatchError
    funnyCatchError(() => {
        throw new Error('xxxx is undefined')
    })
</script>
```

## 配置项

```ts
interface CatchConfig {
    /**
     * 自定义搜索引擎。若配置该项将覆盖默认配置。[key] 会被替换为具体 errorMessage
     * 例如：https://cn.bing.com/search?q=[key]
     *
     * @type {string}
     */
    searchEngines?: string
    /**
     * 是否打开新的窗口。默认为中文环境 true ，英文环境 false
     *
     * @type {boolean}
     */
    isOpenNewWindow?: boolean
}
```

## 作者


👤 **CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd](https://blog.cmyr.ltd)
* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 🤝贡献

欢迎Contributions, issues and feature!

如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/funny-catch-error/issues).


## 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢


## 📝 License

Copyright © 2020 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/funny-catch-error/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)
