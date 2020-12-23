
## 0.0.17

- 修复
  - 修复index.d.ts生成不正确的问题
  - 修复快速调用打开隐藏时显示错误的问题

- 新增
  - 新增footer属性：可以自定义modal的底部内容
  - 新增centerd属性：是否默认居中modal
  - 新增zIndex属性：可以手动修改modal层级z-index

## 0.0.15

- 新增
  - 新增maskClosable属性：点击蒙层是否允许关闭(默认为true)
  - 新增escClode属性：是否能够点击esc按钮关闭(默认为true)
  - 新增sureText/cancelText属性：设定按钮文本，默认中文确定，取消
  - 新增closable属性：是否显示右上角关闭按钮，默认为true
  - 新增canFullscreen属性：是否可以全屏

## 0.0.14

- 修复
  - 解决拖动后可能出现文字模糊的问题
  - 修复多层弹框遮罩层显示错误的问题
  - 修复多层弹窗时设置body style overflow有误的问题

- 调整
  - 调整底部button的radius圆角为3px

- 新增
  - afterClose: 弹框关闭后调用事件

## 0.0.13

- 修复
  - 打开关闭弹窗时对body上的style处理不准确的问题


## 0.0.9

- 优化title可支持string和DOM节点


## 0.0.8

- 优化关闭按钮样式
- 优化footer样式和按钮