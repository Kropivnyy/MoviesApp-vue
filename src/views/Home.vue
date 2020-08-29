<template>
  <div>
    <h2 class="main-title">
      Trending Movies
      <transition name="main-fade">
        <SyncLoader :loading="isLoading" color="#3f51b5"></SyncLoader>
      </transition>
    </h2>
    <transition name="main-fade">
      <div v-if="!isLoading">
        <MovieList
          v-if="trendingMovies.length > 0"
          :movies="trendingMovies"
          @onClick="onClick"
        />
        <p v-else class="fallback">
          No information about trending films
        </p>
      </div>
    </transition>
    <Modal
      v-if="showModal"
      :url="largeImageUrl"
      @toggleModal="toggleModal"
      @clearUrl="clearUrl"
    />
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import MovieList from '@/components/MovieList.vue';
import Modal from '@/components/Modal';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    showModal: false,
    largeImageUrl: '',
  }),
  computed: mapGetters(['trendingMovies', 'isLoading']),
  components: { SyncLoader, MovieList, Modal },
  methods: {
    onClick({ target }) {
      this.toggleModal();
      this.largeImageUrl = target.attributes.src.value;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    clearUrl() {
      this.largeImageUrl = '';
    },
  },
  async mounted() {
    this.$store.dispatch('fetchTrendingMovies');
  },
};
</script>
