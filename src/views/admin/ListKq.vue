<template>
  <v-data-table multi-sort :search="search" :headers="headers" :items="Kqs" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>考勤表管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mt-3 mb-2" v-on="on">上传</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">上传考勤表</span>
            </v-card-title>

            <v-card-text class>
              <p class="textjustify subtitle-2 pl-4">{{$store.state.userInfo.name}}同学,你好！</p>
              <p
                class="textjustify subtitle-2 pl-4 mb-0"
              >你的班级为:{{$store.state.userInfo.grade}}级{{$store.state.userInfo.classes}}</p>

              <v-card-actions>
                <v-container ma-0 pa-0>
                  <v-form ref="form">
                    <v-row ma-0 pa-0>
                      <v-col class="ma-0 py-0 px-5" cols="10">
                        <v-select
                          :rules="basicRules"
                          v-model="KqItem.week"
                          :items="weeks"
                          label="周次"
                        ></v-select>
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
                      <v-col class="my-0 py-0 px-5 mx-4" cols="4">
                        <v-btn depressed color="success" class="mx-auto" @click="uploadKq">
                          <v-icon class="mr-3 pa-0">mdi-check-all</v-icon>提交
                        </v-btn>
                      </v-col>
                      <v-col class="ma-0 py-0 px-5" cols="4">
                        <v-btn depressed @click="reset">
                          <v-icon class="ma-0 mr-3">mdi-backspace-outline</v-icon>关闭
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-snackbar v-model="snackbar" top :timeout="timeout" :color="snackColor">
        {{text}}
        <v-btn dark text @click="snackbar = false">关闭</v-btn>
      </v-snackbar>
      <v-layout mx-5 wrap row>
        <v-flex pl-2 xs6 md3>
          <v-autocomplete
            clearable
            v-model="qGrade"
            :items="grade"
            label="年级"
            @change="initialize()"
          ></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs6 md3>
          <v-autocomplete
            clearable
            v-model="qClasses"
            :items="classes"
            label="专业班级"
            @change="initialize()"
          ></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs6 md3>
          <v-text-field
            v-model="qWeek"
            append-icon="mdi-magnify"
            label="周次"
            single-line
            hide-details
            @input="initialize()"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip class="ma-2" color="green draken-4" text-color="white" v-if="item.status=='按时上传'">
        {{item.status}}
        <v-icon right>mdi-checkbox-marked-circle</v-icon>
      </v-chip>
      <v-chip class="ma-2" color="red darken-1" text-color="white" v-if="item.status=='超时'">
        {{item.status}}
        <v-icon right>mdi-alert-circle</v-icon>
      </v-chip>
    </template>

    <template v-slot:item.action="{ item }">
      <v-btn icon :href="item.kq_URL" target="_blank" text color="primary ">
        <v-icon class>mdi-download</v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">暂无数据</v-btn>
    </template>
  </v-data-table>
</template>


<script>
import * as API from "@/api/";
import jutils from "jutils-src";
export default {
  name: "MyKq",

  components: {},
  data: () => ({
    snackbar: false,
    snackColor: "",
    timeout: 2000,
    text: "",
    search: "",
    groupBy: [],
    groups: ["grade", "classes", "week", "status"],
    dialog: false,
    KqItem: {
      week: "",
      day: "",
      kq_URL: "",
      grade: "",
      classes: ""
    },
    days: ["星期一", "星期二", "星期三", "星期四", "星期五"],
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    grade: ["2017", "2018", "2019"],
    classes: [
      "软工12",
      "软工34",
      "自动化12",
      "自动化34",
      "计科12",
      "计科34",
      "网工",
      "管工1",
      "管工2",
      "电商",
      "信管",
      "计师1",
      "计师2",
      "智能科学",
      "数据科学"
    ],
    basicRules: [v => !!v || "必填项"],
    QiniuForm: {},
    hash: "",
    filelist: [],
    headers: [
      {
        text: "年级",
        align: "center",
        value: "grade",
        sortable: false
      },
      { text: "班级", value: "classes", sortable: false, align: "center" },
      { text: "周次", value: "week", align: "center" },
      { text: "星期", value: "day", sortable: false, align: "center" },
      {
        text: "上传时间",
        value: "created_at",
        align: "center"
      },
      { text: "状态", value: "status", align: "center" },
      { text: "上传者", value: "author", align: "center" },
      { text: "操作", value: "action", sortable: false, align: "center" }
    ],
    Kqs: [],
    qGrade: "",
    qClasses: "",
    qWeek: null

    //
  }),
  created() {
    this.$store.commit("changeTabs", "");
    this.initialize();
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
  computed: {},

  watch: {},

  methods: {
    //时间戳转换时间
    timedat(res) {
      //res 为传入的时间戳   例：1509091800000
      var time = new Date(res);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      return y + "-" + m + "-" + d; //返回格式  "2017-10-27" 字符串
    },

    getWeek(timedat) {
      //timedat参数格式：   getWeek（new Date("2017-10-27" )）
      var week;
      if (timedat.getDay() == 0) week = "星期日";
      if (timedat.getDay() == 1) week = "星期一";
      if (timedat.getDay() == 2) week = "星期二";
      if (timedat.getDay() == 3) week = "星期三";
      if (timedat.getDay() == 4) week = "星期四";
      if (timedat.getDay() == 5) week = "星期五";
      if (timedat.getDay() == 6) week = "星期六";
      return week;
    },
    initialize() {
      API.getKqs(0, 3000, this.qGrade, this.qClasses, this.qWeek).then(res => {
        this.Kqs = res.data.items;
        if (res.data.items === null) this.Kqs = [];
        for (var item = 0; item < this.Kqs.length; item++) {
          var date = new Date(this.timedat(this.Kqs[item].created_at * 1000));
          if (
            this.Kqs[item].day === this.getWeek(date) &&
            jutils.formatDate(date, "HH") < 23
          )
            this.Kqs[item].status = "按时上传";
          else this.Kqs[item].status = "超时";
          this.Kqs[item].created_at = jutils.formatDate(
            new Date(this.Kqs[item].created_at * 1000),
            "YYYY-MM-DD HH:ii:ss"
          );
        }
      });
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
          console.log(res);
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
            this.initialize();
          }
        });
      } else {
        this.snackColor = "error";
        this.text = "表单填写不完整，请重试";
        this.snackbar = true;
      }
      return;
    },
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
      this.hash = res.hash;
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
      this.dialog = false;
    }
  }
};
</script>