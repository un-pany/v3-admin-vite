<script lang="ts">
import { defineComponent } from "vue"
import BarChart from "@/components/Charts/BarChart.vue"
export default defineComponent({
  components: {
    BarChart
  }
})
</script>

<template>
  <div class="chart-container">
    <BarChart height="100%" width="100%" />
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
