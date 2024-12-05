## 目录说明

- `common/assets/icons/preserve-color` 目录下存放带颜色的 svg icon

- `common/assets/icons` 目录存放的 svg icon 会被插件重写 `fill` 和 `stroke` 属性，使得图片自带的颜色丢失，从而继承父元素的颜色

## 使用说明

`common/assets/icons/preserve-color` 目录下需要添加 `preserve-color/` 前缀，像这样： `<SvgIcon name="preserve-color/name" />`

`common/assets/icons` 目录下则不需要，像这样： `<SvgIcon name="name" />`
