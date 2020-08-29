<template>
  <header class="app-bar">
    <div class="app-bar__left-side">
      <IconButton
        v-if="sidebarBtnVisible"
        class="left-side__menu-btn"
        @on-click="toggleSidebar"
        aria-label="Toggle sidebar"
      >
        <MenuIcon />
      </IconButton>
      <router-link to="/" class="left-side__header-logo">MovieApp</router-link>
    </div>
    <AuthNav />
  </header>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import IconButton from '@/components/IconButton.vue';
import AuthNav from '@/components/AuthNav.vue';

export default {
  name: 'app-bar',
  computed: {
    sidebarBtnVisible() {
      return this.$store.getters.user;
    },
  },
  methods: {
    toggleSidebar() {
      this.$store.commit('toggleSidebar');
    },
  },
  components: { MenuIcon, AuthNav, IconButton },
};
</script>

<style lang="scss">
.app-bar {
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  @media screen and (min-width: 768px) {
    padding: 12px 24px;
  }

  &__left-side {
    display: flex;
    align-items: center;

    .left-side {
      &__menu-btn {
        margin-right: 40px;
      }

      &__header-logo {
        font-size: 22px;
        font-family: 'Kaushan Script', cursive;

        @media screen and (min-width: 768px) {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
