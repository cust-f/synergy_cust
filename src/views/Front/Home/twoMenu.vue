<template>
  <div class="BG">
    <!--第一行 -->
    <el-row :gutter="gutterCount">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="grid-content0">
          <el-breadcrumb separator=">" class="fontStyle">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/twoMenu' }">服务成果</el-breadcrumb-item>
            <el-breadcrumb-item >成果详情</el-breadcrumb-item>
          
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>

    <div width="500" class="color1">
      <!--第二行  本月需求信息统计-->
      <el-row :gutter="gutterCount" class="color1">
        <el-col :span="20" :push="pushCount" :pull="pullCount">
          
            <div  class = "biaoti" style="font-size:20px padding: 0 10px; border-left: 3px solid #4e58c5;">&nbsp;&nbsp;服务成果</div>
          
        </el-col>
      </el-row>
    </div>
  <el-row>
   <div class="color1">
      <el-col :span="4" :push="pushCount" :pull="pullCount">
        <div class = "color1">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
              <template slot="title" align="center">&nbsp;&nbsp;&nbsp;&nbsp;完成时间</template>
              <el-radio v-model="radio" label="1"  @click.native="getData()">&nbsp;&nbsp;不限</el-radio>
              <br />
              <el-radio v-model="radio" label="2" @click.native="clickitem1">&nbsp;&nbsp;近一周</el-radio>
              <br />
              <el-radio
                v-model="radio"
                label="3"
                @click.native="clickitem2"
              >&nbsp;&nbsp;近一个月</el-radio>
              <br />
              <el-radio v-model="radio" label="4" @click.native="clickitem3">&nbsp;&nbsp;近一年</el-radio>
            </el-collapse-item>

            <el-collapse-item name="2">
              <template slot="title" align="center">&nbsp;&nbsp;&nbsp;&nbsp;需求类别</template>
              <el-radio v-model="radio0" label="4"  @click.native="getData()">&nbsp;&nbsp;不限</el-radio>
              <br />
              <el-radio
                v-model="radio0"
                label="5"
                @click.native="clickitem4(2)"
              >&nbsp;&nbsp;交通运输设备</el-radio>
              <br />
              <el-radio
                v-model="radio0"
                label="6"
                @click.native="clickitem4(3)"
              >&nbsp;&nbsp;仪器仪表及文化</el-radio>
              <br />
              <el-radio
                v-model="radio0"
                label="7"
                @click.native="clickitem4(4)"
              >&nbsp;&nbsp;通信设备</el-radio>
              <br />
              <el-radio
                v-model="radio0"
                label="8"
                @click.native="clickitem4(5)"
              >&nbsp;&nbsp;电气机械及器材</el-radio>
              <br />
              <el-radio
                v-model="radio0"
                label="9"
                @click.native="clickitem4(6)"
              >&nbsp;&nbsp;专用设备</el-radio>
              <br />
              <el-radio
                v-model="radio0"
                label="10"
                @click.native="clickitem4(7)"
              >&nbsp;&nbsp;通用设备</el-radio>
            </el-collapse-item>

            <el-collapse-item name="3">
              <template slot="title" align="center">&nbsp;&nbsp;&nbsp;&nbsp;需求方</template>
              <div class="handle-box">
                <el-input v-model="search" placeholder="请输入需求方名称"></el-input>
                <br>
                <el-button type="primary" @click="handleSearch" >搜索</el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
     </div>
     <div class = "color1">
      <el-col :span="20" :push="pushCount" :pull="pullCount">
        <div class="grid-content5">
          <el-table :data="tableData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)" 
          style="width: 100%">
            <el-table-column label="序号" type="index" align="center"></el-table-column>

            <el-table-column prop="mainTaskName" label="需求名称" align="center"></el-table-column>

            <el-table-column prop="taskCategoryMainId" label="需求类别" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.taskCategoryMainId === 2">交通运输设备</span>
                <span v-else-if="scope.row.taskCategoryMainId === 3">仪器仪表及文化</span>
                <span v-else-if="scope.row.taskCategoryMainId === 4">通信设备</span>
                <span v-else-if="scope.row.taskCategoryMainId === 5">电器机械及器材</span>
                <span v-else-if="scope.row.taskCategoryMainId === 6">专用设备</span>
                <span v-else-if="scope.row.taskCategoryMainId === 7">通用设备</span>
              </template>
            </el-table-column>

            <!-- <el-table-column prop="taskType" label="需求类型" align="center">
              <template slot-scope="scope">
              <span v-if="scope.row.taskType === 0">设计</span>
              <span v-else-if="scope.row.taskType === 1">流通</span>
              </template>
            </el-table-column> -->

            <el-table-column prop="companyName" label="需求方" align="center"></el-table-column>

            <!-- <el-table-column prop="acceptCompanyName" label="供应方" align="center"></el-table-column> -->

            <el-table-column prop="finishTime" label="完成时间" align="center">
              <template slot-scope="scope">{{scope.row.finishTime | formatDate}}</template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
              <el-button @click="remarkDetail(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next,total, jumper"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="tableData.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
        </div>
        
        
      </el-col></div>

    
    </el-row>
  </div>
</template>


