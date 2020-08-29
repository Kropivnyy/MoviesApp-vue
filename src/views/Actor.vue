<template>
  <div class="wrapper" :class="{ full: hideSidebar }">
    <transition name="main-fade">
      <SyncLoader :loading="isLoading" color="#3f51b5"></SyncLoader>
    </transition>
    <div class="rectContainer" ref="rectContainer">
      <canvas
        class="canvas"
        width="400"
        height="600"
        ref="canvas"
        @mousedown="onMousedown"
        @mousemove="onMousemove"
        @mouseup="onMouseup"
      ></canvas>
      <transition name="main-fade">
        <img
          v-if="!isLoading"
          class="img"
          :src="actorPhotoSrc"
          alt=""
          ref="img"
        />
      </transition>
    </div>
    <CommentsSidebar
      :hideSidebar="hideSidebar"
      @toggle-sidebar="toggleSidebar"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import CropRectangle from '@/components/CropRectangle.vue';
import CommentsSidebar from '@/components/CommentsSidebar.vue';

export default {
  name: 'actor',
  data: () => ({
    hideSidebar: true,
    canvas: null,
    ctx: null,
    canvasWidth: null,
    canvasHeight: null,
    canvasCoordX: 0,
    canvasCoordY: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    draw: false,
  }),
  computed: {
    actorUrl() {
      return this.$route.path;
    },
    movieId() {
      return this.$route.params.movieId;
    },
    actorId() {
      return this.$route.params.actorId;
    },
    actorPhotoSrc() {
      return this.$store.getters.actorPhotoSrc;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    actorsRect() {
      return this.$store.getters.actorsRect;
    },
  },
  components: {
    SyncLoader,
    CommentsSidebar,
  },

  mounted() {
    this.$store.dispatch('fetchMovieCast', {
      movieId: this.movieId,
      actorId: this.actorId,
    });
    this.canvasInit();

    if (this.actorsRect[this.actorUrl]) {
      this.actorsRect[this.actorUrl].forEach(rect => {
        const left = rect.left;
        const top = rect.top;
        const width = rect.width;
        const height = rect.height;
        const rectProps = { left, top, width, height };

        this.drawRect(rectProps);
      });
    }
  },

  methods: {
    toggleSidebar() {
      this.hideSidebar = !this.hideSidebar;
    },
    canvasInit() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;

      function draw() {
        if (this.draw === true) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = 'red';
          this.ctx.strokeRect(
            this.x1,
            this.y1,
            this.x2 - this.x1,
            this.y2 - this.y1,
          );
        }
      }

      function animate() {
        requestAnimationFrame(animate);
        drawSelection();
      }

      const drawSelection = draw.bind(this);
      animate();
    },

    onMousedown(e) {
      const canvasBoundingClientRect = this.canvas.getBoundingClientRect();
      this.canvasCoordX = canvasBoundingClientRect.left;
      this.canvasCoordY = canvasBoundingClientRect.top;

      this.x1 = e.clientX - this.canvasCoordX;
      this.y1 = e.clientY - this.canvasCoordY;
      this.x2 = e.clientX - this.canvasCoordX;
      this.y2 = e.clientY - this.canvasCoordY;

      this.draw = true;
    },
    onMousemove(e) {
      if (this.draw == true) {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.x2 = e.clientX - this.canvasCoordX;
        this.y2 = e.clientY - this.canvasCoordY;
      }
    },
    onMouseup() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.draw = false;

      const rightRectX = this.x1 < this.x2;
      const rightRectY = this.y1 < this.y2;
      const left = rightRectX ? this.x1 : this.x2;
      const top = rightRectY ? this.y1 : this.y2;
      const width = rightRectX ? this.x2 - this.x1 : this.x1 - this.x2;
      const height = rightRectY ? this.y2 - this.y1 : this.y1 - this.y2;
      const rectProps = { left, top, width, height };

      this.$store.commit('addNewRect', {
        actorUrl: this.actorUrl,
        rectProps,
      });

      this.drawRect(rectProps);
    },

    drawRect({ left, top, width, height }) {
      const ComponentClass = Vue.extend(CropRectangle);
      const instance = new ComponentClass({
        propsData: {
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: `${height}px`,
        },
      });
      instance.$mount();
      this.$refs.rectContainer.appendChild(instance.$el);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  transition: width 0.3s ease-in-out;

  @media screen and (min-width: 768px) {
    width: calc(100% - 260px);
  }

  &.full {
    @media screen and (min-width: 768px) {
      width: calc(100% - 60px);
    }
  }
}
.rectContainer {
  position: relative;
}
.canvas {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;

  @media screen and (min-width: 1024px) {
    display: block;
  }
}
.img {
  width: 100%;
  object-fit: contain;
  user-select: none;

  @media screen and (min-width: 768px) {
    width: 400px;
    height: 600px;
  }
}
</style>
