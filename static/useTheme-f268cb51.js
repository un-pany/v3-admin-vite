import{C as e}from"./user-24e19b27.js";import{as as t}from"./runtime-core.esm-bundler-1857aef3.js";const a=()=>localStorage.getItem(e.SIDEBAR_STATUS),m=t=>{localStorage.setItem(e.SIDEBAR_STATUS,t)},l=[{title:"默认",name:"normal"},{title:"黑暗",name:"dark"},{title:"深蓝",name:"dark-blue"}],o=t(localStorage.getItem(e.ACTIVE_THEME_NAME)||"normal"),r=()=>{n(o.value)},s=t=>{var a;o.value=t,n(o.value),a=o.value,localStorage.setItem(e.ACTIVE_THEME_NAME,a)},n=e=>{document.documentElement.className=e};function u(){return{themeList:l,activeThemeName:o,initTheme:r,setTheme:s}}export{a as g,m as s,u};