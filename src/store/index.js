import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    tabs:'',
    userInfo:{},
    links: [
      { icon: "dashboard", text: "考勤表上传", route: "/jw" },
      { icon: "mdi-folder", text: "我的考勤表", route: "/myKq" },
    ]
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
