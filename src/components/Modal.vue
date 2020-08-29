<template>
  <Portal selector="#modal-root">
    <div class="Overlay" @click.prevent="clickHandler">
      <img class="Modal" :src="url" alt="" />
    </div>
  </Portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal';

export default {
  props: ['url', 'toggleModal', 'clearUrl'],
  components: {
    Portal,
  },
  methods: {
    clickHandler({ target }) {
      if (target.nodeName !== 'DIV') return;
      this.$emit('toggleModal');
    },

    keyDownHandler({ code }) {
      if (code === 'Escape') {
        this.$emit('toggleModal');
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyDownHandler);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDownHandler);
    this.$emit('clearUrl');
  },
};
</script>

<style lang="scss">
.Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
}

.Modal {
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
}
</style>
