<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue"
console.log('测试 console.log')
console.info('测试 console.info')
console.error('测试 console.error')
console.info('测试 VITE_BASE_API', import.meta.env.VITE_BASE_API)
console.info('测试 MODE', import.meta.env.MODE)
console.info('测试 BASE_URL', import.meta.env.BASE_URL)
console.info('测试 DEV', import.meta.env.DEV)
console.info('测试 PROD', import.meta.env.PROD)
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
