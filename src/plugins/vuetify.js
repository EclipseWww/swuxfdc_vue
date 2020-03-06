import '@mdi/font/css/materialdesignicons.css' 
import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
      // primary: '#9652ff',
      success: '#3cd1c2',
      info: '#ffaa2c',
      error: '#f83e70'
    }
  })
import zhHans from 'vuetify/es5/locale/zh-Hans'

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  icons: {
    iconfont: 'mdi',
  },
    theme: {
      themes: {
        light: {
          // primary: '#9652ff', // #E53935
          secondary: '#FFCDD2', // #FFCDD2
          accent: '#3F51B5', // #3F51B5
          success: '#3cd1c2',
          info: '#ffaa2c',
          error: '#f83e70'
        },
      },
    },
  })


  