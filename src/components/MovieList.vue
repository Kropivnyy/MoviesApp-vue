<template>
  <ul class="MovieList">
    <li
      class="Item"
      v-for="movie in movies"
      :key="movie.id"
      @click.prevent="clickHandler"
    >
      <router-link
        v-if="shouldRenderRouterLink"
        :to="{ path: `/movie/${movie.id}` }"
        class="Link"
      >
        <img
          class="Image"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="Title">{{ movie.title }}</p>
      </router-link>
      <a v-else @click.prevent href="" class="Link">
        <img
          class="Image"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="Title">{{ movie.title }}</p>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'movie-list',
  props: ['movies', 'onClick'],
  computed: {
    shouldRenderRouterLink() {
      return this.$route.path !== '/';
    },
  },
  methods: {
    clickHandler(event) {
      this.$emit('onClick', event);
    },
  },
};
</script>

<style lang="scss" scoped>
.MovieList {
  display: grid;
  grid-template-columns: repeat(auto-fill, 170px);
  grid-gap: 40px;
  justify-content: center;
  margin-top: 0;
  margin-bottom: 20px;
  padding: 0;
  list-style: none;

  @media screen and (min-width: 768px) {
    justify-content: space-between;
  }
}

.Link {
  text-decoration: none;
  color: inherit;
}

.Image {
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.Item:hover .Image {
  transform: scale(1.03);
  cursor: pointer;
}

.Title {
  margin-bottom: 0;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.Item:hover .Title {
  color: #3f51b5;
}
</style>
