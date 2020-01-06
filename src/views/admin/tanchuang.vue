<template>
  <el-dialog title="详细信息" :visible.sync="dialogVisible" :before-close="cancelDialog" >
    <el-form class="form">
      <el-form-item label="日期 : ">
        <p>{{dialogInfo.date}}</p>
      </el-form-item>
      <el-form-item label="姓名 : ">
        <p>{{dialogInfo.name}}</p>
      </el-form-item>
      <el-form-item label="地址 : ">
        <p>{{dialogInfo.address}}</p>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="cancelDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
//父组件 传 过来的 值
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
　　//监听 弹窗显示， 可以用来写 请求接口
    dialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "componentDialog",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
   //修改父组件传过来的值
    cancelDialog() {
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>
<style lang='scss' scoped>
.form{
    background: #eee;
    padding: 0 10px;
}
.dialog-footer{
    text-align: center;
}
</style>