<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
export default {
  name: "Home",
  data() {
    return {
      //默认激活的筛选框name
      activeNames: ["1","2","3"],
      //发布时间的单选框数值
      radio: "1",
      //任务类别的单选框数值
      radio0: "",
      //任务截至时间
      value: new Date(),
      taskId:"",
      search: "",
      //设定el-cow的值
      gutterCount: 20,
      pushCount: 3,
      pullCount: 3,
      pushCount0: 3,

      //第二行网站统计数据
      taskCountMonth: 233,

      //需求任务详细信息数组
      tableData: [
        {
          //完成时间
          finishTime: "",
          //行业类别
          taskCategoryMainId: "",
          //需求类型
          taskType: "",
          //企业
          companyName: "",
          //供应方
          acceptCompanyName: "",
          //需求名称
          taskName: "",

      
        },
       
      ],
       mainTaskID: "",
        pageIndex: 1,
        
        pageSize: 10,
        

    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    this.getData();
  },
  methods: {
    /*
     *转跳对应任务信息页面
     */ 
    
    recordTabletender() {},
    handleChange(val) {
      console.log(val);
    },
    getData() {
      var that = this;
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081//serviceResult/finishlist"
          //data: data
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },
    handleSearch() {
      console.log(this.search);
      var that = this;
      var data = Qs.stringify({
        companyName: this.search
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/serviceResult/searchCompanyName",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });

      //this.getData();
    },
    clickitem4(e) {
      e === this.radio0 ? (this.radio0 = "") : (this.radio0 = e);
      console.log(this.radio0);
      var that = this;
      var data = Qs.stringify({
        taskCategoryMainId: this.radio0
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/serviceResult/searchtaskCategoryMainId",
          data: data
          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },
    clickitem1() {
      var that = this;
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/serviceResult/finishlistinWeek"
          //data: data
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },
    clickitem2() {
      var that = this;
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/serviceResult/finishlistinMonth"
          //data: data
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },
    clickitem3() {
      var that = this;
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/serviceResult/finishlistinYear"
          //data: data
        })
        .then(response => {
          console.log(response);
          this.tableData = response.data.allData;
        });
    },
    remarkDetail(row) {
      console.log(row.mainTaskID);
      this.$router.push({
        path: "/service1",
        query: {
          mainTaskID: row.mainTaskID
        }
      });
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },

    handleSizeChange(psize) {
      this.pageSize = psize;
    },
  }
};
</script>



<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->
<!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线--><!--分割线-->



<style scoped>
/**中间的div块   给gutter留padding*/
.BG {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
  padding: 0 20px;
  background-color: #fff;
}

/**第一行用css样式*/
.grid-content0 {
  border-radius: 4px;
  height: 20px;
  margin-top: 10px;
   background-color: #fff;
}
/**第二行用css样式 网站访问统计数据块*/
.grid-content1 {
  border-radius: 4px;
  height: 50px;
  width: 100%;
  line-height: 50px;
  margin: 0 250px;
  background-color: #fff;
}
.grid-content2 {
  border-radius: 4px;
  height: 400px;
  background-color: #fff;
}
.grid-content3 {
  border-radius: 4px;
  height: 400px;
  background-color: #fff;
}
.grid-content4 {
  border-radius: 4px;
  height: 400px;
  background-color: #fff;
}
.grid-content5 {
  border-radius: 4px;
  /* //height: 400px; */
  width: 850px;
   background-color: #fff;
}
.block {
  /*margin: 0 180px;*/
  position: relative;
  left: 20%;
  background-color: #fff;
}

/**网站统计数据字体样式 */
/* .fontStyle0 {
  font-size: 14px;
  color: rgb(167, 165, 165);
} */
.fontStyle {
  font-size: 15px;
  color: orangered;
}

/**划分页面标识*/
.big_bt {
  width: 370px;
  margin: 0 auto;
  border-bottom: solid 3px #000;
  margin-bottom: 40px;
  background-color: #fff;
}
.big_bt a {
  display: block;
  font-size: 26px;
  color: #000;
  font-family: "微软雅黑";
  width: 180px;
  background: #fff;
  text-align: center;
  margin: 0 auto;
  position: relative;
  top: 18px;
  background-color: #fff;
}

/**布局测试用css*/
.el-row {
  margin-bottom: 10px;
  background-color: #fff;
}
.el-col {
  border-radius: 4px;
  background-color: #fff;

}
/* .bg-purple-dark {
  background: #99a9bf;
} */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background-color: #fff;
}

ul li {
  list-style: none;
  margin-bottom: 5px;
  overflow: hidden;
  background-color: #fff;
}
.some-show {
  white-space: nowrap; /* 规定段落中的文本不进行换行 */
  text-overflow: ellipsis; /*文字段在容器内超宽时，截断该文字段并且续以省略号*/
  overflow: hidden;
  background-color: #fff;
}
.tender-notice {
  border: 1px solid #d3d7d4;
  background-color: #fff;
}
.tender-header {
  padding: 15px;
  border-bottom: 1px solid #d3d7d4;
}
.tender-header span {
  font-size: 800;
  font-size: 18px;
  background-color: #fff;
}
/* .tender-header-some {
  padding: 20px;
  font-size: 15px;
  color: #a1a3a6;
} */
/* .tender-header-some ul li{
    margin-bottom: 15px;
} */
.handle-box {
  margin-bottom: 20px;
  background-color: #fff;
  margin: auto;
  text-align: center;
}
.color1 {
  background-color: #fff;
}
element.style {
    overflow: hidden;
    background-color: rgb(255, 255, 255);
}
.biaoti {
    font-size: 18px;
    color: #303133;
  }
</style>