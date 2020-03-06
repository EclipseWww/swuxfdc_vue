<template>
  <v-data-table
  multi-sort
    :group-by="groupBy"
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>缺勤记录</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">添加</v-btn>
          </template>
          <v-card>
            <v-form ref="form">
              <v-card-title>
                <span class="headline">添加缺勤记录</span>
              </v-card-title>
        
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field :rules="basicRules" v-model="editedItem.name" label="姓名"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-select
                        :rules="basicRules"
                        v-model="editedItem.grade"
                        :items="grade"
                        label="年级"
                      ></v-select>
                    </v-col>
                    <v-col cols="6" sm="6" md="4">
                      <v-autocomplete
                        :rules="basicRules"
                        v-model="editedItem.classes"
                        :items="classes"
                        label="专业班级"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field :rules="weekRules" v-model="editedItem.week" label="周次"></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="6" md="3">
                      <v-text-field :rules="numRules" v-model="editedItem.num" label="节数"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                           <v-select
                        :rules="basicRules"
                        v-model="editedItem.status"
                        :items="status"
                        label="状态"
                      ></v-select>
                     
                    </v-col>
                    <v-col cols="12">
                  <v-textarea rows=1 hint="如：星期三 1-3 数据结构" auto-grow :rules="basicRules" v-model="editedItem.deteil" label="课程信息"></v-textarea>
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
            <v-layout  mx-5  wrap row >
                <v-flex pr-2 xs6 md3 >
                  <v-select clearable v-model="groupBy"  :items="groups" label="筛选"></v-select>
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
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>


<script>
export default {
  name: "Absent",

  components: {},
  data: () => ({
    search: '',
    weekRules: [
      v => !!v || "请输入周次",
      v => (v > 0 && v <= 17) || "请输入数字，且小于17"
    ],
    numRules: [v => !!v || "请输入节数", v => v > 0 || "请输入数字"],
    basicRules: [v => !!v || "必填项"],
    grade: ["大一", "大二", "大三"],
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
    status: ["旷课", "请假，未收到假条", "请假，已收到假条"],
    groups: ["姓名", "年级", "专业班级"],
    groupBy: [],
    dialog: false,
    headers: [
      {
        text: "姓名",
        align: "left",
        
        value: "姓名"
      },
      { text: "年级", value: "年级" },
      { text: "专业班级", value: "专业班级" },
      { text: "周次", value: "carbs" },
      { text: "节数", value: "protein",sortable: false,filterable: false, },
      { text: "操作", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    tabs: [
      { text: "缺勤写入", route: "/discipline/absent" },
      { text: "纪委考评", route: "/discipline/score" },
      { text: "缺勤审核", route: "/discipline/audit" }
    ]

    //
  }),
  created() {
    this.initialize();
    this.changeTabDis();
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
    changeTabDis() {
      this.$store.commit("changeTabs", this.tabs);
    },
    initialize() {
      this.desserts = [
        {
          姓名: "Eclair",
          年级: 159,
          专业班级: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          姓名: "Ice cream sandwich",
          年级: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          姓名: "Eclair",
          年级: 237,
          专业班级: 16.0,
          carbs: 23,
          protein: 6.0
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>