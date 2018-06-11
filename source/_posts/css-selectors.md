---
title: CSS 选择器总结
date: 2018-05-27 16:07:43
tags: css
---

前几天在整理博客（Hexo）的时候，发现一个页面样式奇丑无比，都不知道当时是怎么想的，好在页面可以自定义样式。说干就干，但过程当前恰好暴露了我知识上的缺陷，虽说 CSS 很早老师就教过了，但是一直没学明白，本文的总结正好复习一下 CSS 选择器。

<!-- more -->

### 参考
[阮一峰 CSS选择器笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
[w3schools](https://www.w3schools.com/cssref/css_selectors.asp)
[456 Berea Street](http://www.456bereastreet.com/archive/200509/css_21_selectors_part_1/)


### 术语

- 后代（descendant）
	元素是文档树中元素的子元素，孙元素或后面的后代。
- 祖先（ancestor）
	元素是文档树中父元素，祖父元素或更早元素的祖先。
- 孩子（child）
	元素的直接后代。在文档树中两者之间不会有其他元素。
- 父亲（parent）
	元素的直接祖先。在文档树中两者之间不会有其他元素。
- 兄弟（sibling）
	与当前元素具有相同父元素的元素。
	
### 一、基本选择器

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[*](http://www.w3school.com.cn/cssref/selector_all.asp)|\*|通用元素选择器，选择所有元素|2|
|[element](http://www.w3school.com.cn/cssref/selector_element.asp)|p|元素、类型选择器，选择所有 `<p>` 元素。|1|
|[.class](http://www.w3school.com.cn/cssref/selector_class.asp)|.intro|类选择器，选择 class=`"intro"` 的所有元素|1|
|[#id](http://www.w3school.com.cn/cssref/selector_id.asp)|#firstname|选择 id=`"firstname"` 的所有元素|1|

实例：

```css
* { background: red }

p { color:gray; }

.important { color:red; }

p.important { color:red; } 

.important.warning { background:silver; }

*#intro { font-weight:bold; }
```

ID 选择器与类选择器的区别：
区别 1：只能在文档中使用一次
区别 2：ID 属性不允许有以空格分隔的词列表。
区别 3：ID 能包含更多含义.

### 二、多元素的组合选择器

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[element, element](http://www.w3school.com.cn/cssref/selector_element_comma.asp)|div, p|选择所有 `<div>` 元素和所有 `<p>` 元素。|1|
|[element element](http://www.w3school.com.cn/cssref/selector_element_element.asp)|div p|选择 `<div>` 元素内部的所有 `<p>` 元素。|1|
|[element > element](http://www.w3school.com.cn/cssref/selector_element_gt.asp)|div > p|选择父元素为 `<div>` 元素的所有 `<p>` 元素。|2|
|[element + element](http://www.w3school.com.cn/cssref/selector_element_plus.asp)|div + p|选择紧接在 `<div>` 元素之后的所有 `<p>` 元素。|2|

实例

```css
div p { color:#f00; }

h1 em {color:red;}

div > strong { color:#ff0000; }

p + p { color:#f00; }
```

### 三、CSS 2.1 属性选择器

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[E[att]](http://www.w3school.com.cn/cssref/selector_attribute.asp)|[target]|选择带有 `target` 属性所有元素。|2|
|[E[att=val]](http://www.w3school.com.cn/cssref/selector_attribute_value.asp)|[target=_blank]|选择 target=`"_blank"` 的所有元素。|2|
|[E[att~=val]](http://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp)|[title~=flower]|选择 title 属性包含单词 `"flower"` 的所有元素。|2|
|[E[att&#124;=val]](http://www.w3school.com.cn/cssref/selector_attribute_value_start.asp)|[lang&#124;=en]|特定属性选择器，匹配所有 `lang` 属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以 val 开头的 E 元素，主要用于 lang 属性，比如 "en"、"en-us"、"en-gb" 等等|2|

实例

```css
*[title] { color:red; } 

a[href] { color:red; } 

a[href][title] { color:red; } 

planet[moons="1"] { color: red; }  

a[href="http://www.w3school.com.cn/"][title="W3School"] { color: red; }

p[class="important warning"] { color: red; } 

p[class~="important"] { color: red; } 

*[lang|="en"] { color: red; } 
```

> 部分值属性选择器与点号类名记法的区别：
> p.important 和 p[class="important"] 应用到 HTML 文档时是等价的。


### 四、CSS 2.1 中的伪类

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[:link](http://www.w3school.com.cn/cssref/selector_link.asp)|a:link|选择所有未被访问的链接。|1|
|[:visited](http://www.w3school.com.cn/cssref/selector_visited.asp)|a:visited|选择所有已被访问的链接。|1|
|[:active](http://www.w3school.com.cn/cssref/selector_active.asp)|a:active|选择活动链接。|1|
|[:hover](http://www.w3school.com.cn/cssref/selector_hover.asp)|a:hover|选择鼠标指针位于其上的链接。|1|
|[:focus](http://www.w3school.com.cn/cssref/selector_focus.asp)|input:focus|选择获得焦点的 input 元素。|2|
|[:lang(language)](http://www.w3school.com.cn/cssref/selector_lang.asp)|p:lang(it)|选择带有以 `"it"` 开头的 lang 属性值的每个 `<p>` 元素。|2|
|[:first-child](http://www.w3school.com.cn/cssref/selector_first-child.asp)|p:first-child|选择属于父元素的第一个子元素的每个 `<p>` 元素。|2|

实例
```css
a:visited { color: red; } 

p:first-child { font-weight: bold; } 

input:focus { color:yellow; }

input[type=text]:focus:hover { background:#fff; }

q:lang(no) { quotes: "~" "~"; }
```

### 五、CSS 2.1 中的伪元素

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[:first-letter](http://www.w3school.com.cn/cssref/selector_first-letter.asp)|p:first-letter|选择每个 `<p>` 元素的首字母。|1|
|[:first-line](http://www.w3school.com.cn/cssref/selector_first-line.asp)|p:first-line|选择每个 `<p>` 元素的首行。|1|
|[:before](http://www.w3school.com.cn/cssref/selector_before.asp)|p:before|在每个 `<p>` 元素的内容之前插入内容。|2|
|[:after](http://www.w3school.com.cn/cssref/selector_after.asp)|p:after|在每个 `<p>` 元素的内容之后插入内容。|2|

实例
```css
p:first-letter { font-size:200%; color:#8A2BE2; }

p:first-line { background-color:yellow; }

p:before { content:""; background:url(top.png) no-repeat 0 0; margin:0 0 0 -18px; }

a:link:after { content: " (" attr(href) ") "; }
```


### 六、CSS 3 的同级元素通用选择器

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[element1 ~ element2](http://www.w3school.com.cn/cssref/selector_gen_sibling.asp)|p ~ ul|选择父元素是 `<p>` 元素之后的每个 `<ul>` 元素。|3|
实例

```css
p ~ ul { background:#ff0; }
```

### 七、CSS 3 属性选择器

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[[attribute^=value]](http://www.w3school.com.cn/cssref/selector_attr_begin.asp)|a[src^=`"https"`]|选择其 src 属性值以 `"https"` 开头的每个 `<a>` 元素。|3|
|[[attribute$=value]](http://www.w3school.com.cn/cssref/selector_attr_end.asp)|a[src$=`".pdf"`]|选择其 src 属性以 `".pdf"` 结尾的所有 `<a>` 元素。|3|
|[[attribute*=value]](http://www.w3school.com.cn/cssref/selector_attr_contain.asp)|a[src*=`"abc"`]|选择其 src 属性中包含 `"abc"` 子串的每个 `<a>` 元素。|3|

实例

```css
a[href*="w3school.com.cn"] { color: red; }
```

### 八、CSS 3 中与用户界面有关的伪类

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[:enabled](http://www.w3school.com.cn/cssref/selector_enabled.asp)|input:enabled|选择每个启用的 `<input>` 元素。|3|
|[:disabled](http://www.w3school.com.cn/cssref/selector_disabled.asp)|input:disabled|选择每个禁用的 `<input>` 元素|3|
|[:checked](http://www.w3school.com.cn/cssref/selector_checked.asp)|input:checked|选择每个被选中的 `<input>` 元素。|3|
|[::selection](http://www.w3school.com.cn/cssref/selector_selection.asp)|::selection|选择被用户选取的元素部分。|3|

### 九、CSS 3 中的结构性伪类

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[:root](http://www.w3school.com.cn/cssref/selector_root.asp)|:root|选择文档的根元素。|3|
|[:nth-child(n)](http://www.w3school.com.cn/cssref/selector_nth-child.asp)|p:nth-child(2)|选择属于其父元素的第二个子元素的每个 `<p>` 元素。|3|
|[:nth-last-child(n)](http://www.w3school.com.cn/cssref/selector_nth-last-child.asp)|p:nth-last-child(2)|同上，从最后一个子元素开始计数。|3|
|[:nth-of-type(n)](http://www.w3school.com.cn/cssref/selector_nth-of-type.asp)|p:nth-of-type(2)|选择属于其父元素第二个 `<p>` 元素的每个 `<p>` 元素。|3|
|[:nth-last-of-type(n)](http://www.w3school.com.cn/cssref/selector_nth-last-of-type.asp)|p:nth-last-of-type(2)|同上，但是从最后一个子元素开始计数。|3|
|[:last-child](http://www.w3school.com.cn/cssref/selector_last-child.asp)|p:last-child|选择属于其父元素最后一个子元素的每个 `<p>` 元素。|3|
|[:first-of-type](http://www.w3school.com.cn/cssref/selector_first-of-type.asp)|p:first-of-type|选择属于其父元素的首个 `<p>` 元素的每个 `<p>` 元素。等同于 `:nth-of-type(1)` |3|
|[:last-of-type](http://www.w3school.com.cn/cssref/selector_last-of-type.asp)|p:last-of-type|选择属于其父元素的最后 `<p>` 元素的每个 `<p>` 元素。等同于 `:nth-last-of-type(1)`|3|
|[:only-of-type](http://www.w3school.com.cn/cssref/selector_only-of-type.asp)|p:only-of-type|选择属于其父元素唯一的 `<p>` 元素的每个 `<p>` 元素。等同于 `:first-child:last-child`、`:nth-child(1):nth-last-child(1)`|3|
|[:only-child](http://www.w3school.com.cn/cssref/selector_only-child.asp)|p:only-child|选择属于其父元素的唯一子元素的每个 `<p>` 元素。等同于 `:first-of-type:last-of-type`、`:first-of-type(1):last-of-type(1)`|3|
|[:empty](http://www.w3school.com.cn/cssref/selector_empty.asp)|p:empty|选择没有子元素的每个 `<p>` 元素（文本节点也被看作子元素）。|3|

实例

```css
:root { background:#ff0000; }

p:empty { background:#ff0000; }

p:first-of-type { background:#ff0000; }  

p:last-of-type { background:#ff0000; } 

p:only-of-type { background:#ff0000; } 

p:only-child { background:#ff0000; } 

p:nth-child(3) { background:#ff0000; }

p:nth-child(odd) { background:#ff0000; }

p:nth-child(even) { background:#ff0000; }

p:nth-last-child(3n+0) { background:#ff0000; }
```


### 十、CSS 3的反选伪类

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[:not(selector)](http://www.w3school.com.cn/cssref/selector_not.asp)|:not(p)|选择非 `<p>` 元素的每个元素。|3|

实例

```css
:not(p) { border:1px solid #ccc; }
```


### 十一、CSS 3 中的 :target 伪类

|选择器|用法|描述|CSS 版本|
|:--|:--|:--|:--|
|[:target](http://www.w3school.com.cn/cssref/selector_target.asp)|#news:target|选择当前活动（点击）的 #news 元素。|3|

实例

```css
:target { border: 2px solid #D4D4D4; background-color: #e5eecc; }
```


（完）