import{I as d,b as a}from"./elment-3594ebb6.js";import{H as p,ah as _,l as m,m as g,V as c,P as l,T as i,p as f}from"./vue-09136d94.js";const h={lock:!0,text:"加载中..."},u=(t,s={})=>{let e;return async(...n)=>{try{return e=d.service({...h,...s}),await t(...n)}finally{e==null||e.close()}}},k={code:0,data:{},message:"获取成功"};function w(){return new Promise(t=>{setTimeout(()=>{t(k)},1e3)})}function y(){return new Promise((t,s)=>{setTimeout(()=>{s(new Error("发生错误"))},1e3)})}const C={class:"app-container"},E=f("h4",null,"该示例是演示：通过将要执行的函数传递给 hook，让 hook 自动开启全屏 loading，函数执行结束后自动关闭 loading",-1),x=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,b=p({__name:"use-fullscreen-loading",setup(t){const s={text:"即将发生错误...",background:"#F56C6C20",svg:x,svgViewBox:"-10, -10, 50, 50"},e=async()=>{const o=await u(w)();a.success(o.message)},n=async()=>{try{await u(y,s)()}catch(o){a.error(o.message)}};return(o,S)=>{const r=_("el-button");return m(),g("div",C,[E,c(r,{onClick:e},{default:l(()=>[i("查询成功")]),_:1}),c(r,{onClick:n},{default:l(()=>[i("查询失败")]),_:1})])}}});export{b as default};
