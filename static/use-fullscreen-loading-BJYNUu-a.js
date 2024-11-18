import{I as d,b as i}from"./element-C5mYgMeM.js";import{p as m,ai as g,q as f,t as y,v as _,U as l,O as c,S as u}from"./vue-BWN0lbwY.js";const k={lock:!0,text:"加载中..."},p=(o,e={})=>{let t;return async(...n)=>{try{return t=d.service({...k,...e}),await o(...n)}finally{t==null||t.close()}}},w={code:0,data:{list:[]},message:"获取成功"};function C(o){return new Promise(e=>{setTimeout(()=>{e({...w,data:{list:o}})},1e3)})}function E(){return new Promise((o,e)=>{setTimeout(()=>{e(new Error("发生错误"))},1e3)})}const S={class:"app-container"},x=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,b=m({__name:"use-fullscreen-loading",setup(o){const e={text:"即将发生错误...",background:"#F56C6C20",svg:x,svgViewBox:"-10, -10, 50, 50"},t=async()=>{const r=await p(C)([2,3,3]);i.success(`${r.message}，传参为 ${r.data.list.toString()}`)},n=async()=>{try{await p(E,e)()}catch(r){i.error(r.message)}};return(r,s)=>{const a=g("el-button");return f(),y("div",S,[s[2]||(s[2]=_("h4",null,"该示例是演示：通过将要执行的函数传递给 hook，让 hook 自动开启全屏 loading，函数执行结束后自动关闭 loading",-1)),l(a,{type:"primary",onClick:t},{default:c(()=>s[0]||(s[0]=[u("查询成功")])),_:1}),l(a,{type:"danger",onClick:n},{default:c(()=>s[1]||(s[1]=[u("查询失败")])),_:1})])}}});export{b as default};
