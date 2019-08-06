# uidemo 书写规范

标签（空格分隔）： 未分类

---

初版，如有建议欢迎讨论修改。

## 是什么
- 移动端优先的响应式UI框架(或许不支持pc)


## 知识储备
- [OOCSS和BEM][1]
- [bootstrap4命名规则学习][2]


## 要点
- 基于flexbox布局，由于是移动端ui库，放弃兼容ie。
- 图标使用google material，如果有需求使用自定义icon。
- 使用rem和@media实现响应式，在不能使用rem的地方使用em，避免使用px。
- 可以适当使用百分比单位辅助。


## 文件结构
```
- dist  //打包后的文件
- scss  //scss源码
    - mixins    //@mixin方法
    - utilities   // 全局样式
    - _functions.scss : 公共方法：用于检测断点、表单中用到的SVG icons、颜色处理；
    - _variables.scss : 变量：颜色、断点、行间距、栅格等等参数；
    - _mixins.scss : 抽象类：从一些枯燥重复的CSS抽象出来的方法；
    - _reboot.scss: CSS初始化：不同浏览器自带的默认样式不同，这样使浏览器尽可能统一，例如：Reset.css、Normalize.css
    - ...使用下划线_开头的scss文件，主要有布局、内容、组件。
    
- js    //js源码(如果有的话)

```


## 嵌套
- [不要在sass中滥用嵌套][3]

- 我们有一个不成文的规定，**不要超过四层嵌套，不然就重构**。超过四层嵌套，意味着你要选择一个很深的元素，这时候你必须有所行动。
1. 利用全局样式规范全局样式可以做很多规范，影响很多同类的元素。比如全局定义的 normalize 就可以影响非常多的样式。如果只想局部作用，那么第一层用模块 class 约束再定义 tag 或 class。
2. 尽可能的用预编译器的语法可以用 less 的 extend 或 mixin，目的也是提取公用逻辑
3. 简化 HTML 结构在一个模块里，写四层以上的嵌套结构也不少了，是不是能再抽象模块里的子模块？





  [1]: https://segmentfault.com/a/1190000000704006
  [2]: https://www.jianshu.com/p/22b446439a55
  [3]: http://mydearxym.github.io/2016/09/22/not-nest-in-sass/