import apiService from '../services/apiService';

export default {
  state: {
    movies: [],
    trendingMovies: [],
    movieDetails: {},
    actor: {},
    cast: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    setMoviesFromLS(state, movies) {
      state.movies = movies;
    },
    removeMoviesFromLS(state) {
      state.movies = [];
    },

    fetchTrendingMoviesRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchTrendingMoviesSuccess(state, movies) {
      state.trendingMovies = movies;
      state.isLoading = false;
    },
    fetchTrendingMoviesError(state, error) {
      state.error = error;
      state.isLoading = false;
    },

    fetchNewMovieRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchNewMovieSuccess(state, movie) {
      state.movies = [movie, ...state.movies];
      state.isLoading = false;
    },
    fetchNewMovieError(state, error) {
      state.error = error;
      state.isLoading = false;
    },

    fetchMovieDetailsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMovieDetailsSuccess(state, { movie, cast }) {
      state.movieDetails = { ...movie };
      state.cast = [...cast];
      state.isLoading = false;
    },
    fetchMovieDetailsError(state, error) {
      state.error = error;
      state.isLoading = false;
    },

    fetchMovieCastPhotoRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMovieCastPhotoSuccess(state, actor) {
      state.actor = actor;
      state.isLoading = false;
    },
    fetchMovieCastPhotoError(state, error) {
      state.error = error;
      state.isLoading = false;
    },
  },
  actions: {
    async fetchTrendingMovies({ commit }) {
      commit('fetchTrendingMoviesRequest');

      try {
        const movies = await apiService.fetchTrendingMovies();
        commit('fetchTrendingMoviesSuccess', movies);
      } catch (error) {
        commit('fetchTrendingMoviesError', error.toString());
      }
    },
    async fetchNewMovie({ commit }) {
      commit('fetchNewMovieRequest');

      try {
        const movie = await apiService.fetchNewMovie(
          this.getters.movies.length,
        );
        commit('fetchNewMovieSuccess', movie);
      } catch (error) {
        commit('fetchNewMovieError', error.toString());
      }
    },
    async fetchMovieDetails({ commit }, id) {
      commit('fetchMovieDetailsRequest');

      try {
        const response = await Promise.all([
          apiService.fetchMovieById(id),
          apiService.fetchMovieCast(id),
        ]);

        commit('fetchMovieDetailsSuccess', {
          movie: response[0],
          cast: response[1],
        });
      } catch (error) {
        commit('fetchMovieDetailsError', error.toString());
      }
    },
    async fetchMovieCast({ commit }, { movieId, actorId }) {
      commit('fetchMovieCastPhotoRequest');

      try {
        const actor = (await apiService.fetchMovieCast(movieId)).find(
          actor => actor.cast_id === +actorId,
        );

        commit('fetchMovieCastPhotoSuccess', actor);
      } catch (error) {
        commit('fetchMovieCastPhotoError', error.toString());
      }
    },
  },
  getters: {
    movies: state => state.movies,
    trendingMovies: state => state.trendingMovies,
    movieDetails: state => state.movieDetails,
    actorPhotoSrc: state => {
      if (state?.actor?.profile_path) {
        return `https://image.tmdb.org/t/p/w500${state.actor.profile_path}`;
      } else {
        return 'https://image.tmdb.org/t/p/w500/q9x5rq9rCO241EaKSbA19xPXcIG.jpg';
      }
    },
    cast: state => state.cast,
    isLoading: state => state.isLoading,
    error: state => state.error,
  },
};
