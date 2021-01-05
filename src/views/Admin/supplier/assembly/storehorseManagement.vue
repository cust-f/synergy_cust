<!--流通清单组件-->
<template>
  <div class="storehorseManagement">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
      清单备货 
    </div>

    <br />
    <el-table
      :data="storehorseManagement"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
     
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column prop="taskName" label="需求名称"></el-table-column>

      <el-table-column
        prop="leadState"
        width="100"
        align="center"
        label="备货状态"
      >
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.leadState === 0"
            >待备货</el-tag
          >
          <el-tag type="success" v-else-if="scope.row.leadState === 1"
            >已备货</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="uploadCircuaterTime" label="清单上传时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.uploadCircuaterTime === 0"
            >暂未验收</el-span
          >
          <el-span v-else>{{
            scope.row.uploadCircuaterTime | formatDate
          }}</el-span>
        </template>
      </el-table-column>

      <el-table-column prop="leadTime" label="备货时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.leadTime === 0">暂未备货</el-span>
          <el-span v-else>{{ scope.row.leadTime | formatDate }}</el-span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button
            @click="showData(),showhorseData()"
            type="text"
            size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看弹窗的内容 -->
    <el-dialog
      :visible.sync="upCirculation"
      width="1000px"
      @click="handleClose"
    >
      <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        流通清单
      </div>
      <br />

      <div style="padding: 0 10px; border-left: 3px solid #4e58c5"></div>
      <br />
      <el-form ref="form" label-width="100px" class="box">
        <el-table
          ref="multipleTable"
          :data="
            tableData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
          "
        >
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
            prop="consignmentId"
          >
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物品名称"
            width="130"
          ></el-table-column>


         
          <el-table-column prop="leadState" label="备货状态" width="100">
            <template slot-scope="scope">
              <el-tag v-if="+scope.row.shortageQuantity >0 || scope.row.leadState===0" type="info"
                >待备货</el-tag
              >
              <el-tag v-else-if="+scope.row.shortageQuantity === 0 || scope.row.leadStata === 0"
                >已备货</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="productNumber"
            label="产品数量"
            width="80"
          ></el-table-column>
           <el-table-column
            prop="issuedQuantity"
            label="已发数量"
            width="80"
          ></el-table-column>
           <el-table-column
            prop="shortageQuantity"
            label="仍需数量"
            width="85"
          ></el-table-column>
          <el-table-column
            prop="productModel"
            label="产品规格"
            width="85"
          ></el-table-column>

           <el-table-column
            prop="consignmentTimeLatest"
            label="发货截至时间"
            width="160"
            ><template slot-scope="scope">
              <el-span>{{
                scope.row.consignmentTimeLatest | formatDate
              }}</el-span>
            </template></el-table-column
          >

          <el-table-column prop="leadTime" label="备货时间" width="160"
            ><template slot-scope="scope">
              <el-span>{{ scope.row.leadTime | formatDate }}</el-span>
            </template></el-table-column
          >
          
        </el-table>

        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next, sizes, total, jumper"
            :current-page="pageIndex1"
            :page-size="pageSize"
            :total="tableData.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-form>

      <!-- 分割 -->
       <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        库存列表
      </div>
      <br />
      <br/>
      <el-form ref="form" label-width="100px" class="box" >
        
        <el-table
          ref="multipleTable"
          :data="
            tableData2.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)"
        
        >          
          <el-table-column
            label="序号"
            width="80"
            align="center"
            prop="xuhao"
            type="index"
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物品名称"  
          >
         </el-table-column>
          <el-table-column
            prop="storeName"
            label="仓库名称"
          ></el-table-column>
          <el-table-column prop="productState" label="物品状态" >
            <template slot-scope="scope">
              <el-tag v-if="+scope.row.productState === 1" type="danger"
                >库存紧缺</el-tag
              >
              <el-tag v-else-if="+scope.row.productState === 2" type="success"
                >库存充足</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="reserve"
            label="库存"
          ></el-table-column>
          <el-table-column label="发货数量">
          <el-input-number size="small"
          slot-scope="scope" 
          v-model="tableData2[scope.$index].deliveringAmount" 
          :min="1"  
          label="描述文字">
          </el-input-number>
          </el-table-column>
          <el-table-column label="操作"  align="center" >
            <template slot-scope="scope">
            <el-button 
                @click="deliver(scope.row,scope.$index)"
                type="text"
                size="small">发货</el-button
              > 
               </template>
              </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next, sizes, total, jumper"
            :current-page="pageIndex1"
            :page-size="pageSize"
            :total="tableData2.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      submitDisable: false,
      text: true,
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
      fileType: 0,
      taskId: 0,
      yinCang: 1,
      userName: sessionStorage.getItem("ms_username"),
      storehorseManagement: [],
      taskName: "",
      uploadCircuaterTime: "",
      taskState: 0,
      fileHistoryMessage: [
        {
          publishingCompanyName: "123",
          fileType: "123",
        },
      ],
      upCirculation: false,
      //文件历史弹窗
      fileHistoryDia: false,
      addVisible3: false, //拒绝原因弹窗
      //文件列表
      fileList: [],
      //上传此时
      shangchuancishu: 0,
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      filePath: "",
      uploadTime: "",
      multipleSelection: [],
      tableData: [
        {
          consignmentId: "1000015",
          taskId: "1-1",
          productName: "华子",
          deliveryTime: "",
          consignmentTimeLatest: "2020.10.5",
          consignmentState: "",
          productNumber: "20",
          productModel: "很大很大",
          productPrice: "500",
          contactnumber: "18904402315",
          shippingaddress: "",
          totalPrice: "2500",
          consignmentNotes: "麻烦快点谢谢",
          checkox: "",
          refuseReason: "",
          leadTime: "",
          leadState: "",
          issuedQuantity:'',//已发数量
          shortageQuantity:'',//仍需数量
        },
      ],
       dis: '1',
      tableData2: [
        {
          beginTime: "2020.11.5",
          productState: "1",
          reserve: "100",
          price: "50",
          productName: "111",
          storeName: "太行仓库",
          xuhao:'',
          deliveringAmount:1,  //输入框的值
          stockId:'',
          isproductName:'匹配失败',
        },
      ],
      tableData3:[
        {
          beginTime: "2020.11.5",
          productState: "1",
          reserve: "100",
          price: "50",
          productName: "111",
          storeName: "太行仓库",
          xuhao:'',
          deliveringAmount:"",  //输入框的值
          stockId:'',
          isproductName:'匹配失败',
        },
      ],
      positiveInteger:'0', //输入框是否是正整数
      isitGreater:'0', //判断输入的数量是否超过库存、是否超过产品数量
      Data_checkox: [],
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      var _this = this;
      _this.data.push({
        checkox: _this.checkox,
      });
    },
    //获得信息
    getMsg(msg) {
      this.storehorseManagement = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },

    //把数据库表格中的内容显示到上面
    showData() {
      this.upCirculation = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findConsignmentByTaskId",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
          if (this.taskState == "完成") {
            this.submitDisable = true;
          }
        });
    },
    //显示仓库表格中的信息。判断物品名称是否与产品名称一致。
    showhorseData() {
      var that = this;
      var data = Qs.stringify({
      taskId: this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/showInventoryDetail",
          data: data,
        })
        .then((response) => {
          this.tableData3 = response.data.allData;
          if (this.taskState == "完成") {
            this.submitDisable = true;
          }
          this.showData();
          console.log(this.tableData2[0].productName+"...."+this.tableData[0].productName);
          for(var i=0;i<this.tableData3.length;i++){
            this.tableData3[i].isproductName=false;
          for(var j=0;j<this.tableData.length;j++){
              if(this.tableData3[i].productName==this.tableData[j].productName)
              {                     
                this.tableData3[i].isproductName=true;
                break;
              }
          }
        }
        var k=0;
        for(var i=0;i<this.tableData3.length;i++){
          if(this.tableData3[i].isproductName==true){
            this.tableData2[k]=this.tableData3[i];
            k=k+1;
          }
        }  
        });

    },

    //输入input框的限制问题
    BlurText(e){
      let boolen =new RegExp("^[1-9][0-9]*$").test(e.target.value)
      if(!boolen){
        this.$message.warning('请输入正整数')
        this.positiveInteger='0';
        e.target.value =''
      }
      else{
        this.positiveInteger='1';    
      }
    },
    // 判断输入的数量是否超过库存、是否超过产品数量
    judgeproductName(e,row){
      console.log("=============================" + e.target.value)
      this.isitGreater='0';
      for(var i=0;i<this.tableData.length;i++){
          if(row.productName == this.tableData[i].productName){
            console.log(i)
            console.log(e.target.value+"....."+this.tableData[i].productNumber+"....."+row.reserve);
            if(e.target.value<=this.tableData[i].productNumber && e.target.value<=row.reserve){
            console.log("ssssssssssss")
              this.isitGreater='1';
            }else {
              this.isitGreater='0';
              e.target.value =''
            }
          }
      }
    },
    //
    handleChange(value) {
        console.log(value);
      },
    //提交发货数量
    deliver(row,index){
     console.log(row.deliveringAmount+"....."+row.reserve+"...."+this.taskId);
      this.isitGreater='0';
      for(var i=0;i<this.tableData.length;i++){
         
          if(row.productName == this.tableData[i].productName){
                
            if(row.deliveringAmount<=this.tableData[i].shortageQuantity && row.deliveringAmount<=row.reserve){
              this.isitGreater='1';
     
            }else {
              this.isitGreater='0';
              row.deliveringAmount ='';
               console.log("ssss")
            }
          }
      }
      console.log(row.deliveringAmount+"....."+row.reserve+"...."+this.taskId);
    if(this.isitGreater==='0'||row.deliveringAmount==0){
          this.$notify.error({
          title: '错误',
          message: '您提交的发货数量有误'
        });
      }
      else if(row.deliveringAmount!=0){
         this.$confirm("确定发货吗？", "提示", {
         type: "warning",
         
      }
      
      )
      
      .then(() => {
        var that = this;
        var data = Qs.stringify({
          taskId: this.taskId,
          stockId: row.stockId,
          reserveCount:row.deliveringAmount,
          productName:row.productName,
        });
        that
          .axios({
            method: "post",
            url: "/api/addConsignment/updateInventoryCount",
            data: data,
          })
          .then((response) => {});
        this.$message({
          message: "审核通过",
          type: "success",
        });
        this.showData();
        this.upCirculation = false;
      });
      }
     
    },
   
    //拒绝原因弹出框
    open(row) {
      console.log(row.refuseReason);
      this.$alert(row.refuseReason, "拒绝原因", {
        confirmButtonText: "确定",
      });
    },
    checkboxT(row, index) {
      if (row.consignmentState == 0 || row.consignmentState == 3) {
        return true;
      } else {
        return false;
      }
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },
    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    handleClose() {
      debugger;
      console.log("1");
      if (this.upCirculation == false) {
        this.upCirculation = true;
      } else {
        this.upCirculation = false;
      }
    },
  },
};
</script>

<style lang="scss">
.storehorseManagement {
  .table {
    font-size: 13px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }

  .el-step__title.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
}
</style>