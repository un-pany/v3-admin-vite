<template>
  <div class="owl" :class="props.closedEyes ? 'owl-password' : ''">
    <div class="eyes" />
    <div class="arm-up-right" />
    <div class="arm-up-left" />
    <div class="arm-down-left" />
    <div class="arm-down-right" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  closedEyes: boolean
}>()
</script>
<style lang="scss">
@import "@/styles/mixins.scss";
.owl {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 95px;
  transform: translate(-50%, -322%);
  background-size: 116px 92px;
  // margin-left: -64px;
  cursor: pointer;
  @include backgroundImage(url("@/assets/image/owl/face.png"));

  .eyes {
    width: 100%;
    height: 100%;
    opacity: 0;
    @include transition(0.1s ease-out 0s);
    @include backgroundImage(url("@/assets/image/owl/eye.png"));
  }
  .arm-up-right {
    width: 51px;
    height: 41px;
    position: absolute;
    bottom: 10px;
    right: 5px;
    z-index: 2;
    background-position: 0 25px;
    opacity: 0;
    @include transform(translateX(57px) scale(0.8));
    @include transformOrigin(0 40px);
    @include backgroundImage(url("@/assets/image/owl/arm-up-right.png"));
    @include transition(background-position 0.3s ease-out, transform 0.3s ease-out, opacity 0s linear 0.2s);
  }
  .arm-up-left {
    position: absolute;
    bottom: 10px;
    left: -3px;
    width: 52px;
    height: 41px;
    z-index: 2;
    background-position: 0 25px;
    opacity: 0;
    @include transform(translateX(-34px) scale(0.8));
    @include transformOrigin(0 40px);
    @include backgroundImage(url("@/assets/image/owl/arm-up-left.png"));
    @include transition(background-position 0.3s ease-out, transform 0.3s ease-out, opacity 0s linear 0.2s);
  }
  .arm-down-left {
    position: absolute;
    bottom: 2px;
    left: -34px;
    width: 43px;
    height: 25px;
    z-index: 1;
    @include transition(0.3s ease-out);
    @include backgroundImage(url("@/assets/image/owl/arm-down-left.png"));
  }
  .arm-down-right {
    position: absolute;
    bottom: 1px;
    right: -40px;
    width: 43px;
    height: 26px;
    z-index: 1;

    @include transition(0.3s ease-out);
    @include backgroundImage(url("@/assets/image/owl/arm-down-right.png"));
  }
}
.owl-password {
  .eyes {
    opacity: 1;
    @include transition(0.1s ease-out 0.2s);
  }
  .arm-up-right {
    background-position: 0 0;
    opacity: 1;
    @include transform(scale(1));
    @include transition(background-position 0.3s ease-out, transform 0.3s ease-out);
  }
  .arm-up-left {
    @include transform(scale(1));
    background-position: 0 0;
    opacity: 1;
    @include transition(background-position 0.3s ease-out, transform 0.3s ease-out);
  }
  .arm-down-left {
    @include transform(translateX(40px) scale(0) translateY(-10px));
  }
  .arm-down-right {
    @include transform(translateX(-32px) scale(0) translateY(-8px));
  }
}
</style>
