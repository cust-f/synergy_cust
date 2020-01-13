<template>
<div>
    <el-container>
        <el-main>
          <div font-size="24px">
            <h3>二级供应商列表</h3></div>
             &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div>


    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" class="handle-del mr10" @click="addData">新增</el-button>
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
        <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="主营业务"></el-table-column>
        <el-table-column prop="Origin_Region" label="所属地区"></el-table-column>
        <el-table-column prop="Money" label="注册资本"></el-table-column>
        
        <el-table-column prop="date" label="添加时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button> -->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="supplyDetail" type="text" size="small">查看详情</el-button>
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
    <el-dialog title="新增" :visible.sync="addVisible" width="60%">
        <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
            @selection-change="handleSelectionChange"
        >
        <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="bussessType" label="主营业务"></el-table-column>
        <el-table-column prop="Origin_Region" label="所属地区"></el-table-column>
        <el-table-column prop="Money" label="注册资本"></el-table-column>
        
        <el-table-column prop="date" label="添加时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >添加</el-button>
          <el-button @click="supplyDetail" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
        </el-table>
      <!-- <el-form ref="form" :model="addList" label-width="70px">
        <el-form-item label="企业名称">
          <el-input v-model="addList.name"></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input v-model="addList.address"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="addList.money"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addList.state" placeholder="请选择状态">
            <el-option label="成功" value="成功"></el-option>
            <el-option label="失败" value="失败"></el-option>
          </el-select>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span> -->
    </el-dialog>
              </div>

        </el-main>
    </el-container>
    
    
</div>
      
</template>

<script>
export default {
  name: "secondarysupplyList",
  data() {
    return {
        query: {
        pageIndex: 1,
        pageSize: 10
        },
        tableData: [
        {
          id: 1,
          bussessType: "发电装备",
          name: "哈尔滨电机厂有限责任公司",
          Origin_Region:'长春',
          Money:'2000万',          
          date: "2020-01-01"
        },
        {
          id: 2,
          bussessType: "燃气轮机",
          name: "中船重工龙江广瀚燃气轮机有限公司",
          Origin_Region:'吉林',
          date: "2019-11-01",
          Money:'3000万',          

        },
        {
          id: 3,
          bussessType: "卫星应用",
          name: "哈尔滨航天恒星数据系统科技有限公司",
          Origin_Region:'松原',
          date: "2020-01-06",
          Money:'4000万',  
        },
        {
          id: 4,
          bussessType: "汽车业数字化",
          name: "长春一汽启明信息技术有限责任公司",
          Origin_Region:'辽源',
          date: "2020-01-05",
          Money:'8000万',  
        },
         {
          id: 5,
          bussessType: "卫星微型零件制作",
          name: "长春微电子信息有限公司",
          Origin_Region:'白山',
          date: "2020-01-04",
          Money:'6000万',  
        },
        {
          id: 6,
          bussessType: "光电测控仪器设备",
          name: "长春奥普光电技术股份有限公司",
          Origin_Region:'哈尔滨',
          date: "2019-11-01",
          Money:'7000万',  
        },
        {
          id: 7,
          bussessType: "磨床生产",
          name: "杭机集团长春一机有限公司",
          Origin_Region:'延吉',
          date: "2019-11-01",
          Money:'5000万',  
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
      id: -1
    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
    supplyDetail(){
         this.$router.push('/admin/supplyDetail')
     },
    addData() {
      this.addVisible = true;
    },
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

</style>