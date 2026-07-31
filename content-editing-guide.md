# 《1970》热点与侧栏内容编辑说明

## 底图到完成拼贴图

每章可以提供两张尺寸、裁切和构图完全一致的 JPG：

- `baseImage`：没有后加拼贴元素的底图。
- `image`：Photoshop 完成图。

两张图最好使用相同像素尺寸、色彩空间和压缩比例。画面如果发生缩放、裁切或透视移动，过渡时会出现重影。

章节资料支持不同的 `reveal`：

```js
{
  baseImage: "assets/chapters/base/chapter-01-base.jpg",
  image: "assets/chapters/memo-01-1953.jpeg",
  reveal: "dissolve"
}
```

目前可用方式：

- `dissolve`：模糊溶解，适合记忆、人物和多处散落拼贴。
- `sweep`：从左向右显影，适合走廊、文字和视线方向明确的画面。
- `rise`：从下向上显影，适合土地、稻田或由地面生长出的元素。
- `light`：像光线扫过一样从上向下展开。
- `radial`：从指定焦点向外展开，适合门、人物或单一视觉中心。

使用两张整图时，可以自由控制方向、焦点、模糊、亮度、显影范围、停顿和速度；但无法让多个拼贴元素彼此独立地按不同时间出现。如果以后需要“人物先出现、文字后出现、最后再出现纸张纹理”，仍需要分别导出元素图层。

## 最简单的资料交付方式

每次按下面格式提供即可，不需要自己改代码：

- 章节：第几章或序言
- 类型：热点 / 历史说明 / 参考图片 / 小说原文
- 图片文件：直接放进项目或发给我
- 热点位置：说明“书柜左上”“红门中央”等；如果能给百分比更准确
- 中文标题：
- 英文翻译：
- 简短说明：悬停时显示，建议 30–80 字
- Learn more 长说明：侧栏中显示
- 图片出处：作者、机构、年份、链接、版权或授权信息
- 小说原文：注明章节、页码；如有英文译文也一起提供

## 图片放在哪里

建议按章节建立目录：

```text
assets/context/chapter-01/
assets/context/chapter-02/
assets/context/chapter-03/
assets/context/chapter-04/
assets/context/chapter-05/
assets/context/chapter-06/
```

文件名尽量使用英文、数字和短横线，例如：

```text
assets/context/chapter-02/dazibao-reference-01.jpg
```

## 热点的位置如何计算

热点使用图片宽高百分比：

- `x: 0` 是最左，`x: 100` 是最右。
- `y: 0` 是最上，`y: 100` 是最下。
- 图片中心约为 `x: 50, y: 50`。

如果知道鼠标在原图上的像素位置：

```text
x = 鼠标横坐标 ÷ 图片宽度 × 100
y = 鼠标纵坐标 ÷ 图片高度 × 100
```

例如一张 1600 × 900 的图片，目标位于像素 `(960, 630)`：

```text
x = 960 ÷ 1600 × 100 = 60
y = 630 ÷ 900 × 100 = 70
```

热点坐标就是 `x: 60, y: 70`。

## 增加、删除或修改热点

热点资料位于 `script.js` 顶部的 `HOTSPOTS`。六组数组依次对应六章。

一个完整热点可以包含：

```js
{
  x: 60,
  y: 70,
  zh: "没有墙的红门",
  en: "The red door without a wall",
  note: "悬停时出现的简短解释。",
  image: "assets/context/chapter-05/red-door-reference.jpg",
  source: "图片来源、作者、年份与链接",
  term: "sent-down"
}
```

- 增加：在对应章节数组里加入一组 `{ ... }`。
- 删除：删除对应的整组 `{ ... }`。
- 移动：修改 `x` 和 `y`。
- 更换悬停文字：修改 `zh`、`en` 和 `note`。
- 增加侧栏参考图：加入 `image` 和 `source`。
- `term` 为可选项；只有热点需要打开现有术语解释时才使用。

## 每章侧栏的三类内容

每章侧栏已经分成：

1. 历史说明 / Historical context
2. 参考图片与来源 / References & sources
3. 小说原文阅读 / Read the novel

章节资料位于 `script.js` 顶部的 `CONTEXTS`，顺序同样是第一章到第六章。

参考图片格式：

```js
references: [
  {
    image: "assets/context/chapter-02/reference-01.jpg",
    alt: "供屏幕阅读器使用的图片说明",
    caption: "图片内容及它与本章的关系",
    source: "作者／机构，年份，原始链接，授权信息"
  }
]
```

小说原文格式：

```js
novelZh: "这里放本章中文原文，可保留换行。",
novelEn: "Optional English translation."
```

尚未提供的章节会显示“尚未导入”，不会使用虚构资料填充。
