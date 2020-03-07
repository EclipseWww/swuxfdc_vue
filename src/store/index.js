import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    tabs:'',
    userInfo:{},

  },

  mutations:{
    changeTabs(state,tabs){
      state.tabs=tabs;
    },
    ChangeUserInfo(state,userInfo){
      state.userInfo=userInfo;
    }


  }
})
export default store
