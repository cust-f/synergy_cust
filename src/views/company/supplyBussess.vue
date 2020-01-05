<template>
<div>
    <el-container>
        <el-aside>
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
            <h3>供应商详情</h3>
             &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
             <el-table style="width: 100%" border :data="tableData" >
  <template v-for="(item,index) in tableHead">
    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>

  </template>      
  <el-table-column label="操作" min-width="100px" align="center">
       <template >
          <el-button @click="supplyDetail" type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">删除</el-button>
       </template>
    </el-table-column>
</el-table>

<div class="con">
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div>

        </el-main>
    </el-container>
    
    
</div>
      
</template>

<script>
export default {
  name: "supplyBussess",
  data() {
    return {
        tableHead:[
            {
                column_name:"company_ID",column_comment:"供应商ID"
            },
            {
                column_name:"dompany_Name",column_comment:"供应商名称"
            },
            {
                column_name:"Bussess_Name",column_comment:"业务联系人"
            },
            {
                column_name:"Bussess_Tel",column_comment:"业务联系电话"
            }
        ],
        tableData:[{
            company_ID:'B3001',
            dompany_Name:'天盛公司',
            Bussess_Name:'徐晟',
            Bussess_Tel:'0431-886888886',
            
        },
        {
            company_ID:'B3002',
            dompany_Name:'大鹏公司',
            Bussess_Name:'王大鹏',
            Bussess_Tel:'0431-95275746',
            Fixed_Assets:'3.2亿'
        },
        {
            company_ID:'B3003',
            dompany_Name:'熊猫公司',
            Bussess_Name:'王聪聪',
            Bussess_Tel:'0431-9532500746',
            Fixed_Assets:'60亿'
        },
                {
            company_ID:'B3004',
            dompany_Name:'远山集团',
            Bussess_Name:'李山',
            Bussess_Tel:'0431-95275746',
            Fixed_Assets:'312亿'
        },        {
            company_ID:'B3005',
            dompany_Name:'电子微孔集成公司',
            Bussess_Name:'许杨',
            Bussess_Tel:'0431-481123665',
            Fixed_Assets:'3.2亿'
        },],
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
    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
     supplyDetail(){
         this.$router.push('/supplyDetail')
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

</style>