import { useTagsViewStore } from "@/store/modules/tags-view"
import type { VNode } from "vue"
import { h } from "vue"
import { KeepAlive, cloneVNode, createVNode, defineComponent } from "vue"
import { useRoute } from "vue-router"
interface CompConsumerProps {
  component?: VNode
}
const compMap = new Map<string, VNode>()
export const CompConsumer = defineComponent(
  (props: CompConsumerProps) => {
    const tagsViewStore = useTagsViewStore()
    const route = useRoute()
    return () => {
      const component = props.component
      // 判断当前是否包含name，如果不包含name，那就直接处理掉name
      if (!route.name) return component
      // 获取当前组件的name
      const compName = (component?.type as any)?.name
      const routeName = route.name as string
      let Comp: VNode
      if (compMap.has(routeName)) {
        // @ts-expect-error this is Node
        Comp = compMap.get(routeName)
      } else {
        const node = cloneVNode(component!)
        if (compName && compName === routeName)
          // @ts-expect-error this is obj
          node.type.name = `__${compName}__` + "CUSTOM_NAME"
        // @ts-expect-error this is VNode
        // eslint-disable-next-line vue/one-component-per-file
        Comp = defineComponent({
          name: routeName,
          setup() {
            return () => node
          }
        })
        compMap.set(routeName, Comp)
      }
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
    // eslint-disable-next-line vue/one-component-per-file
  },
  {
    name: "CompConsumer",
    props: ["component"]
  }
)
