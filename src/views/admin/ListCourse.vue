<template>
  <v-data-table multi-sort :headers="headers" :items="Users" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>课程总表</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-if="$store.state.userInfo.dept === '信息部'" v-model="dialog1" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mt-3 mb-2" v-on="on">添加</v-btn>
          </template>
          <v-card>
            <v-form ref="form1">
              <v-card-title>
                <span class="headline">课程信息写入</span>
              </v-card-title>
             
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.name"
                          label="课程名称"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-autocomplete
                          dense
                          :rules="basicRules"
                          v-model="create_form.classes"
                          :items="classes"
                          label="专业班级"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-autocomplete dense v-model="create_form.pro" :items="pros" label="课程性质"></v-autocomplete>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.teacher"
                          label="任课教师"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-autocomplete
                          dense
                          v-model="create_form.day"
                          :items="days"
                          :rules="basicRules"
                          label="星期"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.building"
                          label="教学楼"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.room"
                          label="教室"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="3">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.week_start"
                          label="起始周"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="3">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.week_end"
                          label="终止周"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="3">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.time_start"
                          label="起始节"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="3">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.time_end"
                          label="终止节"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-text-field
                          dense
                          :rules="basicRules"
                          v-model="create_form.num"
                          label="人数"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="6" md="4">
                        <v-text-field dense v-model="create_form.num_n" label="非本班人数"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field dense v-model="create_form.more" label="备注"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close1">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="save1">确定</v-btn>
                </v-card-actions>
             
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{  }"></template>
          <v-card>
            <v-form ref="form">
              <v-card-title>
                <span class="headline">修改课程信息</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        dense
                        :rules="basicRules"
                        v-model="update_form.name"
                        label="课程名称"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-autocomplete
                        dense
                        :rules="basicRules"
                        v-model="update_form.classes"
                        :items="classes"
                        label="专业班级"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-autocomplete dense v-model="update_form.pro" :items="pros" label="课程性质"></v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field
                        dense
                        :rules="basicRules"
                        v-model="update_form.teacher"
                        label="任课教师"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-autocomplete
                        dense
                        v-model="update_form.day"
                        :items="days"
                        :rules="basicRules"
                        label="星期"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field
                        dense
                        :rules="basicRules"
                        v-model="update_form.building"
                        label="教学楼"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field dense :rules="basicRules" v-model="update_form.room" label="教室"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        dense
                        :rules="basicRules"
                        v-model="update_form.week_start"
                        label="起始周"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        dense
                        :rules="basicRules"
                        v-model="update_form.week_end"
                        label="终止周"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        dense
                        :rules="basicRules"
                        v-model="update_form.time_start"
                        label="起始节"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field
                        dense
                        :rules="basicRules"
                        v-model="update_form.time_end"
                        label="终止节"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field dense :rules="basicRules" v-model="update_form.num" label="人数"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-text-field dense v-model="update_form.num_n" label="非本班人数"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                      <v-text-field dense v-model="update_form.more" label="备注"></v-text-field>
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
            v-model="qClasses"
            :items="classes"
            label="班级"
            @change="initialize()"
          ></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs6 md2>
          <v-autocomplete clearable v-model="qDay" :items="days" label="星期" @change="initialize()"></v-autocomplete>
        </v-flex>
        <v-flex pl-2 xs6 md2>
          <v-text-field v-model="qName" label="课程名称" @input="initialize()"></v-text-field>
        </v-flex>
      </v-layout>
    </template>
    <template v-slot:item.week="{ item }">{{item.week_start}}~{{item.week_end}}</template>
    <template v-slot:item.time="{ item }">{{item.time_start}}~{{item.time_end}}</template>
    <template v-slot:item.pro="{ item }">
      <v-chip outlined color="green" v-if="item.pro=='学科必修课'">{{item.pro}}</v-chip>
      <v-chip outlined color="primary " v-else-if="item.pro=='专业选修课'">{{item.pro}}</v-chip>
      <v-chip outlined color="orange darken-2" v-else-if="item.pro=='专业必修课'">{{item.pro}}</v-chip>
      <v-chip outlined color="grey darken-2" v-else>{{item.pro}}</v-chip>
    </template>

    <template v-slot:item.action="{ item }">
      <v-btn icon @click="editItem(item)" text color="primary ">
        <v-icon class>edit</v-icon>
      </v-btn>
      <v-btn icon text color="error darken-2">
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
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
    dialog1: false,

    grade: ["2017", "2018", "2019"],
    status: ["待激活", "已激活", "已停用"],
    pros: ["学科必修课", "专业必修课", "专业选修课"],
    dept: ["信息部", "纪检部", "秘书部", "企划部"],
    days: [1, 2, 3, 4, 5],
    times: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    classes: [
      "19软工1/2",
      "19软工3/4",
      "19自动化1/2",
      "19自动化3/4",
      "19计科1/2",
      "19计科3/4",
      "19网工",
      "19计师1",
      "19计师2",
      "19管工1",
      "19管工2",

      "18软工1/2",
      "18软工3/4",
      "18自动化1/2",
      "18自动化3/4",
      "18计科1/2",
      "18计科3/4",
      "18网工",
      "18计师1",
      "18计师2",
      "18智能科学",
      "18数据科学",
      "18电商",
      "18信管",

      "17软工1/2",
      "17软工3/4",
      "17自动化1/2",
      "17自动化3/4",
      "17计科1/2",
      "17计科3/4",
      "17网工",
      "17计师1",
      "17计师2",
      "17电商",
      "17信管"
    ],
    basicRules: [v => !!v || "必填项"],
    headers: [
      {
        text: "班级",
        align: "center",
        value: "classes"
      },
      {
        text: "星期",
        align: "center",
        value: "day"
      },
      { text: "教学周", value: "week", align: "center", sortable: false },
      { text: "节次", value: "time", align: "center" },
      { text: "课程名称", value: "name", align: "center", sortable: false },
      { text: "教学楼", value: "building", align: "center", sortable: false },
      { text: "教室", value: "room", align: "center", sortable: false },
      { text: "课程性质", value: "pro", align: "center", sortable: false },
      { text: "任课教师", value: "teacher", align: "center" },
      { text: "人数", value: "num", align: "center", sortable: false },
      { text: "非本班人数", value: "num_n", align: "center", sortable: false },
      { text: "操作", value: "action", sortable: false, align: "center" }
    ],
    Users: [],
    qClasses: "",
    qDay: "",
    qName: "",
    update_form: {
      id: 0,
      name: "",
      classes: "",
      day: 0,
      time_start: 0,
      time_end: 0,
      week_start: 0,
      week_end: 0,
      pro: "",
      teacher: "",
      num: 0,
      num_n: 0,
      more: "",
      building: "",
      room: ""
    },
    create_form: {
      id: 0,
      name: "",
      classes: "",
      day: 0,
      time_start: 0,
      time_end: 0,
      week_start: 0,
      week_end: 0,
      pro: "",
      teacher: "",
      num: 0,
      num_n: 0,
      more: "",
      building: "",
      room: ""
    }
  }),
  beforeUpdate() {
    if (this.$store.state.userInfo.dept !== "信息部")
      this.headers = [
        {
          text: "班级",
          align: "center",
          value: "classes"
        },
        {
          text: "星期",
          align: "center",
          value: "day"
        },
        { text: "教学周", value: "week", align: "center", sortable: false },
        { text: "节次", value: "time", align: "center" },
        { text: "课程名称", value: "name", align: "center", sortable: false },
        { text: "教学楼", value: "building", align: "center", sortable: false },
        { text: "教室", value: "room", align: "center", sortable: false },
        { text: "课程性质", value: "pro", align: "center", sortable: false },
        { text: "任课教师", value: "teacher", align: "center" },
        { text: "人数", value: "num", align: "center", sortable: false },
        { text: "非本班人数", value: "num_n", align: "center", sortable: false }
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
      API.getCourses(0, 500, this.qClasses, this.qDay, this.qName).then(res => {
        if (res.code !== 0) {
          this.snackColor = "error";
          this.text = res.msg;
          this.snackbar = true;
          return;
        }
        this.Users = res.data.items;
        if (res.data.items === null) this.Users = [];
      });
    },
    editItem(item) {
      this.update_form.id = item.id;
      this.update_form.id = item.id;
      this.update_form.name = item.name;
      this.update_form.classes = item.classes;
      this.update_form.day = item.day;
      this.update_form.time_start = item.time_start;
      this.update_form.time_end = item.time_end;
      this.update_form.week_start = item.week_start;
      this.update_form.week_end = item.week_end;
      this.update_form.pro = item.pro;
      this.update_form.teacher = item.teacher;
      this.update_form.num = item.num;
      this.update_form.num_n = item.num_n;
      this.update_form.more = item.more;
      this.update_form.building = item.building;
      this.update_form.room = item.room;

      this.dialog = true;
    },
    deleteItem(item) {
      confirm("您确定要删除这条课程信息吗?") &&
        API.deleteCourses(item.id).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar = true;
          } else {
            this.snackColor = "success";
            this.text = "课程信息删除成功";
            this.snackbar = true;
          }
          this.initialize();
        });
    },

    close() {
      this.initialize();
      this.$refs.form.reset();
      this.dialog = false;
    },
    close1() {
      this.initialize();
      this.$refs.form1.reset();
      this.dialog1 = false;
    },
    save() {
      this.update_form.week_start = parseInt(this.update_form.week_start);
      this.update_form.week_end = parseInt(this.update_form.week_end);
      this.update_form.time_start = parseInt(this.update_form.time_start);
      this.update_form.time_end = parseInt(this.update_form.time_end);
      this.update_form.num = parseInt(this.update_form.num);
      this.update_form.num_n = parseInt(this.update_form.num_n);
      if (
        this.update_form.week_start > this.update_form.week_end ||
        this.update_form.time_start > this.update_form.time_end
      ) {
        this.snackColor = "error";
        this.text = "逻辑有误，请检查！";
        this.snackbar = true;
        return;
      }
      if (this.$refs.form.validate()) {
        API.updateCourse(this.update_form).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar = true;
            this.close();
            return;
          }
          this.snackColor = "success";
          this.text = "课程信息修改成功";
          this.snackbar = true;
          this.close();
        });
        //
      }
    },
      save1() {
      this.create_form.week_start = parseInt(this.create_form.week_start);
      this.create_form.week_end = parseInt(this.create_form.week_end);
      this.create_form.time_start = parseInt(this.create_form.time_start);
      this.create_form.time_end = parseInt(this.create_form.time_end);
      this.create_form.num = parseInt(this.create_form.num);
      this.create_form.num_n = parseInt(this.create_form.num_n);
      if (
        this.create_form.week_start > this.create_form.week_end ||
        this.create_form.time_start > this.create_form.time_end
      ) {
        this.snackColor = "error";
        this.text = "逻辑有误，请检查！";
        this.snackbar = true;
        return;
      }
      if (this.$refs.form1.validate()) {
        API.createCourse(this.create_form).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar = true;
            this.close1();
            return;
          }
          this.snackColor = "success";
          this.text = "课程信息写入成功";
          this.snackbar = true;
          this.close1();
        });
        //
      }
    }
  }
};
</script>