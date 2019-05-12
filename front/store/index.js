import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    points: [],
    details: []
  },
  getters: {
    getPoints: function (state) {
      return state.points;
    },
    getDetails: function (state) {
        return state.details;
      }
  },
  mutations: {
    cleanPoints(state){
      state.points = []
    },
    addPoint(state, data) {
      state.points.push(data);
    },
    setDetails(state, data) {
        state.details = data;
    }
  }
})
export default store