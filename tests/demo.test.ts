import { describe, expect, it } from "vitest"

/**
 * @description 该文件所有示例均是为了向你演示 Vitest 最基本的用法
 * @link https://cn.vitest.dev/api
 * @api describe: 形成一个作用域
 * @api test/it: 定义了一组关于测试期望的方法。它接收测试名称和一个含有测试期望的函数
 * @api expect: 创建断言
 * @api toBe: 可用于断言基础对象是否相等，或者对象是否共享相同的引用
 * @api toEqual: 断言检查值是否等于接收值，或者是同样的结构，如果是对象类型（将会使用递归的方法进行比较）
 */

const author1 = {
  name: "pany",
  email: "939630029@qq.com",
  url: "https://github.com/pany-ang"
}

const author2 = {
  name: "pany",
  email: "939630029@qq.com",
  url: "https://github.com/pany-ang"
}

describe("这里填写作用域名称", () => {
  it("测试基础数据类型", () => {
    expect(1 + 1).toBe(2)
  })
  it("测试引用类型", () => {
    expect(author1).toEqual(author2)
  })
})
