<template>
  <nav>
    <ul v-if="!user" class="auth-nav">
      <li class="auth-nav__item">
        <router-link
          to="/login"
          class="auth-nav__text-link"
          active-class="auth-nav__text-link--active"
          >Log in</router-link
        >
      </li>
      <li class="auth-nav__item">
        <router-link
          to="/register"
          class="auth-nav__text-link"
          active-class="auth-nav__text-link--active"
          >Get started</router-link
        >
      </li>
    </ul>
    <div v-else class="auth-nav">
      <span class="auth-nav__item logged-user"
        >You logged in as <strong>{{ user }}</strong></span
      >
      <IconButton class="auth-nav__item" aria-label="Dashboard">
        <router-link
          exact
          to="/dashboard"
          class="auth-nav__link"
          active-class="auth-nav__link--active"
        >
          <DashboardIcon title="Dashboard" />
        </router-link>
      </IconButton>
      <IconButton
        class="auth-nav__item"
        @on-click="onLogout"
        aria-label="Log out"
      >
        <LogoutIcon title="Log out" />
      </IconButton>
    </div>
  </nav>
</template>

<script>
import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import DashboardIcon from 'vue-material-design-icons/MonitorDashboard.vue';
import IconButton from '@/components/IconButton.vue';
import LSHelper from '@/utils/LSHelper';

export default {
  name: 'auth-nav',
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: { LogoutIcon, DashboardIcon, IconButton },
  methods: {
    onLogout() {
      this.$store.commit('logoutUser');
      this.$store.commit('removeMoviesFromLS');
      this.$store.commit('removeActorsRectFromLS');
      LSHelper.deleteFromLS('user');
      LSHelper.deleteFromLS('movies');
      LSHelper.deleteFromLS('actorsRect');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss">
.auth-nav {
  display: flex;
  align-items: center;

  &__item {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  &__text-link {
    padding: 3px 8px;
    border: 1px solid #fff;
    border-radius: 2px;
    font-weight: 500;
    transition: background-color 0.3s ease-in-out;

    @media screen and (min-width: 768px) {
      padding: 6px 18px;
    }

    &:hover,
    &:focus,
    &--active {
      background-color: #fff;
      color: #3f51b5;
    }
  }

  &__link {
    transition: color 0.3s ease-in-out;

    &--active {
      color: #ee2139;
    }
  }

  .logged-user {
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
    }
  }
}
</style>
