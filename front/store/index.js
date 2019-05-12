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
    cleanPoints(state, points){
      var newState = []
      for(var i of state.points){
        if(points.filter(e=> {
          return e.name == i.name
        }).length == 1 ){
          newState.push(i)
        }
      }
      state.points = newState
    },
    addPoint(state, data) {
     
      if(state.points.filter(e=> {
        return e.name == data.name
      }).length == 0 ){
        state.points.push(data);

      }
    },
    setDetails(state, data) {
        state.details = data;
    }
  }
})
export default store