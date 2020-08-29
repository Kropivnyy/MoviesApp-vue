<template>
  <transition name="sidebar-slide">
    <aside v-if="shouldRenderSidebar" class="sidebar">
      <ul class="list-group">
        <li>
          <a
            class="list-group-item new-movie-btn"
            :class="{ disabled: isLoading }"
            @click.prevent="fetchNewMovie"
            href=""
          >
            <PlusIcon />
            <span>Add new movie</span>
          </a>
        </li>
        <li v-for="movie in movies" :key="movie.id">
          <router-link
            :to="{ path: `/movie/${movie.id}` }"
            class="list-group-item"
            active-class="list-group-item--active"
          >
            {{ movie.title }}
          </router-link>
        </li>
      </ul>
    </aside>
  </transition>
</template>

<script>
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import LSHelper from '@/utils/LSHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'sidebar',
  computed: {
    ...mapGetters(['sidebarVisible', 'isLoading', 'user', 'movies']),
    shouldRenderSidebar() {
      return this.sidebarVisible && this.user;
    },
  },
  components: { PlusIcon },
  methods: {
    async fetchNewMovie() {
      if (!this.isLoading) {
        await this.$store.dispatch('fetchNewMovie');
        LSHelper.setToLS('movies', this.$store.getters.movies);
      }
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  height: calc(100% - 64px);
  overflow: auto;
  z-index: 900;
  width: 260px;
  background-color: #fff;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.list-group {
  display: flex;
  flex-direction: column;
  color: #495057;

  &-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    outline: none;
    color: inherit;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;

    &:hover {
      background-color: #eff7ff;
    }

    &:first-child {
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom-right-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    &--active {
      color: #212529;
      background-color: #b1d6f8;
      border-color: #b1d6f8;
    }

    &.new-movie-btn {
      display: flex;
      align-items: center;
      max-height: 50px;
      padding-top: 8px;
      padding-bottom: 8px;

      &.disabled {
        background-color: #ccc;
        cursor: default;
      }
    }
  }
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.sidebar-slide-enter,
.sidebar-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
