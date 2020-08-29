<template>
  <div :key="movieId">
    <transition name="main-fade">
      <SyncLoader :loading="isLoading" color="#3f51b5"></SyncLoader>
    </transition>

    <transition name="main-fade">
      <div v-if="!isLoading">
        <MovieInfo />
        <CastList />
      </div>
    </transition>
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import MovieInfo from '@/components/MovieInfo';
import CastList from '@/components/CastList';

export default {
  name: 'movie-details',
  computed: {
    movieId() {
      return this.$route.params.movieId;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  mounted() {
    this.$store.dispatch('fetchMovieDetails', this.movieId);
  },
  watch: {
    movieId() {
      this.$store.dispatch('fetchMovieDetails', this.movieId);
    },
  },
  components: {
    SyncLoader,
    CastList,
    MovieInfo,
  },
};
</script>
