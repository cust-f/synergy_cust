<template>
<div>
    <el-container>
        <el-main>
            <h3>主任务</h3>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              
              <div>



    <div class="container">
      <template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部任务" name="first">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      </div>
           <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="任务完成时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="substaskDetail1(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
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



    </el-tab-pane>
    <el-tab-pane label="待回应任务" name="fifth">      
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      </div>
           <el-table
        :data="tableData4"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="任务完成时间"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="substaskDetail2(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
                    <el-button @click="chick(scope.$index, scope.row)" type="text" size="small">供应商审核</el-button>
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
      </el-tab-pane>



      <el-tab-pane label="进行中" name="sixth">      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      </div>
           <el-table
        :data="tableData5"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="任务完成时间"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="substaskDetail3" type="text" size="small">查看详情</el-button>
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
      </el-tab-pane>



    <el-tab-pane label="待审核任务" name="second">      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      </div>
           <el-table
        :data="tableData1"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="任务完成时间"></el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="substaskDetail4(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
          <el-button @click="dialogVisible = true" type="text" size="small">审核通过</el-button>
                    <el-button @click="open" type="text" size="small">审核不通过</el-button>

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
      </el-tab-pane>







    <el-tab-pane label="完成任务" name="third">      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      </div>
           <el-table
        :data="tableData2"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="任务完成时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="substaskDetaill(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
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
      </el-tab-pane>






    <el-tab-pane label="废除任务" name="fourth">      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      </div>
           <el-table
        :data="tableData3"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="任务完成时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="substaskDetail6(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
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
      </el-tab-pane>



    <el-dialog title="是否同意通过审核" :visible.sync="dialogVisible" width="40%" >
      <div>
       
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">是</el-button>
        <el-button type="primary" @click="dialogVisible = false">否</el-button>
      </span>
    </el-dialog>

    

  </el-tabs>
</template>




    </div>

 
  </div>

  
        </el-main>
    </el-container>
     

</div>
      
</template>

<script>
export default {
  name: "mainStaskShow",
  data() {
    return {
        query: {
        pageIndex: 1,
        pageSize: 10
        },
        tableData: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长春光华微电子集团",
          money: 30000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "中国机械工业集团公司",
          money: 5000,
          state: "失败",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "山东工程机械集团有限公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "大连冰山集团有限公司",
          money: 5000,
          state: "成功",
          date: "2019-11-1"
        },
         {
          id: 1,
          bussessType: "车间零部件生产",
          name: "沈阳机床集团有限责任公司",
          money: 5000,
          state: "失败",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "北方重工集团有限公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "大连重工-起重集团有限公司",
          money: 7000,
          state: "成功",
          date: "2019-11-1"
        }
      ],







             tableData1: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长春光华微电子集团",
          money: 30000,
          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "中国机械工业集团公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "山东工程机械集团有限公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "大连冰山集团有限公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-1"
        },
         {
          id: 1,
          bussessType: "车间零部件生产",
          name: "沈阳机床集团有限责任公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "北方重工集团有限公司",
          money: 5000,
          state: "待审核",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "大连重工-起重集团有限公司",
          money: 7000,
          state: "待审核",
          date: "2019-11-1"
        }
      ],








      tableData2: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长春光华微电子集团",
          money: 30000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "中国机械工业集团公司",
          money: 5000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "山东工程机械集团有限公司",
          money: 5000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "大连冰山集团有限公司",
          money: 5000,
          state: "成功",
          date: "2019-11-1"
        },
         {
          id: 1,
          bussessType: "车间零部件生产",
          name: "沈阳机床集团有限责任公司",
          money: 5000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "北方重工集团有限公司",
          money: 5000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "大连重工-起重集团有限公司",
          money: 7000,
          state: "成功",
          date: "2019-11-1"
        }
      ],



      tableData3: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长春光华微电子集团",
          money: 30000,
          state: "失败",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "中国机械工业集团公司",
          money: 5000,
          state: "失败",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "山东工程机械集团有限公司",
          money: 5000,
          state: "失败",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "大连冰山集团有限公司",
          money: 5000,
          state: "失败",
          date: "2019-11-1"
        },
         {
          id: 1,
          bussessType: "车间零部件生产",
          name: "沈阳机床集团有限责任公司",
          money: 5000,
          state: "失败",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "北方重工集团有限公司",
          money: 5000,
          state: "失败",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "大连重工-起重集团有限公司",
          money: 7000,
          state: "失败",
          date: "2019-11-1"
        }
      ],




      tableData4: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长春光华微电子集团",
          money: 30000,
          state: "待回应",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "中国机械工业集团公司",
          money: 5000,
          state: "待回应",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "山东工程机械集团有限公司",
          money: 5000,
          state: "待回应",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "大连冰山集团有限公司",
          money: 5000,
          state: "待回应",
          date: "2019-11-1"
        },
         {
          id: 1,
          bussessType: "车间零部件生产",
          name: "沈阳机床集团有限责任公司",
          money: 5000,
          state: "待回应",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "北方重工集团有限公司",
          money: 5000,
          state: "待回应",
          date: "2019-11-1"
        },

        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "大连重工-起重集团有限公司",
          money: 7000,
          state: "待回应",
          date: "2019-11-1"
        }
      ],



      tableData5: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长春光华微电子集团",
          money: 30000,
          state: "未接受",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "中国机械工业集团公司",
          money: 5000,
          state: "未接受",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "山东工程机械集团有限公司",
          money: 5000,
          state: "已接受",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "大型机械组装",
          name: "大连冰山集团有限公司",
          money: 5000,
          state: "已接受",
          date: "2019-11-1"
        },
         {
          id: 1,
          bussessType: "车间零部件生产",
          name: "沈阳机床集团有限责任公司",
          money: 5000,
          state: "已接受",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "北方重工集团有限公司",
          money: 5000,
          state: "已接受",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "大连重工-起重集团有限公司",
          money: 7000,
          state: "待审核",
          date: "2019-11-1"
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

      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
            dialogVisible: false

      
    };
  },
    created() {
    this.getData();
  },
  methods:{
 
      //审核不通过的原因
         open() {
        this.$prompt('请输入审核不通过原因', '提示', {
          confirmButtonText: '修改提交',
          cancelButtonText: '任务废除',
        })},
        onSubmit() {
      console.log(123);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },




          handleClick(tab, event) {
        console.log(tab, event);
      },

           substaskDetail1(){
         this.$router.push('/admin/substaskDetail')
     },

          substaskDetail2(){
         this.$router.push('/admin/substaskDetail')
     },
               substaskDetail3(){
         this.$router.push('/admin/substaskDetail')
     },
               substaskDetail4(){
         this.$router.push('/admin/substaskDetail')
     },
               substaskDetaill(){
         this.$router.push('/admin/substaskDetail')
     },
               substaskDetail6(){
         this.$router.push('/admin/substaskDetail')
     },
                     chick(){
                  this.$router.push('/admin/check/review')
                }
    },
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
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      let length = this.multipleSelection.length;
      let str = "";
      for (let j = 0; j < length; j++) {
        this.tableData.splice(this.multipleSelection[j], 1);
        str += this.multipleSelection[j].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
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
.table{
  font-size: 16px
}

</style>
