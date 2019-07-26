import Vue from 'vue';

export default {
  /**
   * [SET_TOKEN adds the access token from both localStorage and vuex state]
   * @param {object} state [vuex store state]
   * @param {string} payload [request status]
   */
  SET_TOKEN(state, payload) {
    state.token = payload;
    localStorage.setItem('access_token', payload);
  },

  /**
   * [REMOVE_TOKEN removes the access token from both localStorage and vuex state]
   * @param {[object]} state [vuex store state]
   */
  REMOVE_TOKEN(state) {
    state.token = '';
    localStorage.clear();
  },

  /**
   * [SET_STATUS return the request status]
   * @param {object} state [vuex store state]
   * @param {boolean} payload [request status]
   */
  SET_STATUS(state, payload) {
    state.status = payload;
  },

  /**
   * [SET_USER stores the user's credentials]
   * @param {object} state [vuex store state]
   * @param {object} payload [user credentials]
   */
  SET_USER(state, payload) {
    Vue.set(state, 'user', payload);
  },

  /**
   * [SET_CONTACT stores the contact messages]
   * @param {object} state [vuex store state]
   * @param {object} payload [contact email & message]
   */
  SET_CONTACT(state, payload) {
    Vue.set(state, 'contact', payload);
  },

  /**
   * [SET_TWEETS returns the tweets]
   * @param {object} state [vuex store state]
   * @param {object} payload [streamed in tweets]
   */
  SET_TWEETS(state, payload) {
    Vue.set(state, 'tweets', payload);
  },

  /**
   * [SET_TWEETS_HISTORY returns previous searches]
   * @param {object} state [vuex store state]
   * @param {object} payload [previous tweets searches and the results]
   */
  SET_TWEETS_HISTORY(state, payload) {
    Vue.set(state, 'tweetsHistory', payload);
  },
};
