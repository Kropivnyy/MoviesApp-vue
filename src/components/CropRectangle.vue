<template>
  <div
    class="CropRectangle"
    :style="{ left: left, top: top, width: width, height: height }"
  ></div>
</template>

<script>
export default {
  name: 'CropRectangle',
  props: ['left', 'top', 'width', 'height'],
};
</script>

<style lang="scss">
.CropRectangle {
  position: absolute;
  background-color: transparent;
  border: 2px solid #ee2139;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #ffffff34;
  }
}
</style>
