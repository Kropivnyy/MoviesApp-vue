<template>
  <div id="App" ref="app">
    <AppBar />
    <div class="content">
      <Sidebar />
      <main class="main" :class="{ full: shouldRenderFullPage }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import Sidebar from '@/components/Sidebar.vue';
import LSHelper from '@/utils/LSHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['sidebarVisible', 'user']),
    shouldRenderFullPage() {
      return !(this.sidebarVisible && this.user);
    },
  },
  components: {
    AppBar,
    Sidebar,
  },
  mounted() {
    const user = LSHelper.getFromLS('user');
    const movies = LSHelper.getFromLS('movies');

    if (user) {
      this.$store.commit('setUserFromLS', user);
    }

    if (movies) {
      this.$store.commit('setMoviesFromLS', movies);
    }
  },
};
</script>

<style lang="scss">
img {
  display: block;
  max-width: 100%;
  height: auto;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

a {
  display: inline-block;
  text-decoration: none;
  color: inherit;

  &:focus,
  &:active {
    outline: 0;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.content {
  position: relative;
  min-height: calc(100vh - 64px);
}

.main {
  position: relative;
  width: 100%;
  padding: 12px;
  transition: width 0.3s ease-in-out;

  @media screen and (min-width: 768px) {
    width: calc(100% - 260px);
    margin-left: auto;
    padding: 24px;
    flex-grow: 1;
  }

  &.full {
    width: 100%;
    max-width: 100%;
  }
}

.main-title {
  display: flex;
  margin-top: 0;
  margin-bottom: 20px;
  padding-left: 24px;
  font-size: 26px;
}

.v-spinner {
  display: block;
  text-align: center;
  flex-grow: 1;
}

.material-design-icon {
  display: inline-block;
  margin-top: 3px;
}

.main-content-slide-enter-active,
.main-content-slide-leave-active {
  transition: width 0.3s ease-in-out, max-width 0.3s ease-in-out;
}

.main-content-slide-enter,
.main-content-slide-leave-to {
  width: 100%;
  max-width: 100%;
}

.main-fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.main-fade-enter {
  opacity: 0;
}
</style>
