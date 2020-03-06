<template>

  <v-footer class="grey lighten-4" padless >
    <v-row id="footer" justify="center" no-gutters>
      
      <v-col  class="grey lighten-4 py-4 text-right " cols="12">
        <v-btn class="footer" text color="primary darken-2"  >&copy;  {{ (new Date()).getFullYear() }}</v-btn>
        <v-btn class="footer" href="http://swu.edu.cn/" target="_blank" text color="primary darken-2" rounded >西南大学</v-btn>
         <v-btn class="footer" href="http://computer.swu.edu.cn/s/computer/" target="_blank" text color="primary darken-2" rounded >计信院</v-btn>
         <v-btn class="footer last" href="http://swuxfdc.cn:8080/" target="_blank" text color="primary darken-2"  >学生学风督察小组</v-btn>
         
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  components: {},

  data: () => ({
    //
  })
};
</script>
<style lang="scss">
#footer{
  border-top: 1px solid #E0E0E0;
.footer{
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
.last{
  margin-right: 20px
}
}
</style>