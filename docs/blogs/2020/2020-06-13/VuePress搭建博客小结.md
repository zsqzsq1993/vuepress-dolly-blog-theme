---
title: 小白如何使用VuePress搭建博客？
excerpt: 还在为用Jekyll实现布局和交互时冗长的代码和Liquid语法而感到苦恼吗？还在为用Nuxt开发博客时那些从头造的轮子而在犹豫吗？想要使用Vue框架进行开发并实现SEO吗？为何不试试VuePress呢？
type: blog
location: Guangzhou
author: Dolly
tags:
    - VuePress
---

# 小白如何用VuePress搭建博客？

还在为用Jekyll实现布局和交互时冗长的代码和Liquid语法而感到苦恼吗？还在为用Nuxt开发博客时那些从头造的轮子而在犹豫吗？想要使用Vue框架进行开发并实现SEO吗？为何不试试VuePress呢？

## Why and Why not?

### 1. VuePress vs Jekyll

VuePress和Jekyll都可以用Markdown优雅地写博客。如果只在意于博客的内容，Jekyll完全可以胜任，它提供了非常丰富的theme，稍作修改就能搭建一个赏心悦目的博客。但是，如果想要自己捣鼓一套富有个性的博客主题，嵌入喜欢的布局、动画、交互以及各种功能，基于Vue框架的VuePress会给大大提高博客的开发效率。

### 2. VuePress vs Nuxt

正如VuePress docs所说的：

> VuePress 能做的事情，Nuxt 理论上确实能够胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用的特性。

相比于Nuxt，VuePress更适合开发博客或技术文档：

1. VuePress更好地融入了Markdown，官方对生成的HTML提供了非常好的布局，无需对博客文章的排版做过多的修改；甚至可以在markdown中使用插槽，兼顾了便利性与灵活性。
2. VuePress官方主题自带Navbar, Sidebar等开发好的组件，特别是Sidebar，可根据markdown中文章标题结构自动生成Sidebar目录导航栏。
3. 在VuePress中可以很好的利用YAML元数据，请求这些数据并按照自己的需求进行数据映射生成需要的数据结构，blogsList, tagsList, timeline各个组件均可进行快速的开发。

## BeforeCreated

在2020年6月中旬，VuePress存在如下bugs：

### 1. 热更新

该版本的热更新存在问题，需要手动安装对应版本的watchpack。相关Issues：[#2392](https://github.com/vuejs/vuepress/issues/2392#issuecomment-633399465)

```json
"devDependencies": {
    "vuepress": "^1.5.0",
    "watchpack": "^1.6.1"
}
```

### 2. Element-ui

在项目中全局注册Element-ui会出现`Uncaught Error: Cannot find module 'core-js/library/fn/object/assign' `的错误。错误的原因是VuePress依赖的是core-js@3，与Element-ui中依赖的core-js@2发生冲突，需要手动安装^2的版本进行降级。相关Issues：[#2275](https://github.com/vuejs/vuepress/issues/2275)

```json
  "dependencies": {
    "core-js": "^2.6.11",
    "element-ui": "^2.13.2",
  }
```

## Get start

### 1. 继承官方主题

新建的VuePress项目里什么也没有，通过以下代码可以拉取官方主题的源码到本地theme文件夹。

```shell
vuepress eject
```

加上安装官方推荐的目录构建形式，以及我自己的理解，建议构建如下的目录结构：

```js
.
├── docs
│   ├── .vuepress
│   │   ├── theme (通过vuepress eject拉取的)
│   │   │   ├── components (组件的源码)
│   │   │   ├── layouts （页面级组件的源码）
│   │   │   ├── styles （.stylus布局源码）
│   │   │   └── ...
│   │   ├── public (存放静态资源)
│   │   ├── styles 
│   │   │   ├── index.styl （自定义的全局样式）
│   │   │   └── palette.styl （用于覆盖.stylus中的变量）
│   │   ├── config.js (配置文件入口，官方解释详细)
│   │   └── enhanceApp.js (用于全局挂载一些应用)
│   │ 
│   ├── README.md （主页）
│   ├── about （介绍页）
│   │   └── README.md
│   ├── tags （标签页）
│   │   └── README.md
│   ├── blogs （博客内容页）
│   │   │   ├── blog1.md 
│   │   │   ├── blog2.md
│   │   │   ├── blog3.md
│   │   │	  └── ...
└── package.json
```

### theme

该文件夹下的文件均可直接修改。如果想真正实现继承，可以在自己的`docs/.vuepress`目录下新建`theme/index.js`文件，文件内配置如下代码。这样，当你移除未修改过的文件，VuePress也能在构建时自动识别到原主题中的该文件。

如果是只做小的修改，可以只保留修改过的文件，构建依然正常进行。

但若改动较大，继承就显得有些鸡肋，到最后可能会保持原主题完成的结构。

```js
module.exports = {
    extend: '@vuepress/theme-default'
}
```

### styles

该文件夹下可创建index和palette两个.styl文件。创建的文件拥有较高的优先级，好处是当你想全局修改布局时，可直接在这两个文件中进行层叠。比如源码中定义了$textcolor的颜色。在styles/palette.styl中重新定义可覆盖原来定义的颜色变量。又或者直接在index中定义一套dark mode的布局。

```stylus
$textcolor = rgb(7, 17, 27)
```

### theme/layouts

该文件夹下官方放了layout.vue和404.vue两个布局组件。值得注意的是，如果home, tags, timeline以及about页面若只使用一个layout.vue组件进行渲染的话（如下），只会生成一个单页面。而blogs中每一个.md文件都会被渲染为一个单独的页面。当然404页面也会单独渲染一个页面。这在进行路由跳转的时候需要注意。

```vue
<template>
	< Home v-if="..." />
	< Tags v-else-if="..." />
	< TimeLine v-else-if="..." />
	< About v-else />
<template>
```

### enhanceApp.js

该文件用于挂载一些全局应用如element-ui或者引入一些全局的资源如字体图标的样式：

```js
/**
 * 扩展 VuePress 应用
 */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './public/fonts/iconfont.css'

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
}) => {
    // ...做一些其他的应用级别的优化
    Vue.use(Element)
}
```



