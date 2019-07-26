import $http from '../utils/api';

export default {
  /**
   * [login authenticate user]
   *
   * @param  {[object]} payload        [user login credentials]
   * @return {[json]}                [user token & success/error message]
   */
  login({ commit }, payload) {
    commit('SET_STATUS', true);
    return new Promise((resolve, reject) => {
      $http({ url: '/login', data: payload, method: 'POST' })
        .then((res) => {
          commit('SET_USER', res.data.data);
          console.log(res.data.data);
          commit('SET_TOKEN', res.data.token);
          commit('SET_STATUS', false);
          resolve(res);
        })
        .catch((error) => {
          commit('REMOVE_TOKEN');
          commit('SET_STATUS', false);
          reject(error);
        });
    });
  },

  /**
   * [register create a new user]
   *
   * @param  {[object]} payload        [user personal credentials]
   * @return {[json]}                [user token & success/error message]
   */
  register({ commit }, payload) {
    commit('SET_STATUS', true);
    return new Promise((resolve, reject) => {
      $http({ url: '/register', data: payload, method: 'POST' })
        .then((res) => {
          commit('SET_USER', res.data);
          commit('SET_STATUS', false);
          resolve(res);
        })
        .catch((error) => {
          commit('SET_STATUS', false);
          reject(error);
        });
    });
  },

  /**
   * [logout logs out an authenticated user]
   *
   * @param  {[object]} payload        [user personal credentials]
   * @return {[json]}                [success/error message]
   */
  logout({ commit }, payload) {
    commit('SET_STATUS', true);
    return new Promise((resolve, reject) => {
      $http({ url: '/logout', data: payload, method: 'POST' })
        .then((res) => {
          commit('SET_STATUS', false);
          commit('SET_USER', {});
          commit('REMOVE_TOKEN');
          resolve(res);
        })
        .catch((error) => {
          commit('REMOVE_TOKEN');
          commit('SET_STATUS', false);
          reject(error);
        });
    });
  },

  /**
   * [createMessage create new contact messsage]
   *
   * @param  {[object]} payload        [user's message]
   * @return {[json]}                [success/error message]
   */
  createMessage({ commit }, payload) {
    commit('SET_STATUS', true);
    return new Promise((resolve, reject) => {
      $http({ url: '/contact', data: payload, method: 'POST' })
        .then((res) => {
          commit('SET_CONTACT', payload);
          resolve(res);
        })
        .catch((error) => {
          commit('SET_STATUS', false);
          reject(error);
        });
    });
  },

  /**
   * [fetchTweets search a hashtag and return tweets]
   *
   * @param {*} { commit } [executes a mutation]
   * @returns {[json]} [collection of the tweets {name | details | polarity}]
   */
  fetchTweets({ commit }, payload) {
    commit('SET_STATUS', true);
    return new Promise((resolve, reject) => {
      $http({ url: '/tweets', data: payload, method: 'POST' })
        .then((res) => {
          commit('SET_TWEETS', res.data.data);
          commit('SET_STATUS', false);
          resolve(res.data.data);
        })
        .catch((error) => {
          commit('SET_STATUS', false);
          reject(error);
        });
    });
  },

  /**
   * [fetchTweetsHistory returns the tweets being streamed in]
   *
   * @param {*} { commit } [executes a mutation]
   * @returns {[json]} [collection of the tweets]
   */
  fetchTweetsHistory({ commit }) {
    commit('SET_STATUS', true);
    return new Promise((resolve, reject) => {
      $http({ url: '/tweets', method: 'GET' })
        .then((res) => {
          commit('SET_TWEETS', res);
          commit('SET_STATUS', false);
          console.log(res);
          resolve(res);
        })
        .catch((error) => {
          commit('SET_STATUS', false);
          reject(error);
        });
    });
  },
};
