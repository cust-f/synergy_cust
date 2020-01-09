<template>
<div>
    <el-container>
        <el-main>
            <h3>企业管理</h3>
             &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div>


    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del mr10" @click="addData">增加</el-button>
         <el-select v-model="name" placeholder="企业名称" class="handle-input mr10"></el-select>
         <el-select v-model="area" placeholder="所在地区" class="handle-input mr10"></el-select>
              <el-button type="primary" icon="el-icon-search" @click="choose">筛选</el-button>
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
        <el-table-column prop="type" label="企业类型"></el-table-column>
        <el-table-column prop="time" label="注册时间"></el-table-column>
        <el-table-column prop="capital" label="企业资本"></el-table-column>
        <el-table-column prop="area" label="所在地区"></el-table-column>
        <el-table-column prop="contact" label="联系方式"></el-table-column>   
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button> -->
             <el-button @click="supplyDetail" type="text" size="small">详情</el-button>
            <el-button
              type="text"
              class="red"
              @click="freeze(scope.$index, scope.row)"
            >冻结</el-button>
             <el-button
              type="text"
              class="red"
              @click="unfreeze(scope.$index, scope.row)"
            >解冻</el-button>       
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

    <!-- 编辑弹出框 -->
    <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- 新增弹出框 -->
    <el-dialog title="增加" :visible.sync="addVisible" width="50%">
      <el-form ref="form" :model="addList" label-width="70px">
        <el-form-item label="企业名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input v-model="type"></el-input>
        </el-form-item>    
        <el-form-item label="注册时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addList.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="企业资本">
          <el-input v-model="capital"></el-input>
        </el-form-item>
          <el-form-item label="所在地区">
          <el-input v-model="area"></el-input>
        </el-form-item>
            <el-form-item label="联系方式">
          <el-input v-model="contect"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>
              </div>

        </el-main>
    </el-container>
    
    
</div>
      
</template>

<script>
export default {
  name: "managerBusiness",
  data() {
    return {
        query: {
        pageIndex: 1,
        pageSize: 10
        },
        tableData: [
        {
          id: 1,
          name: "长春微电子信息有限公司",
          type:'合资',
          time:'2019-11-1',          
          capital: "物化资本",
          area: "吉林省长春市",
          contact: "16687456999"
        },
        {
          id: 2,
          name: "吉林省随行者智能科技有限公司",
          type:'独资',
          time:'2008-12-3',          
          capital: "物化资本",
          area: "吉林省长春市",
          contact: "16112233199"       

        },
         {
          id: 3,
          name: "移动出行互联网公司",
          type:'独资',
          time:'2018-2-23',          
          capital: "物化资本",
          area: "吉林省长春市",
          contact: "13722298232"       

        },
         {
          id: 4,
          name: "吉林省华为文化传媒有限公司",
          type:'独资',
          time:'2013-6-2',          
          capital: "物化资本",
          area: "吉林省长春市",
          contact: "15699874897"       

        },{
          id: 5,
          name: "长春数吉科技有限公司",
          type:'独资',
          time:'2013-6-2',          
          capital: "物化资本",
          area: "吉林省长春市",
          contact: "15699874897"       

        },
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
      id: -1
    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
     supplyDetail(){
         this.$router.push('/admin/businessDetail')
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
    }
  }
  
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
  font-size:16px;
}

</style>