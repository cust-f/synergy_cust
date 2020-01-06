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
           <br>
              <div>             
<!-- 卡片-->
<div class="center">
    <el-row>
        <el-col :span="8" :key="o" :offset="index > 0 ? 5 : 3">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../../../assets/images/supplieAccept/design.png" class="image">
                <div style="padding: 16px;">
                    <div class="center">
                    <div class="bottom clearfix">
                        <el-button type="text" class="betten">设计任务</el-button>
                    </div>
                    </div>
                </div>
        </el-card>
        </el-col>
        <el-col :span="8" :key="o" :offset="index > 0 ? 5 : 3">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../../../assets/images/supplieAccept/circulation.png" class="image">
                <div style="padding: 16px;">
                    <div class="bottom clearfix">
                        <el-button type="text" class="betten">流通任务</el-button>
                    </div>
                </div>
        </el-card>
        </el-col>
    </el-row>
    </div>
  </div>
        </el-main>
    </el-container>
     

</div>
      
</template>

<script>
export default {
  name: "supplierAccept",
  data() {
    return {
        query: {
        pageIndex: 1,
        pageSize: 10
        },
       
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
    // 分页导航
    handlePageChange(val) {},
     substaskDetail(){
         this.$router.push('/supplierAcceptTask')
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
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .betten {
      font-size:x-large
  }
  .clearfix:after {
      clear: both
  }
  .center {
      text-align: center
  }

</style>
