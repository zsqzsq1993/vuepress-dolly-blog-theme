# Dolly's Blog Theme by VuePress

还在为Jekyll实现布局和交互冗长的代码和Liquid语法而感到苦恼吗？还在寻找那些Nuxt下开箱即用的特性吗？想使用Vue框架进行快速开发并SEO吗？为何不试试用VuePress开发一款博客呢？该博客主题继承于VuePress官方主题，并做了较大的修改，欢迎Fork并进行二次创作。博客效果可参考我的：https://dolly5zhang.com	

## Why and Why not?

### 1. VuePress vs Jekyll

VuePress和Jekyll都可以用Markdown优雅地写博客。如果只在意于博客的内容，Jekyll完全可以胜任，它提供了非常丰富的theme，稍作修改就能搭建一个赏心悦目的博客。但是，如果想要自己捣鼓一套富有个性的博客主题，嵌入喜欢的布局、动画、交互以及各种功能，基于Vue框架的VuePress会大大提高开发效率。

### 2. VuePress vs Nuxt

正如VuePress docs所说的：

> VuePress 能做的事情，Nuxt 理论上确实能够胜任，但 Nuxt 是为构建应用程序而生的，而 VuePress 则专注在以内容为中心的静态网站上，同时提供了一些为技术文档定制的开箱即用的特性。

相比于Nuxt，VuePress更适合开发博客或技术文档：

* VuePress更好地融入了Markdown，官方对生成的HTML提供了非常好的布局，无需对博客内容的排版做过多的修改；甚至可以在markdown中使用插槽，兼顾了便利性与灵活性。

* VuePress官方主题自带Navbar, Sidebar等开发好的组件，特别是Sidebar，可根据markdown文章标题结构自动生成导航栏目录。

* 在VuePress中可以很好的利用YAML元数据，请求这些数据并按照自己的需求进行数据映射成需要的数据结构。

## Why using my theme?

* 较好的响应式布局：布局风格在不同设备上呈现合适的样式，Headers根据视窗选用适合比例的图片，并在视窗改变时做出迅速调整。

* 背景轮播：Header轮播效果，图片预加载，并用dolly-animation库对动画进行了精准的控制。

* 有趣的布局样式：多种过渡及动画，如tags标签外边框的蚂蚁行军效果，LoadingPage的效果等。

* Dark Mode： 实现dark mode和normal两套布局，适应不同光线和场合的需要。

* 可扩展性：有较大的修改和创作空间。

## Using my theme?

* 下载主题，主题的开发可参考我写的这篇[博客]([http://localhost:8080/blogs/2020/2020-06-13/VuePress%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2%E5%B0%8F%E7%BB%93.html](http://localhost:8080/blogs/2020/2020-06-13/VuePress搭建博客小结.html))

```
git clone https://github.com/zsqzsq1993/vuepress-dolly-blog-theme.git
```

* 常用指令

```json
"dev": "vuepress dev docs",
"test": "node server.dev.js",
"build": "vuepress build docs --dest ../dist"
```

dev: 本地开发

test: 部署前本地试部署

build: 在主题的同级目录下生成静态文件，方便分开管理 

## Lastly？

Have fun.