<template>
  <v-container ma-auto class="fill-height">
    <v-snackbar v-model="snackbar" top :timeout="timeout" :color="snackColor">
      {{text}}
      <v-btn dark text @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-layout ma>
      <v-flex ma-auto xs12 sm8 md6 lg5>
        <v-card height="450px" ma-auto :elevation="zindex" :color="color" :outlined="outline">
          <v-form ref="form1" lazy-validation>
            <v-card width="80%" color="primary" class="py-3 elevation-6 ma-auto logo">
              <v-img src="@/assets/logo2.svg" contain height="100px"></v-img>
            </v-card>
            <div style="transform: translate(0%,-15%);">
              <p class="headline pt-2" style="text-align:center">登录</p>
              <p class=".subtitle-2 pb-0 mb-0 grey--text" style="text-align:center">使用您的学号</p>
              <v-card-text>
                <v-container px-5 my-0 py-0>
                  <v-text-field
                    :rules="userRules"
                    dense
                    outlined
                    label="用户名"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="loginForm.user_name"
                  />
                  <v-text-field
                    :rules="pwRules"
                    outlined
                    dense
                    id="password"
                    label="密码"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="loginForm.password"
                  />

                  <p
                    class=".subtitle-2 pb-0 mb-0 pr-0 mr-0 grey--text"
                    style="text-align:left"
                  >不是您自己的计算机？请使用无痕窗口登录</p>
                </v-container>
              </v-card-text>
              <v-layout pb-5 wrap row justify-space-between>
                <v-flex xs3>
                  <v-layout ml-9 wrap row justify-space-between>
                    <v-flex xs12>
                      <v-dialog v-model="dialog1" max-width="400px">
                        <template v-slot:activator="{ on }">
                          <v-btn depressed text color="primary" v-on="on">修改密码</v-btn>
                        </template>
                        <v-card>
                          <v-form ref="form">
                            <v-card-title>
                              <span class="headline mt-5 ml-5">修改密码</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-form ref="form2" lazy-validation>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="userRules"
                                        dense
                                        label="用户名"
                                        name="login"
                                        prepend-icon="person"
                                        type="text"
                                        v-model="changeForm.user_name"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="pwRules"
                                        dense
                                        label="原密码"
                                        name="login"
                                        prepend-icon="mdi-cloud-lock"
                                        type="password"
                                        v-model="changeForm.password"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="pwRules"
                                        dense
                                        label="新密码"
                                        name="login"
                                        prepend-icon="mdi-lock-open"
                                        type="password"
                                        v-model="changeForm.password_new"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="pwRules"
                                        dense
                                        label="确认密码"
                                        name="login"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        v-model="changeForm.password_confirm"
                                      />
                                    </v-col>
                                  </v-row>
                                </v-form>
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
                      <v-dialog v-model="dialog2" max-width="400px">
                        <template v-slot:activator="{ on }">
                          <v-btn depressed text color="primary" v-on="on">注册新用户</v-btn>
                        </template>
                        <v-card>
                          <v-form ref="form">
                            <v-card-title>
                              <span class="headline mt-5 ml-5">注册新用户</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-form ref="form3" lazy-validation>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="userRules"
                                        dense
                                        label="学号"
                                        name="login"
                                        prepend-icon="mdi-account-badge"
                                        type="text"
                                        v-model="resForm.user_name"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="basicRules"
                                        dense
                                        label="真实姓名"
                                        prepend-icon="person"
                                        type="text"
                                        v-model="resForm.name"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-autocomplete
                                        :rules="basicRules"
                                        v-model="resForm.grade"
                                        :items="grade"
                                        label="年级"
                                        prepend-icon="mdi-microsoft"
                                        dense
                                      ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12">
                                      <v-autocomplete
                                        dense
                                        :rules="basicRules"
                                        v-model="resForm.classes"
                                        :items="classes"
                                        label="专业班级"
                                        prepend-icon="mdi-microsoft-dynamics"
                                      ></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="pwRules"
                                        dense
                                        label="密码"
                                        prepend-icon="mdi-lock-open"
                                        type="password"
                                        v-model="resForm.password"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        :rules="pwRules"
                                        dense
                                        label="确认密码"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        v-model="resForm.password_confirm"
                                      />
                                    </v-col>
                                  </v-row>
                                </v-form>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="closeRes">取消</v-btn>
                              <v-btn color="blue darken-1" text @click="saveRes">确定</v-btn>
                            </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs3 my-auto py-auto>
                  <v-btn color="primary lighten-1" @click="login">登录</v-btn>
                </v-flex>
              </v-layout>
              <v-layout pt-12 wrap row justify-space-between>
                <v-flex>
                  <v-snackbar v-model="snackbar1" bottom :timeout="timeout" color="error">
                    {{text}}
                    <v-btn dark text @click="snackbar1 = false">关闭</v-btn>
                  </v-snackbar>
                </v-flex>
              </v-layout>
            </div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import * as API from "@/api/";
