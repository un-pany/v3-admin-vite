function initStarNotification() {
  setTimeout(() => {
    ElNotification({
      title: "为爱发电！",
      type: "success",
      message: h(
        "div",
        null,
        [
          h("div", null, "所有源码均免费开源，如果对你有帮助，欢迎点个 Star 支持一下！"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" }, "点击传送")
        ]
      ),
      duration: 0,
      position: "bottom-right"
    })
  }, 0)
}

function initStoreNotification() {
  setTimeout(() => {
    ElNotification({
      title: "懒人服务？",
      type: "warning",
      message: h(
        "div",
        null,
        [
          h("div", null, "不想自己动手，但想移除 TS 或其他模块？也有懒人套餐！"),
          h("a", { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite/issues/225" }, "点击查看")
        ]
      ),
      duration: 0,
      position: "bottom-right"
    })
  }, 500)
}

/** 作者的小心思 */
export function usePany() {
  return { initStarNotification, initStoreNotification }
}
