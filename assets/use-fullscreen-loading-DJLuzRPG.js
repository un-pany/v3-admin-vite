import"./index-DQCMVnha.js";/* empty css                *//* empty css                  *//* empty css                 *//* empty css                   */import{ai as m,a3 as g,o as f,r as E,E as l}from"./element-CU4ZSkn3.js";import{t as y,v as w,M as n,E as c,J as p,x}from"./vue-C06Il7Tf.js";import{_ as C}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./vxe-Cospg-vz.js";const S={lock:!0,text:"加载中..."},u=(t,e={})=>{let s;return async(...a)=>{try{return s=m.service({...S,...e}),await t(...a)}finally{s.close()}}},v={code:0,data:{list:[]},message:"获取成功"};function A(t){return new Promise(e=>{setTimeout(()=>{e({...v,data:{list:t}})},1e3)})}function k(){return new Promise((t,e)=>{setTimeout(()=>{e(new Error("发生错误"))},1e3)})}const b={class:"app-container"},h=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,L=y({__name:"use-fullscreen-loading",setup(t){const e={text:"即将发生错误...",background:"#F56C6C20",svg:h,svgViewBox:"-10, -10, 50, 50"};async function s(){const o=await u(A)([1,2,3]);l.success(`${o.message}，传参为 ${o.data.list.toString()}`)}async function a(){try{await u(k,e)()}catch(o){l.error(o.message)}}return(o,r)=>{const d=g,i=E,_=f;return x(),w("div",b,[n(d,{title:"示例说明",type:"primary",description:"通过将要执行的函数传递给 composable，让 composable 自动开启全屏 loading，函数执行结束后自动关闭 loading","show-icon":""}),n(_,{header:"示例",shadow:"never"},{default:c(()=>[n(i,{type:"primary",onClick:s},{default:c(()=>r[0]||(r[0]=[p(" 查询成功 ")])),_:1,__:[0]}),n(i,{type:"danger",onClick:a},{default:c(()=>r[1]||(r[1]=[p(" 查询失败 ")])),_:1,__:[1]})]),_:1})])}}}),$=C(L,[["__scopeId","data-v-b3cc50c7"]]);export{$ as default};
