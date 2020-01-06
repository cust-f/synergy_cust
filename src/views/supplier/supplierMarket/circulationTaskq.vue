<template>
<div>
    <el-container>
        <el-aside width="15%">
      <div class="backGround_0">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>历史记录</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
            </div>
            <div v-for="o in tenderTrendsList" :key="o" class="text item">
                {{ o }}
            </div>  
        </el-card>
      </div>
        </el-aside>
        <el-main>
            <h3>流通任务</h3>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              
   <div>
    <div class="container">
      <div class="handle-box">
      </div>

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="任务编号" width="80"></el-table-column>
        <el-table-column prop="name" label="任务名称"></el-table-column>
        <el-table-column prop="class" label="任务类型"></el-table-column>
        <el-table-column prop="publish" label="发布任务企业"></el-table-column>
        <el-table-column prop="taskleader" label="任务负责人" ></el-table-column>
        <el-table-column prop="deadline" label="任务截止日期"></el-table-column>
        <el-table-column prop="cirleader" label="流通负责人"></el-table-column>
        <el-table-column prop="num" label="需要数目"></el-table-column>
        <el-table-column prop="state" label="流通状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='未完成'?'danger':(scope.row.state==='已完成'?'success':'')"
              >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
          <el-button type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
        </el-main>
    </el-container>
     

</div>
      
</template>
<script>
export default {
  name: "circulationtask",
  data() {
    return {
        query: {
        pageIndex: 1,
        pageSize: 10
        },
        tableData: [
        {
          id: 10001,
          name: "车间零部件生产",
          class: "生产",
          publish: "一汽",
          taskleader: "张三",
          deadline:"2019-11-1",
          state:"已完成",
          num:2,
          cirleader:'李四'
        },
        {
          id: 10002,
          name: "卫星微型零件制作",
          class: "制作",
          publish: "一汽",
          taskleader: "张三",
          deadline:"2019-11-1",
          state:"未完成",
          num:2,
          cirleader:'李四'
        },
        {
          id: 10003,
          name: "卫星微型零件制作",
          class: "制作",
          publish: "一汽",
          taskleader: "张三",
          deadline:"2019-11-1",
          state:"未完成",
          num:2,
          cirleader:'李四'
        },
        {
          id: 10004,
          name: "卫星微型零件制作",
          class: "制作",
          publish: "一汽",
          taskleader: "张三",
          deadline:"2019-11-1",
          state:"已完成",
          num:2,
          cirleader:'李四'
        },
         {
          id: 10005,
          name: "卫星微型零件制作",
          class: "制作",
          publish: "哈工",
          taskleader: "张三",
          deadline:"2019-11-1",
          state:"已完成",
          num:2,
          cirleader:'李四'
        },
        {
          id: 10006,
          name: "卫星微型零件制作",
          class: "制作",
          publish: "哈工",
          taskleader: "张三",
          deadline:"2019-11-1",
          state:"已完成",
          num:2,
          cirleader:'李四'
        },
        {
          id: 10007,
          name: "导弹装配与改进",
          class: "装配",
          publish: "哈工",
          taskleader: "张三",
          deadline:"2019-11-1",
          state:"已完成",
          num:2,
          cirleader:'李四'
        }
      ],
      addList: {
        id: null,
        address: "",
        name: "",
        money: null,
        state: null,
        date: null
      },
       tenderTrendsList:[
        { column_name: "黄河远上白云间" },
        { column_name: "九曲黄河万里沙" },
        { column_name: "君不见黄河之水天上来"},
        { column_name: "白日依山尽，黄河入海流"},
        { column_name: "黄河落天走东海，万里尘沙入胸怀"},
        { column_name: "明月隐高树，长河没晓天"},
        { column_name :"萧萧远树疏林外，一半秋山带夕阳。"},
        { column_name: "黄河西来决昆仑，咆哮万里触龙门。"}
         ],
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
    created() {
    this.getData();
  },
  methods:{
          // 获取 easy-mock 的模拟数据
    getData() {
      //   this.tableData = res.list;
      //   this.pageTotal = tableData.length;
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    //新增操作
    addData() {
      this.addVisible = true;
    },
    //保存新增
    saveAdd() {
      this.tableData.push(this.addList);
      console.log(this.addList);
      this.addList = {};
      this.addVisible = false;
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {},
     substaskDetail(){
         this.$router.push('/substaskDetail')
     }
  },
      /*
      *转跳对应任务信息页面
      */
    
  };

</script>
<style>
.con{
    width:500px;
    height: 1000px;
    margin:0 auto;
    text-align: center
}

</style>