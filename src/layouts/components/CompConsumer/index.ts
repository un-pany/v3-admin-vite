import { type VNode, cloneVNode, createVNode, defineComponent, h, KeepAlive } from "vue"
import { useRoute } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tags-view"

interface CompConsumerProps {
  component: VNode
}

/** 定义 compMap 对象，用于存储路由名称和对应的组件 */
const compMap = new Map<string, VNode>()

/**
 * CompConsumer 组件
 * 用法：替换 <keep-alive> 标签以及内部代码，变成：<CompConsumer :component="Component" />
 * 优点：缓存路由时只需写路由 Name，无需再写组件 Name
 * 缺点：当路由表有动态路由匹配时（指向同一个组件），会出现复用组件的情况（例如修改 /info/1 时 /info/2 也会跟着改变）
 */
export const CompConsumer = defineComponent(
  (props: CompConsumerProps) => {
    const tagsViewStore = useTagsViewStore()
    const route = useRoute()
    return () => {
      // 获取传入的组件
      const component = props.component
      // 判断当前是否包含 name，如果不包含 name，那就直接处理掉 name
      if (!route.name) return component
      // 获取当前组件的名称
      const compName = (component.type as any)?.name
      // 获取当前路由的名称
      const routeName = route.name as string
      let Comp: VNode
      // 检查 compMap 中是否已经存在对应的组件
      if (compMap.has(routeName)) {
        // 如果存在，则直接使用该组件进行渲染
        Comp = compMap.get(routeName)!
      } else {
        // 如果不存在，则克隆传入的组件并创建一个新的组件，将其添加到 compMap 中
        const node = cloneVNode(component)
        if (compName && compName === routeName) {
          ;(node.type as any).name = `__${compName}__CUSTOM_NAME`
        }
        // @ts-expect-error this is VNode
        Comp = defineComponent({
          name: routeName,
          setup() {
            return () => node
          }
        })
        compMap.set(routeName, Comp)
      }
      // 使用 createVNode 函数创建一个 KeepAlive 组件，并缓存 cachedViews 数组中对应的组件
      return createVNode(
        KeepAlive,
        {
          include: tagsViewStore.cachedViews
        },
        {
          default: () => h(Comp)
        }
      )
    }
  },
  {
    name: "CompConsumer",
    props: ["component"]
  }
)
