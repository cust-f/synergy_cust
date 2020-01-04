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
             <el-button @click="addstaff" type="success" plain>新增人员</el-button>
            <el-table style="width: 100%" border :data="tableData">
  <template v-for="(item,index) in tableHead">
    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>

  </template>      
  <el-table-column label="操作" min-width="100px" align="center">
       <template >
          <el-button  type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">删除</el-button>
       </template>
    </el-table-column>
</el-table>

<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">         
			<el-form :inline="true" :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="姓名" prop="realname">
					<el-input v-model="addForm.realname" auto-complete="off"></el-input>
				</el-form-item>
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="登录名" prop="">	
					<el-input v-model="addForm.loginname" auto-complete="off"></el-input>
				</el-form-item>
        	<el-form-item label="登录密码" prop="password">
					<el-input v-model="addForm.password" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="部门" prop="role">	 
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-form-item label="手机" prop="mobile">	
					<el-input v-model="addForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="邮件" prop="email">	
					<el-input v-model="addForm.email" auto-complete="off"></el-input>
				</el-form-item>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
         
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取消</el-button>
				<el-button type="primary" >提交</el-button>
			</div>
		</el-dialog>



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
  name: "newStaff",
  data() {
    return {
        addFormVisible:false,
        tableHead:[
            {
                column_name:"user_id",column_comment:"用户账号"
            },
            {
                column_name:"user_name",column_comment:"账号名称"
            },
            {
                column_name:"real_name",column_comment:"真实姓名"
            },
            {
                column_name:"role",column_comment:"部门"
            },
            {
                column_name:"email",column_comment:"邮箱"
            },
            {
                column_name:"phone",column_comment:"电话"
            }
        ],
        tableData:[{
            user_id:'0001',
            user_name:'john',
            real_name:'john',
            role:'1',
            email:'123456@qq.com',
            phone:'123456'
        },
        {
            user_id:'0002',
            user_name:'mary',
            real_name:'mary',
            role:'2',
            email:'123456@qq.com',
            phone:'123456'
        },
        {
            user_id:'0003',
            user_name:'lucy',
            real_name:'lucy',
            role:'3',
            email:'123456@qq.com',
            phone:'123456'
        }],
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
         addForm:{
             realname:'',
             loginname:"",
             password:"",
             realName:"",
             email:"",
             mobile:"",
             role:''
             }
    };
  },
  methods:{
      
      /*
      *转跳对应任务信息页面
      */
    
     addstaff:function()
     {
         this.addFormVisible=true;

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
