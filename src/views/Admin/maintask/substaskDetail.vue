<template>
  <div>
<div>
    <el-container>



        <el-main style="overflow:hidden">
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <el-form ref="form" :model="cool" label-width="110px" class="form">
            <el-row  >
                <el-col :span="11">
                    <el-form-item label="主项目ID">
                        <el-input v-model="cool.id" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="主项目名称">
                        <el-input v-model="cool.name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row >
                <el-col :span="11">
                    <el-form-item label="主项目类型">
                        <el-input v-model="cool.type" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="主项目开始时间">
                        <el-input v-model="cool.begintime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row >
                <el-col :span="11">
                    <el-form-item label="项目负责人">
                        <el-input v-model="cool.leader" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="任务状态">
                        <el-input v-model="cool.taskState" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row >
                <el-col :span="11">
                    <el-form-item label="项目完成日期">
                        <el-input v-model="cool.deadline" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
                <el-col width="100%">
                    <el-form-item label="主项目详情">
                        <el-input type="textarea" :rows="3" style="width:90%" v-model="cool.detail" :disabled="true"></el-input>
                    </el-form-item>
                    
                </el-col>
            </el-row>




        </el-form>
        <div id="div2" align="right">
            <el-button type="primary" class="button1">下载装配文档</el-button>  
             <el-button type="primary" class="button1">下载技术文档模板</el-button>  
        </div>    
         <el-divider></el-divider>
            <h3>子任务</h3>
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
        <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
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
          <el-button @click="mainStaskDetail" type="text" size="small">查看详情</el-button>
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
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
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
    </el-dialog>
 
    <!-- 新增弹出框
    <el-dialog title="新增" :visible.sync="addVisible" width="50%">
      <el-form ref="form" :model="addList" label-width="70px">
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
      </span>
    </el-dialog> -->
  </div>
        </el-main>
    </el-container>
</div>


           
  </div>
</template>




<script>
export default {
    name:'substaskDetail',
    data(){
      return {
                dialogVisible: false,
       cool:{
         id:"01111",          
          name: '小汽车零件的装配',
          type: '零件装配制造',
          endtime: '2019-10-17',
          detail: '人生路上，总会有那么几场疾风骤雨，就像是老天爷在提醒世人，你们是在寄人篱下，要乖乖低头。比如陈平安在泥瓶巷自家门口遇上了个蔡金简，在蛟龙沟遇上法袍金醴的原先主人，误入藕花深处，就迎来了一场宗师联手的围剿。就看熬不熬得过去了。熬过去，雨后天晴，熬不过去，最多也就只能像武夫那般，嚷着十八年后还是条好汉。',
          leader:'陈平安',
          designState:'设计完成',
          remakeState:'评价完成',
          completionState:'已完成',
          begintime:'2020-1-16',
          taskState:'完成',
          deadline:'2019-12-18'
       },
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
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "大连冰山集团有限公司",
          money: 7000,
          state: "成功",
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


               tenderTrendsList:[
        { column_name: "黄河远上白云间" },
        { column_name: "九曲黄河万里沙" },
        { column_name: "君不见黄河之水天上来"},
        { column_name: "白日依山尽，黄河入海流"},
        { column_name: "黄河落天走东海，万里尘沙入胸怀"},
        { column_name: "明月隐高树，长河没晓天"},
        { column_name :"萧萧远树疏林外，一半秋山带夕阳。"},
        { column_name: "黄河西来决昆仑，咆哮万里触龙门"}
         ],
        multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
      }
    },
        created() {
    this.getData();
  },
    methods:{
      /*
      *转跳对应任务信息页面
      */
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

     mainStaskDetail(){
         this.$router.push('/admin/mainStaskDetail')
     },
     goBack() {
        
        this.$router.push('/admin/mainStaskShow');
      
      }
  }
}
</script>

<style>
.table{
  font-size: 16px
}

</style>