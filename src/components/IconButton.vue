<template>
  <button @click.prevent="$emit('on-click')" class="icon-button" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    'on-click': {
      type: Function,
      default: () => null,
    },
  },
};
</script>

<style lang="scss">
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  color: #fff;
  background-color: transparent;
  line-height: 1;
  border: 0;
  outline: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    background-color: #ffffff21;
  }

  &.fixed {
    position: fixed;
    right: 24px;
    bottom: 24px;
    background-color: #3f51b5;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;

    &:hover,
    &:focus,
    &:active {
      transform: scale(1.03);
      box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.5),
        0px 4px 8px 0px rgba(0, 0, 0, 0.44),
        0px 1px 13px 0px rgba(0, 0, 0, 0.42);
    }
  }

  &.disabled {
    opacity: 0.65;
    cursor: default;
  }
}
</style>
