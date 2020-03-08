<template>
  <v-container>
    <v-app-bar dense elevation="1" app>
      <v-app-bar-nav-icon @click.stop="onClickBtn()">
        <v-btn text icon x-small>
          <v-icon>list</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="toIndex" class="grey--text">
        <v-btn @click="toIndex" text color="primary darken-2" rounded>
          <span class="footer">学风督察小组</span>
        </v-btn>
      </v-toolbar-title>
      <template v-if="this.$store.state.tabs" v-slot:extension>
        <v-tabs centered slider-color="success">
          <v-tab v-for="tab in $store.state.tabs" :key="tab.text" :to="tab.route">{{ tab.text}}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      app
      bottom
      v-model="drawer"
      color="primary"
      :expand-on-hover="expandOnHover"
      disable-resize-watcher
      mobile-break-point="1270"
    >
      <v-list nav dark>
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <img src="@/assets/logo.png" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{userInfo.name}}</v-list-item-title>

            <v-list-item-subtitle v-if="userInfo.level==1">纪律委员</v-list-item-subtitle>
            <v-list-item-subtitle v-if="userInfo.level==2">{{userInfo.dept}}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="userInfo.level==3">{{userInfo.dept}}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="userInfo.level==4">{{userInfo.dept}}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="userInfo.level==5">组长</v-list-item-subtitle>
            <v-list-item-subtitle v-if="userInfo.level==6">部长</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group v-model="link">
          <v-list-item v-for="(link, i) in links" :key="i" router :to="link.route">
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item @click="signout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>注销</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-scroll-y-reverse-transition leave-absolute>
      <router-view></router-view>
    </v-scroll-y-reverse-transition>
  </v-container>
</template>

<script>
import * as API from "@/api/";
export default {
  name: "Navi",

  components: {},
  data: () => ({
    screenWidth: document.body.clientWidth,
    drawer: false,
    unHidden: false,
    expandOnHover: false,
    link: 1,
    linksJw: [
      { icon: "dashboard", text: "考勤表上传", route: "/jw/upload" },
      { icon: "mdi-folder", text: "我的考勤表", route: "/jw/myKq" }
    ],
    linksXd: [
      { icon: "dashboard", text: "首页", route: "/admin/index" },
      { icon: "mdi-code-braces-box", text: "课程总表", route: "/admin/courses" },
      { icon: "mdi-file-document", text: "听课表", route: "/admin/tks" },
      { icon: "mdi-folder", text: "考勤表", route: "/admin/kqs" },
      { icon: "mdi-google-drive", text: "纪检部", route: "/admin/discipline" },
      { icon: "mdi-account-badge", text: "用户信息", route: "/admin/users" }
    ],
    links: [],
    userInfo: {}

    //
  }),
  created() {
    if (this.screenWidth <= 1270) {
      this.drawer = false;
      this.expandOnHover = false;
    } else {
      this.drawer = true;
      this.expandOnHover = false;
    }
    API.getme(1).then(res => {
      this.userInfo = res.data;
      if (this.userInfo.level==1) this.links = this.linksJw;
      else this.links = this.linksXd;
      this.$store.commit("ChangeUserInfo", this.userInfo);
    });
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          if (that.screenWidth <= 1270) {
            that.drawer = false;
            that.expandOnHover = false;
          } else {
            that.drawer = true;
            that.expandOnHover = false;
          }
          that.timer = false;
        }, 400);
      }
    }
  },

  methods: {
    onClickBtn() {
      if (this.screenWidth > 1270) {
        this.expandOnHover = !this.expandOnHover;
      } else this.drawer = !this.drawer;
    },
    signout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toIndex() {
      if (this.userInfo.level==1) this.$router.push("/jw/upload");
      else this.$router.push("/admin/index");
    }
  }
};
</script>
<style >
.footer {
  font-size: 17px;
}
</style>