export default {
  name: "Login",

  components: {},
  data() {
    return {
      timeout: 2000,
      snackColor: "",
      text: "",
      dialog1: false,
      dialog2: false,
      snackbar: false,
      snackbar1: false,
      userRules: [v => !!v || "请输入用户名"],
      pwRules: [v => !!v || "请输入密码"],
      basicRules: [v => !!v || "必填项"],
      screenWidth: document.body.clientWidth,
      zindex: 12,
      outline: false,
      color: "white",
      loginForm: {
        user_name: "ghiopppq",
        password: "0000000"
      },
      changeForm: {
        user_name: "",
        password: "",
        password_new: "",
        password_confirm: ""
      },
      resForm: {
        user_name: "",
        password: "",
        password_confirm: "",
        name: "",
        grade: "",
        classes: ""
      },
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
      ]
    };

    //
  },
  methods: {
    close() {
      this.$refs.form2.reset();
      this.dialog1 = false;
    },
    closeRes() {
      this.$refs.form3.reset();
      this.dialog2 = false;
    },

    save() {
      if (this.$refs.form2.validate()) {
        if (this.changeForm.password_new !== this.changeForm.password_confirm) {
          this.snackColor = "error";
          this.text = "两次新密码输入不一致";
          this.snackbar = true;
          return;
        }
        if (this.changeForm.password_new === this.changeForm.password) {
          this.snackColor = "error";
          this.text = "新密码与旧密码相同";
          this.snackbar = true;
          return;
        }
        API.change(this.changeForm).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar = true;
            return;
          } else {
            this.snackColor = "success";
            this.text = "密码修改成功";
            this.snackbar = true;
            this.close();
          }
        });
      }
      return;
    },
    saveRes() {
      if (this.$refs.form3.validate()) {
        if (this.resForm.password !== this.resForm.password_confirm) {
          this.snackColor = "error";
          this.text = "两次新密码输入不一致";
          this.snackbar = true;
          return;
        }

        API.register(this.resForm).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar = true;
            return;
          } else {
            this.snackColor = "success";
            this.text = "用户注册成功，请等待激活";
            this.snackbar = true;
            this.closeRes();
          }
        });
      }
      return;
    },
    login() {
      if (this.$refs.form1.validate()) {
        API.login(this.loginForm).then(res => {
          if (res.code !== 0) {
            this.snackColor = "error";
            this.text = res.msg;
            this.snackbar1 = true;
            return;
          }
          if (res.data.level>1) this.$router.push("admin/index");
          else this.$router.push("/jw/upload");
        });
      }
    }
  },
  created() {
    if (this.screenWidth <= 600) {
      this.zindex = 0;
      this.outline = true;
      this.color = "grey lighten-5";
    } else {
      this.zindex = 12;
      this.outline = false;
      this.color = "white";
    }
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
          if (that.screenWidth <= 600) {
            that.zindex = 0;
            that.outline = true;
            that.color = "grey lighten-5";
          } else {
            that.zindex = 12;
            that.outline = false;
            that.color = "white";
          }
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>
<style >
.logo {
  transform: translate(0%, -55%);
  background: linear-gradient(135deg, #56c8ff, #6f99fc) no-repeat;
}
</style>