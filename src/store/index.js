import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state,
  getters,
  mutations,
  actions,
});
