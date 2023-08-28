import { type VNode, cloneVNode, createVNode, defineComponent, h, KeepAlive } from "vue"
import { useRoute } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tags-view"

interface CompConsumerProps {
  component: VNode
}

const compMap = new Map<string, VNode>()

export const CompConsumer = defineComponent(
  (props: CompConsumerProps) => {
    const tagsViewStore = useTagsViewStore()
    const route = useRoute()
    return () => {
      const component = props.component
      // 判断当前是否包含 name，如果不包含name，那就直接处理掉 name
      if (!route.name) return component
      // 获取当前组件的 name
      const compName = (component.type as any)?.name
      const routeName = route.name as string
      let Comp: VNode
      if (compMap.has(routeName)) {
        Comp = compMap.get(routeName)!
      } else {
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
