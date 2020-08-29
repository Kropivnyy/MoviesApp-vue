<template>
  <div>
    <h2 class="main-title">
      Dashboard
      <transition name="main-fade">
        <SyncLoader :loading="isLoading" color="#3f51b5"></SyncLoader>
      </transition>
    </h2>
    <transition name="main-fade">
      <div v-if="!isLoading">
        <MovieList v-if="movies.length > 0" :movies="movies" />
        <p v-else class="fallback">
          You haven't added any movies yet. Click
          <a class="link" @click.prevent="fetchNewMovie" href="">here</a> to do
          it.
        </p>
      </div>
    </transition>
    <IconButton
      class="fixed"
      :class="{ disabled: isLoading }"
      @on-click="fetchNewMovie"
      aria-label="Add new movie"
    >
      <PlusIcon :size="36" title="Add new movie" />
    </IconButton>
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import IconButton from '@/components/IconButton.vue';
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import MovieList from '@/components/MovieList.vue';
import LSHelper from '@/utils/LSHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  computed: mapGetters(['movies', 'isLoading']),
  components: { SyncLoader, IconButton, PlusIcon, MovieList },
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

<style lang="scss" scoped>
.fallback {
  margin: 0;
  text-align: center;
}
.link {
  color: #3f51b5;
  font-weight: 700;
  transition: color 0.25s ease-in-out;

  &:hover,
  &:focus {
    color: #687ce7;
  }
}
</style>
