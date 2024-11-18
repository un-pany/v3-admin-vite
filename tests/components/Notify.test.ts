import Notify from "@/components/Notify/index.vue"
import NotifyList from "@/components/Notify/NotifyList.vue"
import { shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe("notify", () => {
  it("正常渲染", () => {
    const wrapper = shallowMount(Notify)
    expect(wrapper.classes("notify")).toBe(true)
  })
})

describe("notifyList", () => {
  it("list 长度为 0", () => {
    const wrapper = shallowMount(NotifyList, {
      props: {
        list: []
      }
    })
    expect(wrapper.find("el-empty").exists()).toBe(true)
  })
  it("list 长度不为 0", () => {
    const wrapper = shallowMount(NotifyList, {
      props: {
        list: [
          {
            title: ""
          }
        ]
      }
    })
    expect(wrapper.find("el-empty").exists()).toBe(false)
  })
})
