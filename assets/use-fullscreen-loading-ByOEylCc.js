import{ai as m,n as g,u as f,E as l,ad as y}from"./element-DDW3P31n.js";import{G as E,M as w,a0 as a,W as c,L as x,_ as u}from"./vue-CsvEZU6_.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S={lock:!0,text:"加载中..."},d=(t,e={})=>{let o;return async(...r)=>{try{return o=m.service({...S,...e}),await t(...r)}finally{o.close()}}},A={code:0,data:{list:[]},message:"获取成功"};function k(t){return new Promise(e=>{setTimeout(()=>{e({...A,data:{list:t}})},1e3)})}function v(){return new Promise((t,e)=>{setTimeout(()=>{e(new Error("发生错误"))},1e3)})}const L={class:"app-container"},b=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,h=E({__name:"use-fullscreen-loading",setup(t){const e={text:"即将发生错误...",background:"#F56C6C20",svg:b,svgViewBox:"-10, -10, 50, 50"};async function o(){const s=await d(k)([1,2,3]);l.success(`${s.message}，传参为 ${s.data.list.toString()}`)}async function r(){try{await d(v,e)()}catch(s){l.error(s.message)}}return(s,n)=>{const p=y,i=f,_=g;return x(),w("div",L,[a(p,{title:"示例说明",type:"primary",description:"通过将要执行的函数传递给 composable，让 composable 自动开启全屏 loading，函数执行结束后自动关闭 loading","show-icon":""}),a(_,{header:"示例",shadow:"never"},{default:c(()=>[a(i,{type:"primary",onClick:o},{default:c(()=>[...n[0]||(n[0]=[u(" 查询成功 ",-1)])]),_:1}),a(i,{type:"danger",onClick:r},{default:c(()=>[...n[1]||(n[1]=[u(" 查询失败 ",-1)])]),_:1})]),_:1})])}}}),M=C(h,[["__scopeId","data-v-b3cc50c7"]]);export{M as default};
