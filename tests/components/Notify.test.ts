import Notify from "@@/components/Notify/index.vue"
import List from "@@/components/Notify/List.vue"
import { shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

describe("notify", () => {
  it("正常渲染", () => {
    const wrapper = shallowMount(Notify)
    expect(wrapper.classes("notify")).toBe(true)
  })
})

describe("list", () => {
  it("list 长度为 0", () => {
    const wrapper = shallowMount(List, {
      props: {
        data: []
      }
    })
    expect(wrapper.find("el-empty-stub").exists()).toBe(true)
  })
  it("list 长度不为 0", () => {
    const wrapper = shallowMount(List, {
      props: {
        data: [
          {
            title: ""
          }
        ]
      }
    })
    expect(wrapper.find("el-empty-stub").exists()).toBe(false)
  })
})
