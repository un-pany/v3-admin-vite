import{ai as _,n as g,u as f,E as l,ad as y}from"./element-DTr4GFVH.js";import"./index-C03qqTrH.js";/* empty css                *//* empty css                  *//* empty css                 *//* empty css                   */import{G as E,M as w,a0 as n,W as c,L as x,_ as p}from"./vue-COQCswyy.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./vxe-B_pW83TD.js";const S={lock:!0,text:"加载中..."},u=(t,e={})=>{let s;return async(...a)=>{try{return s=_.service({...S,...e}),await t(...a)}finally{s.close()}}},A={code:0,data:{list:[]},message:"获取成功"};function k(t){return new Promise(e=>{setTimeout(()=>{e({...A,data:{list:t}})},1e3)})}function v(){return new Promise((t,e)=>{setTimeout(()=>{e(new Error("发生错误"))},1e3)})}const L={class:"app-container"},b=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,h=E({__name:"use-fullscreen-loading",setup(t){const e={text:"即将发生错误...",background:"#F56C6C20",svg:b,svgViewBox:"-10, -10, 50, 50"};async function s(){const o=await u(k)([1,2,3]);l.success(`${o.message}，传参为 ${o.data.list.toString()}`)}async function a(){try{await u(v,e)()}catch(o){l.error(o.message)}}return(o,r)=>{const d=y,i=f,m=g;return x(),w("div",L,[n(d,{title:"示例说明",type:"primary",description:"通过将要执行的函数传递给 composable，让 composable 自动开启全屏 loading，函数执行结束后自动关闭 loading","show-icon":""}),n(m,{header:"示例",shadow:"never"},{default:c(()=>[n(i,{type:"primary",onClick:s},{default:c(()=>[...r[0]||(r[0]=[p(" 查询成功 ",-1)])]),_:1}),n(i,{type:"danger",onClick:a},{default:c(()=>[...r[1]||(r[1]=[p(" 查询失败 ",-1)])]),_:1})]),_:1})])}}}),$=C(h,[["__scopeId","data-v-b3cc50c7"]]);export{$ as default};
