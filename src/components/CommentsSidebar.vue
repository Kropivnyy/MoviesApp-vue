<template>
  <aside class="comments-sidebar" :class="{ hide: hideSidebar }">
    <ul>
      <li>
        <a
          @click.prevent="$emit('toggle-sidebar')"
          class="list-group-item new-movie-btn"
          href=""
        >
          <CommentOutlineIcon />
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import CommentOutlineIcon from 'vue-material-design-icons/CommentOutline.vue';

export default {
  props: ['hideSidebar', 'toggle-sidebar'],
  components: { CommentOutlineIcon },
};
</script>

<style lang="scss">
.comments-sidebar {
  position: fixed;
  display: none;
  top: 64px;
  right: 0;
  height: calc(100% - 64px);
  overflow: auto;
  z-index: 900;
  width: 260px;
  background-color: #fff;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease-in-out;

  @media screen and (min-width: 768px) {
    display: block;
  }

  &.hide {
    transform: translateX(200px);
  }
}
</style>
