
<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <h3>任务列表</h3>
        </div>

<div style="margin: 10px;border:2px solid #f0f0f4;width: 850px;" >
<el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 10px" >
   
  <el-form-item label="所有任务搜索：">
    <el-input v-model="formLabelAlign.region"  placeholder="请输入" style="width: 600px;"></el-input>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
  <el-form-item label="所有任务列表：">
<el-table
    :data="tableData1" border stripe 
    style="width: 680px;" >
    <el-table-column
      label="发布日期"
      width="150">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="状态"
      width="100">
      <template slot-scope="scope">
        <el-popover >
         
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.desighstate }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="负责人"
      width="100">
      <template slot-scope="scope">
        <el-popover >
         
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
         <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">分配人员</el-button>
        <el-button
          size="mini"
          @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    
  </el-form-item>
  <br/>

</el-form>
 </div>
 <div style="text-align:center">
    <el-button type="primary" style="">关闭页面</el-button>
  </div> 
    </el-main>
   </el-container>
</template>




<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          desighstate:'',
          region: '',
          type: ''
        },
         tableData1: [{
          date: '2016-05-02',
          desighstate:'完成',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          desighstate:'未完成',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          desighstate:'未分配',
          name: '王小虎',         
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          desighstate:'未分配',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
         
      };
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push("/supplierCTdistribution")
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleDetail(index,row) {
        this.$router.push("/supplierChildtast")
      }
    }

  }
</script>


