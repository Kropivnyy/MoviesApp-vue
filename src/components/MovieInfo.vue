<template>
  <div class="MovieInfo">
    <img v-if="poster" class="Image" :src="poster" :alt="title" />
    <div>
      <h2 class="Title">{{ title }} ({{ releaseYear }})</h2>
      <p>User Score: {{ vote_average * 10 }}%</p>
      <h4>Overview</h4>
      <p>{{ overview }}</p>
      <h4>Genres</h4>
      <p>{{ genres }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    movieDetails() {
      return this.$store.getters.movieDetails;
    },
    title() {
      return this.movieDetails.title;
    },
    releaseYear() {
      return this?.movieDetails?.release_date
        ? this.movieDetails.release_date.slice(0, 4)
        : '';
    },
    genres() {
      return this?.movieDetails?.genres
        ? this.movieDetails.genres.reduce((result, genre, index, array) => {
            if (index === array.length - 1) return (result += genre.name);
            result += `${genre.name}, `;
            return result;
          }, '')
        : '';
    },
    poster() {
      return this?.movieDetails?.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movieDetails.poster_path}`
        : '';
    },
    vote_average() {
      return this.movieDetails.vote_average;
    },
    overview() {
      return this.movieDetails.overview;
    },
  },
};
</script>

<style lang="scss" scoped>
.MovieInfo {
  margin-bottom: 24px;
  padding: 8px 12px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  *:not(.Image) {
    margin-top: 0;
    margin-bottom: 8px;
  }
}

.Image {
  height: 250px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
}
</style>
