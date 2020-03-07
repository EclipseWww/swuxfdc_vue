<template>
  <v-container px-0>
    <v-snackbar v-model="snackbar" top :timeout="timeout" :color="snackColor">
      {{text}}
      <v-btn dark text @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
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
            <span class="title">考勤表上传</span>
          </v-card-title>
          <p class="textjustify subtitle-2 pl-4">{{$store.state.userInfo.name}}同学,你好！</p>
          <p
            class="textjustify subtitle-2 pl-4 mb-0"
          >你的班级为:{{$store.state.userInfo.grade}}级{{$store.state.userInfo.classes}}</p>

          <v-card-actions>
            <v-container ma-0 pa-0>
              <v-form ref="form">
                <v-row ma-0 pa-0>
                  <v-col class="ma-0 py-0 px-5" cols="10">
                    <v-select :rules="basicRules" v-model="KqItem.week" :items="weeks" label="周次"></v-select>
                  </v-col>
                </v-row>
                <v-row ma-0 pa-0>
                  <v-col class="ma-0 py-0 px-5" cols="10">
                    <v-select v-model="KqItem.day" :rules="basicRules" :items="days" label="星期"></v-select>
                  </v-col>
                </v-row>
                <v-row class="mt-2">
                  <v-col class="ma-0 py-0 px-5" cols="10">
                    <v-text-field
                      class="ma-0 pa-0"
                      persistent-hint
                      :rules="basicRules"
                      label="考勤表Hash"
                      hint="上传后自动生成"
                      disabled
                      v-model="hash"
                    ></v-text-field>
                  </v-col>
                  <v-col class="ma-0 pa-0" cols="2">
            
                    <el-upload
                      class="ma-0 pa-0"
                      action="https://upload-z2.qiniup.com"
                      accept="image/jpeg, image/gif, image/png, image/bmp"
                      name="file"
                      :show-file-list="snackbar"
                      :data="QiniuForm"
                      :before-upload="BeforeUpload"
                      :on-success="handleSuccessQiniu"
                      :on-error="handlError"
                      :file-list="filelist"
                    >
                      <v-btn icon color="green" class="ma-0 pa-0">
                        <v-icon class="ma-0 pa-0">mdi-cloud-upload</v-icon>
                      </v-btn>
                    </el-upload>
                  </v-col>
                </v-row>
                <v-row class="mt-5 mr-3" justify="end">
                  <v-col class="ma-0 py-0 px-5" cols="4">
                    <v-btn depressed color="success" class="mx-auto" @click="uploadKq">
                      <v-icon class="mr-3 pa-0">mdi-check-all</v-icon>提交
                    </v-btn>
                  </v-col>
                  <v-col class="ma-0 py-0 px-5" cols="4">
                    <v-btn depressed @click="reset">
                      <v-icon class="ma-0 mr-3">mdi-backspace-outline</v-icon>重置
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 lg4 mx-5 my-5></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import Navi from "@/components/Navi.vue";
import jutils from "jutils-src";
import * as API from "@/api/";
export default {
  name: "jw_upload",
  components: {},
  data() {
    return {
      KqItem: {
        week: "",
        day: "",
        kq_URL: "",
        grade: "",
        classes: ""
      },
      snackbar: false,
      snackColor: "",
      timeout: 2000,
      text: "",
      filelist: [],
      days: ["星期一", "星期二", "星期三", "星期四", "星期五"],
      weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      basicRules: [v => !!v || "必填项"],
      QiniuForm: {},
      hash:''
    };
  },
  created() {
    this.$store.commit("changeTabs", "");
    API.getToken(1).then(res => {
      if (res.code !== 0) {
        this.snackColor = "error";
        this.text = "未获取到Token，无法上传";
        this.snackbar = true;
        return;
      } else {
        this.QiniuForm = {
          token: res.data
        };
      }
    });
  },
  methods: {
    BeforeUpload(file) {
      var currentTime = jutils.formatDate(
        new Date(new Date().getTime()),
        "YYYY-MM-DD-HH:ii:ss"
      );
      var format = file.name.split(".")[1];
      var fileinfo =
        this.$store.state.userInfo.grade + this.$store.state.userInfo.classes;
      this.QiniuForm.key = fileinfo + "-" + currentTime + "." + format;
      const isLt10M = file.size < 10 * 1024 * 1024;
      if (!isLt10M) {
        this.snackColor = "error";
        this.text = "图片大小不能超过 10MB!";
        this.snackbar = true;
      }
      return isLt10M;
    },
    handleSuccessQiniu(res) {
      this.hash=res.hash
      this.KqItem.kq_URL = "http://q6goa5pvw.bkt.clouddn.com/" + res.key;
      this.filelist = [];
    },
    handlError() {
      this.KqItem.kq_URL = "";
      this.filelist = [];
      this.snackColor = "error";
      this.text = "上传错误";
      this.snackbar = true;
    },
    reset() {
      this.$refs.form.reset();
    },
    uploadKq() {
      this.KqItem.grade = this.$store.state.userInfo.grade;
      this.KqItem.classes = this.$store.state.userInfo.classes;
      if (!(this.KqItem.classes && this.KqItem.grade)) {
        this.snackColor = "error";
        this.text = "未获取到班级年级信息，请联系管理员";
        this.snackbar = true;
        return;
      }
      if (this.$refs.form.validate()) {
        API.postKq(this.KqItem).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar = true;
            return;
          } else {
            this.snackColor = "success";
            this.text = "考勤表提交成功";
            this.snackbar = true;
            this.$refs.form.reset();
          }
        });
      } else {
        this.snackColor = "error";
        this.text = "表单填写不完整，请修改后重试";
        this.snackbar = true;
      }
      return;
    }
  }
};
</script>
<style scpoed>
#tkap {
  border-top: 4px solid #ffaa2c;
}
#ttk {
  border-top: 4px solid #f83e70;
}
.container {
  margin: 0 0 0 0;
}
</style>
