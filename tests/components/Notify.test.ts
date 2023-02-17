import { shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Notify from "@/components/Notify/index.vue"
import NotifyList from "@/components/Notify/NotifyList.vue"

describe("Notify", () => {
  it("正常渲染", () => {
    const wrapper = shallowMount(Notify)
    expect(wrapper.classes("notify")).toBe(true)
  })
})

describe("NotifyList", () => {
  it("List 长度为 0", () => {
    const wrapper = shallowMount(NotifyList, {
      props: {
        list: []
      }
    })
    expect(wrapper.find("el-empty").exists()).toBe(true)
  })
  it("List 长度不为 0", () => {
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
