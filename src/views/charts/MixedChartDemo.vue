<script lang="ts" setup>
import { defineComponent } from "vue"
import MixedChart from "@/components/Charts/MixedChart.vue"
defineComponent({
  components: {
    MixedChart
  }
})
</script>

<template>
  <div class="chart-container">
    <MixedChart height="100%" width="100%" />
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
