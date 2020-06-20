---
title: MDN摘要- About Media 
excerpt: Some Basic Knowleadge about using media in HTML5
type: blog
location: Qionghai
author: Dolly
tags:
    - HTML
---
# MDN 摘要- About Media

这篇摘要摘录了MDN中关于Media有趣的基础知识点。

## 图片

### 图片的可用属性

```html
<img src="images/dinosaur.jpg"
     alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
     width="400"
     height="341"
     title="曼彻斯特大学博物馆展出的一只霸王龙的化石">
```

* width和height用于图片未加载完全时预留空间
* title设置悬停时候的显示

### 图片里的解说文字

```html
<figure>
  <img src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg"
     alt="一只恐龙头部和躯干的骨架，它有一个巨大的头，长着锋利的牙齿。"
     width="400"
     height="341">
  <figcaption>曼彻斯特大学博物馆展出的一只霸王龙的化石</figcaption>
</figure>
```

`<figure>`可以是几张图片、一段代码、音视频、方程、表格或别的。

## 音频与视频

### 简介

**视频商店：**应当了解一些 OVPs (在线视频提供商) 例如 [YouTube](https://www.youtube.com/) 、[Dailymotion](http://www.dailymotion.com/) 、 [Vimeo](https://vimeo.com/), 以及在线音频提供商例如 [Soundcloud](https://soundcloud.com/)。这些公司提供方便、简单的方式来支持视频，所以你不必担心庞大的带宽消耗。OVPS 甚至提供现成的代码用于为你的 web 网页嵌入视频/音频。

**格式转换工厂：**例如 [Miro Video Converter](http://www.mirovideoconverter.com/) 和 [Audacity](https://sourceforge.net/projects/audacity/)。

```html
<video src="rabbit320.webm" controls>
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

* controls属性可以为页面上的视频引入最基本的功能按键
* `<video>`标签内的段落为不支持视频时提供了链接选择

### 兼容性

不同的浏览器对不同视频格式进行支持

```html
<video controls>
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

每个 `<source>` 标签页含有一个 type属性，这个属性是可选的，但是建议你添加上这个属性 — 它包含了视频文件的 [MIME types](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type) ，同时浏览器也会通过检查这个属性来迅速的跳过那些不支持的格式。如果你没有添加 type属性，浏览器会尝试加载每一个文件，直到找到一个能正确播放的格式，这样会消耗掉大量的时间和资源。

### 更多特性

```html
<video controls width="400" height="400"
       autoplay loop muted
       poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

* autoplay用于自动播放，不建议使用
* loop用于循环播放，不建议使用
* muted用于默认静音播放
* poster视频播放前显示
* preload：
  - none 不缓冲
    - auto 页面加载后缓存
      - metadata 仅缓存文件的元数据

## 音轨文本

```html
<video controls>
    <source src="example.mp4" type="video/mp4">
    <source src="example.webm" type="video/webm">
    <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
</video>
```

```html
WEBVTT

1
00:00:22.230 --> 00:00:24.606
第一段字幕

2
00:00:30.739 --> 00:00:34.074
第二段

  ...
```

字母速度如何与音频同步呢？岂不是要写很小的时间点？

### 强大的iframe标签

<iframe></iframe>可以让你在自己的网页上嵌入第三方的内容，如：

```html
<iframe src="https://developer.mozilla.org/en-US/docs/Glossary"
        width="100%" height="500" frameborder="0"
        allowfullscreen sandbox>
  <p> <a href="https://developer.mozilla.org/en-US/docs/Glossary">
    Fallback link for browsers that don't support iframes
  </a> </p>
</iframe>
```

* allowfullscreen 允许全屏
* frameborder 默认为1设置边框
* sandbox 设置沙盒属性，对使用的权限进行限制，防止恶意篡改，请始终使用这个属性

`<embed>`和`<object>`用于嵌入外部内容，如pdf、flash等。使用场所有限。

## 矢量图SVG

### 简介

- 位图使用像素网格来定义 — 一个位图文件精确得包含了每个像素的位置和它的色彩信息。流行的位图格式包括 Bitmap (`.bmp`), PNG (`.png`), JPEG (`.jpg`), and GIF (`.gif`.)
- 矢量图使用算法来定义 — 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。 [SVG](https://developer.mozilla.org/zh-CN/docs/Glossary/SVG) 格式可以让我们创造用于 Web 的精彩的矢量图形。

![A vector star](https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/star.svg)![A vector star](https://mdn.github.io/learning-area/html/multimedia-and-embedding/adding-vector-graphics-to-the-web/star.svg)

放大可以观察到位图与矢量图的区别。

```html
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

### 常用的创建

#### Option 1

```html
<img 
    src="equilateral.svg" 
    alt="triangle with all three sides equal"
    height="87px"
    width="100px" />
```

**优点：**

- 快速，熟悉的图像语法与`alt`属性中提供的内置文本等效。
- 可以通过在`<a>`元素嵌套`<img>`，使图像轻松地成为超链接。

**缺点:**

- 无法使用JavaScript操作图像。
- 如果要使用CSS控制SVG内容，则必须在SVG代码中包含内联CSS样式。 （从SVG文件调用的外部样式表不起作用）
- 不能用CSS伪类来重设图像样式（如`:focus`）。

#### Option 2

可用svg的浏览器将加载svg，不可用的浏览器将加载png。

```html
<img src="equilateral.png" alt="triangle with equal sides" srcset="equilateral.svg">
```

```css
background: url("fallback.png") no-repeat center;
background-image: url("image.svg");
```

#### Option 3

```html
<svg width="300" height="200">
    <rect width="100%" height="100%" fill="green" />
</svg>
```

**优点**

- 将 SVG 内联减少 HTTP 请求，可以减少加载时间。
- 您可以为 SVG 元素分配`class`和`id`，并使用 CSS 修改样式，无论是在SVG中，还是 HTML 文档中的 CSS 样式规则。 实际上，您可以使用任何 [SVG外观属性](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute#Presentation_attributes) 作为CSS属性。
- 内联SVG是唯一可以让您在SVG图像上使用CSS交互（如`:focus`）和CSS动画的方法（即使在常规样式表中）。
- 您可以通过将 SVG 标记包在[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)元素中，使其成为超链接。

**缺点**

- 这种方法只适用于在一个地方使用的SVG。多次使用会导致资源密集型维护（resource-intensive maintenance）。
- 额外的 SVG 代码会增加HTML文件的大小。
- 浏览器不能像缓存普通图片一样缓存内联SVG。
- 您可能会在[``](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/foreignObject) 元素中包含回退，但支持 SVG 的浏览器仍然会下载任何后备图像。你需要考虑仅仅为支持过时的浏览器，而增加额外开销是否真的值得。

## 响应式图片

### 分辨率切换： 不同的尺寸

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

* srcset 属性中使用的是w而非px，这是图像的真实宽度
* sizes 中为判断条件，判断为真图像会填充后方的槽宽，最后一个为default，因此顺序很重要
* 浏览器执行的顺序是：
  - 检查设备的宽度，`<head>`中`<meta name="viewport" content="width=device-width">`会让浏览器强制检测其真实的宽度
  - 检查sizes列表中哪一项为真
  - 查看对应的槽宽
  - 加载srset列表中引用的最接近槽宽的图像

**这里有两片文章尚未阅读**：

* [开发者工具](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)

*  [响应设计视图](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode) 

### 分辨率切换：相同的尺寸，不同分辨率

```html
<img srcset="elva-fairy-320w.jpg,
             elva-fairy-480w.jpg 1.5x,
             elva-fairy-640w.jpg 2x"
     src="elva-fairy-640w.jpg" alt="Elva dressed as a fairy">
```

在这种情况下，`sizes`并不需要——浏览器只是计算出正在显示的显示器的分辨率，然后提供`srcset`引用的最适合的图像。因此，如果访问页面的设备具有标准/低分辨率显示，一个设备像素表示一个CSS像素，`elva-fairy-320w.jpg`会被加载（1x 是默认值，所以你不需要写出来）。如果设备有高分辨率，两个或更多的设备像素表示一个CSS像素，`elva-fairy-640w.jpg` 会被加载。640px的图像大小为93KB，320px的图像的大小仅仅有39KB。

### 通过美术设计

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg">
  <source media="(min-width: 800px)" srcset="elva-800w.jpg">
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva">
</picture>
```

根据设备分辨率使用不同的图片

## 无法使用css和JS

当浏览器开始加载一个页面, 它会在主解析器开始加载和解析页面的 CSS 和 JavaScript 之前先下载 (预加载) 任意的图片。这是一个非常有用的技巧，平均下来减少了页面加载时间的20%。但是, 这对响应式图片一点帮助都没有, 所以需要类似 `srcset`的实现方法。因为你不能先加载好 [`![img]()`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 元素后, 再用 JavaScript 检测可视窗口的宽度，如果觉得大小不合适，再动态地加载小的图片替换已经加载好的图片，这样的话, 原始的图像已经被加载了, 然后你又加载了小的图像, 这样的做法对于响应式图像的理念来说，是很糟糕的。

## 现代图像格式

```html
<picture>
  <source type="image/svg+xml" srcset="pyramid.svg">
  <source type="image/webp" srcset="pyramid.webp"> 
  <img src="pyramid.png" alt="regular pyramid built from four equilateral triangles">
</picture>
```

**EOF.**
