<template>
  <v-container px-0 class>
    <v-layout row wrap>
      <v-flex xs3 lg1 mx-0 px-0 my-0>
        <div style="text-align: left;display:inline">
          <img height="100px" contain src="@/assets/go.svg" />
        </div>
      </v-flex>
      <v-flex xs9 lg2 mx-0 px-0 mt-9>
        <p class="display-1" style="display:inline;text-align: center;">欢迎回来！</p>
      </v-flex>
      <v-flex xs12 lg4 mx-5 my-5>
        <v-card class="mx-auto px-3 py-2 pb-4" id="tkap" max-width="400">
          <v-card-title>
            <v-icon left>mdi-check-network-outline</v-icon>
            <span class="title">听课安排</span>
          </v-card-title>
          <p class="textjustify subtitle-2 pl-4">{{name}}同学,你好！</p>
          <p class="textjustify subtitle-2 pl-4">本周是第{{week}}周，你的听课班级为：{{classes}}</p>
          <p class="textjustify subtitle-2 pl-4">以下为本周可听课程：</p>
          <v-treeview open-on-click dense rounded hoverable transition :items="availableCourse" item-text="label"></v-treeview>
          <v-card-actions>
            <v-file-input
              persistent-hint
              hint="当前对应【第15周】【18计师1】"
              accept="image/*"
              label="点击上传听课表 (仅jpg/png)"
            ></v-file-input>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 lg4 mx-5 my-5>
        <v-card class="mx-auto px-3 py-2 flat" id="ttk" max-width="400">
          <v-card-title pb-5>
            <v-icon left>mdi-sync</v-icon>
            <span class="title">替他人听课</span>
          </v-card-title>
          <v-container pt-0 px-5>
            <v-layout row wrap>
              <v-flex xs10 pl-4>
                <v-text-field persistent-hint label="欲听课班级" hint="如 18自动化3/4"></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn class="mx-2" fab dark small text color="success">
                  <v-icon dark>mdi-cloud-search</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>

          <v-treeview open-on-click dense rounded hoverable transition :items="items"></v-treeview>
          <v-card-actions>
            <v-file-input
              persistent-hint
              hint="仅支持jpg/png文件,当前对应【第15周】【18计师1】"
              accept="image/*"
              label="点击上传听课表"
            ></v-file-input>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import Navi from "@/components/Navi.vue";

export default {
  name: "Index",
  components: {},
  created(){
    this.$store.commit("changeTabs",this.tabs)
    this.index()
  },
  methods:{
   async index() {
          const {data: res} = await this.$http.get('public/index', {params: this.queryInfo})
          this.availableCourse = res.data;
          this.classes =res.classes;
          this.name=res.name;
          this.week=res.week;
          if (res.ret === 1) {
            {
              {
                this.$alert('用户登录过期，请注销重新登录', '提示', {
                  confirmButtonText: '注销',
                  callback: action => {
                    window.sessionStorage.clear();
                    this.$router.push("/login");
                    console.log(action)
                  }
                });
              }

            }
            return
          }
          if (res.ret === 2) {
            this.uploadDiv = false;
            this.uploadDivF = true;
            return
          }

          if (res.ret ===3 ){
          this.$alert('未知错误，请联系管理员', '警告', {
            confirmButtonText: '确定'
          });}
          if (res.ret !== 0) {
            return this.$message.error('听课安排拉取失败！')
          }
        },
  },
  data: () => ({
    tabs:'',
                classes:'',
            name:'',
            week:'',
    availableCourse: [
      {
       
        name: "Applications :",
        children: [
          { id: 2, name: "Calendar : app" },
          { id: 3, name: "Chrome : app" },
          { id: 4, name: "Webstorm : app" }
        ]
      },
      {
        
        name: "Documents :",
        children: [
          {
            id: 6,
            name: "vuetify :",
            children: [
              {
                id: 7,
                name: "src :",
                children: [
                  { id: 8, name: "index : ts" },
                  { id: 9, name: "bootstrap : ts" }
                ]
              }
            ]
          },
          {
            id: 10,
            name: "material2 :",
            children: [
              {
                id: 11,
                name: "src :",
                children: [
                  { id: 12, name: "v-btn : ts" },
                  { id: 13, name: "v-card : ts" },
                  { id: 14, name: "v-window : ts" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 15,
        name: "Downloads :",
        children: [
          { id: 16, name: "October : pdf" },
          { id: 17, name: "November : pdf" },
          { id: 18, name: "Tutorial : html" }
        ]
      },
      {
        id: 19,
        name: "Videos :",
        children: [
          {
            id: 20,
            name: "Tutorials :",
            children: [
              { id: 21, name: "Basic layouts : mp4" },
              { id: 22, name: "Advanced techniques : mp4" },
              { id: 23, name: "All about app : dir" }
            ]
          },
          { id: 24, name: "Intro : mov" },
          { id: 25, name: "Conference introduction : avi" }
        ]
      }
    ]
  })
};
</script>
<style scpoed>
#tkap {
  border-top: 4px solid #ffaa2c;
}
#ttk {
  border-top: 4px solid #f83e70;
}
.container{
  margin: 0 0 0 0;
}
</style>
