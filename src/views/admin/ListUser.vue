<template>
  <v-data-table multi-sort :headers="headers" :items="Users" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>用户信息</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{  }"></template>
          <v-card>
            <v-form ref="form">
              <v-card-title>
                <span class="headline">修改用户信息</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field :rules="basicRules" v-model="user_update_form.name" label="姓名"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-select
                        :rules="basicRules"
                        v-model="user_update_form.grade"
                        :items="grade"
                        label="年级"
                      ></v-select>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-autocomplete
                        v-model="user_update_form.classes"
                        :items="classes"
                        clearable
                        label="专业班级"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-select clearable v-model="user_update_form.dept" :items="dept" label="部门"></v-select>
                    </v-col>
                    <v-col cols="6" sm="6" md="6">
                      <v-select
                        :rules="basicRules"
                        v-model="user_update_form.level"
                        :items="level"
                        label="职位"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-select
                        :rules="basicRules"
                        v-model="user_update_form.status"
                        :items="status"
                        label="状态"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <p class="textjustify subtitle-2 px-4">若该用户既是学督成员，又是纪委，请优先为他选择学督身份，否则影响其正常操作</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" text @click="save">确定</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-snackbar v-model="snackbar" top :timeout="timeout" :color="snackColor">
        {{text}}
        <v-btn dark text @click="snackbar = false">关闭</v-btn>
      </v-snackbar>
      <v-layout mx-5 wrap row>
        <v-flex pl-2 xs6 md2>
          <v-autocomplete
            clearable
            v-model="qGrade"
            :items="grade"
            label="年级"
            @change="initialize()"
          ></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs6 md2>
          <v-autocomplete
            clearable
            v-model="qClasses"
            :items="classes"
            label="专业班级"
            @change="initialize()"
          ></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs6 md2>
          <v-autocomplete clearable v-model="qDept" :items="dept" label="部门" @change="initialize()"></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs6 md2>
          <v-autocomplete
            clearable
            v-model="qLevel"
            :items="level"
            label="职位"
            @change="initialize()"
          ></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs12 md2>
          <v-autocomplete
            clearable
            v-model="qStatus"
            :items="status"
            label="状态"
            @change="initialize()"
          ></v-autocomplete>
        </v-flex>
      </v-layout>
    </template>

    <template v-slot:item.level="{ item }">
      <v-chip outlined color="deep-purple" v-if="item.level=='4'">部长</v-chip>
      <v-chip outlined color="primary " v-if="item.level=='3'">代部</v-chip>
      <v-chip outlined color="primary darken-2" v-if="item.level=='2'">干事</v-chip>
      <v-chip outlined color="deep-purple" v-if="item.level=='5'">组长</v-chip>
      <v-chip outlined color="deep-purple" v-if="item.level=='6'">辅导员</v-chip>
      <v-chip outlined color="grey darken-2" v-if="item.level=='1'">纪律委员</v-chip>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip color="green draken-4" text-color="white" v-if="item.status=='active'">
        已激活
        <v-icon right>mdi-checkbox-marked-circle</v-icon>
      </v-chip>
      <v-chip color="yellow darken-4" text-color="white" v-if="item.status=='inactive'">
        等待激活
        <v-icon right>mdi-alert-circle</v-icon>
      </v-chip>
      <v-chip color="red darken-1" text-color="white" v-if="item.status=='suspend'">
        已停用
        <v-icon right>mdi-close-circle</v-icon>
      </v-chip>
    </template>

    <template v-slot:item.action="{ item }">
      <v-btn icon @click="editItem(item)" text color="primary ">
        <v-icon class>edit</v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">暂无数据</v-btn>
    </template>
  </v-data-table>
</template>


<script>
import * as API from "@/api/";

