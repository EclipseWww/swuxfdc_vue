<template>
  <v-data-table
    multi-sort
    :group-by="groupBy"
    :headers="headers"
    :items="Kqs"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>我的考勤表</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-snackbar v-model="snackbar" top :timeout="timeout" :color="snackColor">
        {{text}}
        <v-btn dark text @click="snackbar = false">关闭</v-btn>
      </v-snackbar>
      <v-layout mx-5 wrap row>
        <v-flex pr-2 xs6 md3>
          <v-select clearable v-model="groupBy" :items="groups" label="筛选"></v-select>
        </v-flex>
        <v-flex pl-2 xs6 md3>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="查找"
            single-line
            hide-details
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
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>

    <template v-slot:item.action="{ item }">
      <v-btn icon :href="item.kq_URL" target="_blank" text color="primary ">
        <v-icon class>mdi-download</v-icon>
      </v-btn>
      <v-btn icon text color="error darken-2">
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">重新加载</v-btn>
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
    groups: ["grade", "classes", "week","status"],
    dialog: false,
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
        align: "center",
        filterable: false
      },
      { text: "状态", value: "status", align: "center" },
      { text: "操作", value: "action", sortable: false, align: "center" }
    ],
    Kqs: [],

    tabs: [
      { text: "缺勤写入", route: "/discipline/absent" },
      { text: "纪委考评", route: "/discipline/score" },
      { text: "缺勤审核", route: "/discipline/audit" }
    ]

    //
  }),
  created() {
    this.initialize();
    this.$store.commit("changeTabs", "");
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

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
      API.getKqs(0, 3000).then(res => {
        this.Kqs = res.data.items;
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
    deleteItem(item) {
      confirm("您确定要删除这张考勤表吗?") &&
        API.deleteKqs(item.id).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar = true;
          } else {
            this.snackColor = "success";
            this.text = "考勤表删除成功";
            this.snackbar = true;
          }
          this.initialize();
        });
    }
  }
};
</script>