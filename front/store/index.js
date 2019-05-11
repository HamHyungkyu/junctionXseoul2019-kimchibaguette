import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    points: [
        {
            location: {
                lat: 37.554055,
                lng: 126.922452
            },
            addr : '마포구 동교로',
            post : {   
                num : 1,
                tags: 
                    {'#hongdae': 4}
                ,
            }
        }
        ,
                    {
            location: {
                lat: 37.554055,
                lng: 126.92400
            },
            addr : '마포구 동교로',
            post : {   
                num : 2,
                tags: 
                    {'#hongdae': 4}
                ,
            }
        }
    ],
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
    setPoints(state, data) {
      state.pricingData = data;
    },
    setDetails(state, data) {
        state.details = data;
    }
  }
})
export default store