export default {
  name: "ListUser",

  components: {},
  data: () => ({
    snackbar: false,
    snackColor: "",
    timeout: 2000,
    text: "",
    dialog: false,
    level: ["干事", "代部", "部长", "组长", "纪律委员", "辅导员"],
    grade: ["2017", "2018", "2019"],
    status: ["待激活", "已激活", "已停用"],
    dept: ["信息部", "纪检部", "秘书部", "企划部"],
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
    headers: [
      {
        text: "姓名",
        align: "center",
        value: "name",
        sortable: false
      },
      {
        text: "年级",
        align: "center",
        value: "grade"
      },
      { text: "班级", value: "classes", align: "center" },
      { text: "部门", value: "dept", align: "center" },
      { text: "职位", value: "level", align: "center" },

      { text: "状态", value: "status", align: "center" },
      { text: "操作", value: "action", sortable: false, align: "center" }
    ],
    Users: [],
    qGrade: "",
    qClasses: "",
    qDept: "",
    qLevel: "",
    qStatus: "",
    qLevel1: "",
    qStatus1: "",
    user_update_form: {
      id: "",
      name: null,
      grade: "",
      classes: "",
      dept: "",
      status: "",
      level: "",
      status_temp: "",
      level_temp: ""
    }
  }),
    beforeUpdate(){
    if (this.$store.state.userInfo.level <= 3 || this.$store.state.userInfo.level>=6)
      this.headers = [
      {
        text: "姓名",
        align: "center",
        value: "name",
        sortable: false
      },
      {
        text: "年级",
        align: "center",
        value: "grade"
      },
      { text: "班级", value: "classes", align: "center" },
      { text: "部门", value: "dept", align: "center" },
      { text: "职位", value: "level", align: "center" },
      { text: "状态", value: "status", align: "center" },
    ];
  },
  created() {
    this.$store.commit("changeTabs", "");
    this.initialize();
  },
  computed: {},

  watch: {},

  methods: {
    initialize() {
      switch (this.qLevel) {
        case "纪律委员":
          this.qLevel1 = 1;
          break;
        case "干事":
          this.qLevel1 = 2;
          break;
        case "代部":
          this.qLevel1 = 3;
          break;
        case "部长":
          this.qLevel1 = 4;
          break;
        case "组长":
          this.qLevel1 = 5;
          break;
        case "辅导员":
          this.qLevel1 = 6;
          break;
        default:
          this.qLevel1 = 0;
          break;
      }
      switch (this.qStatus) {
        case "已激活":
          this.qStatus1 = "active";
          break;
        case "待激活":
          this.qStatus1 = "inactive";
          break;
        case "已停用":
          this.qStatus1 = "suspend";
          break;
        default:
          this.qStatus1 = "";
          break;
      }
      API.getUsers(
        0,
        100,
        this.qGrade,
        this.qClasses,
        this.qDept,
        this.qLevel1,
        this.qStatus1
      ).then(res => {
        if (res.code !== 0) {
          this.snackColor = "error";
          this.text = res.msg;
          this.snackbar = true;
          return;
        }
        this.Users = res.data.items;
        if (res.data.items === null) this.Users = [];
        // for (var item = 0; item < this.Users.length; item++) {
        //   console.log(123);
        // }
      });
    },
    editItem(item) {
      this.user_update_form.id = item.id;
      this.user_update_form.name = item.name;
      this.user_update_form.dept = item.dept;
      this.user_update_form.level = item.level;
      this.user_update_form.status = item.status;
      this.user_update_form.classes = item.classes;
      this.user_update_form.grade = item.grade;

      switch (this.user_update_form.level) {
        case 1:
          this.user_update_form.level = "纪律委员";
          break;
        case 2:
          this.user_update_form.level = "干事";
          break;
        case 3:
          this.user_update_form.level = "代部";
          break;
        case 4:
          this.user_update_form.level = "部长";
          break;
        case 5:
          this.user_update_form.level = "组长";
          break;
        case 6:
          this.user_update_form.level = "辅导员";
          break;
        default:
          this.user_update_form.level = "";
          break;
      }
      switch (this.user_update_form.status) {
        case "active":
          this.user_update_form.status = "已激活";
          break;
        case "inactive":
          this.user_update_form.status = "待激活";
          break;
        case "suspend":
          this.user_update_form.status = "已停用";
          break;

        default:
          this.user_update_form.status = "";
          break;
      }

      this.dialog = true;
    },

    close() {
      this.initialize();
      this.$refs.form.reset();
      this.dialog = false;
    },
    save() {
      console.log(this.user_update_form);
      switch (this.user_update_form.level) {
        case "纪律委员":
          this.user_update_form.level = 1;
          break;
        case "干事":
          this.user_update_form.level = 2;
          break;
        case "代部":
          this.user_update_form.level = 3;
          break;
        case "部长":
          this.user_update_form.level = 4;
          break;
        case "组长":
          this.user_update_form.level = 5;
          break;
        case "辅导员":
          this.user_update_form.level = 6;
          break;
        default:
          this.user_update_form.level = 0;
          break;
      }
      switch (this.user_update_form.status) {
        case "已激活":
          this.user_update_form.status = "active";
          break;
        case "待激活":
          this.user_update_form.status = "inactive";
          break;
        case "已停用":
          this.user_update_form.status = "suspend";
          break;
        default:
          this.user_update_form.status = "";
          break;
      }

      API.updateUser(this.user_update_form).then(res => {
        if (res.code !== 0) {
          this.snackColor = "error";
          this.text = res.msg;
          this.snackbar = true;
          this.close();
          return;
        }
         this.snackColor = "success";
          this.text = "用户信息修改成功";
          this.snackbar = true;
        this.close();
      });
      //
    }
  }
};
</script>