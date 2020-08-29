<template>
  <div>
    <ul v-if="cast.length > 0" class="List">
      <li
        v-for="actor in cast"
        :key="actor.cast_id"
        class="Item"
        @click.prevent="$router.push(`${$route.path}/actor/${actor.cast_id}`)"
      >
        <div class="ItemInfoWrapper">
          <img
            v-if="actor.profile_path"
            class="Image"
            :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`"
            :alt="actor.name"
          />
          <div class="Text">
            <h4>{{ actor.name }}</h4>
            <p v-if="actor.character">Character: {{ actor.character }}</p>
          </div>
        </div>
      </li>
    </ul>
    <p v-else-if="!isLoading && !error" class="Fallback">
      We don't have information about the actors from this movie.
    </p>
  </div>
</template>

<script>
export default {
  name: 'cast-list',
  computed: {
    cast() {
      return this.$store.getters.cast;
    },

    isLoading() {
      return this.$store.getters.isLoading;
    },

    error() {
      return this.$store.getters.error;
    },
  },
};
</script>

<style lang="scss" scoped>
.List {
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-gap: 24px;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (min-width: 1024px) {
    grid-gap: 40px;
    justify-content: space-between;
  }
}

.Item {
  display: flex;
  background-color: #fff;
  transition: box-shadow 0.25s;
  border-radius: 2px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.5),
      0px 4px 8px 0px rgba(0, 0, 0, 0.44), 0px 1px 13px 0px rgba(0, 0, 0, 0.42);
  }
}

.ItemInfoWrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.Image {
  height: 100px;
  border-radius: 2px;
}

.Text {
  padding: 4px 10px 4px 20px;
  * {
    margin: 0;
  }
}

.Fallback {
  margin: 0;
  text-align: center;
}
</style>
