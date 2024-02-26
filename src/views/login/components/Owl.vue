<script lang="ts" setup>
interface Props {
  closeEyes: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="owl" :class="{ 'owl-password': props.closeEyes }">
    <div class="hand-down-left" />
    <div class="hand-down-right" />
    <div class="hand-up-left" />
    <div class="hand-up-right" />
    <div class="close-eyes" />
  </div>
</template>

<style lang="scss" scoped>
@mixin backgroundImage($url) {
  background-image: url($url);
  background-repeat: no-repeat;
  background-size: 100%;
}

.owl {
  position: relative;
  width: 120px;
  height: 95px;
  transform: translateY(12%);
  @include backgroundImage("@/assets/login/face.png");
  .hand-down-left,
  .hand-down-right {
    position: absolute;
    width: 45px;
    height: 25px;
    z-index: 1;
    transition: 0.3s ease-out;
  }
  .hand-down-left {
    bottom: 3px;
    left: -35px;
    @include backgroundImage("@/assets/login/hand-down-left.png");
  }
  .hand-down-right {
    bottom: 3px;
    right: -40px;
    @include backgroundImage("@/assets/login/hand-down-right.png");
  }
  .hand-up-left,
  .hand-up-right {
    position: absolute;
    width: 50px;
    height: 40px;
    z-index: 2;
    opacity: 0;
    background-position: 0 25px;
    transform-origin: 0 40px;
    transition:
      background-position 0.3s ease-out,
      transform 0.3s ease-out,
      opacity 0s linear 0.2s;
  }
  .hand-up-left {
    bottom: 10px;
    left: -3px;
    transform: translateX(-30px) scale(0.8);
    @include backgroundImage("@/assets/login/hand-up-left.png");
  }
  .hand-up-right {
    bottom: 10px;
    right: 5px;
    transform: translateX(55px) scale(0.8);
    @include backgroundImage("@/assets/login/hand-up-right.png");
  }
  .close-eyes {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: 0.1s ease-out 0s;
    @include backgroundImage("@/assets/login/close-eyes.png");
  }
}

.owl-password {
  .hand-down-left {
    transform: translateX(40px) scale(0) translateY(-10px);
  }
  .hand-down-right {
    transform: translateX(-32px) scale(0) translateY(-8px);
  }
  .hand-up-left,
  .hand-up-right {
    transform: scale(1);
    background-position: 0 0;
    opacity: 1;
    transition:
      background-position 0.3s ease-out,
      transform 0.3s ease-out;
  }
  .close-eyes {
    opacity: 1;
    transition: 0.1s ease-out 0.2s;
  }
}
</style>
