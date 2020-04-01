<template>
  <div>
    <!--查询-->
    <div class="searchAll">
      <div class="clearfix  check-add-del">
        <!--分类滑块-->
        <div class="left clearfix">
          <div class="check left">
            <span class="check-add-del-span">班级</span>
            <el-cascader
              expand-trigger="hover"
              :options="gradeUnitData"
              v-model="positionArr"
              :props="defaultProps"
              @change="gradeUnitChange">
            </el-cascader>
          </div>
          <el-button @click="onSearch" style="margin-left: 20px"  class="left" type="primary" icon="el-icon-search">查询</el-button>
        </div>
        <span class="wuchaxun bns left">{{belongName}}</span>
        <div class="right">
        <span>
          <el-button  v-show="!timeShow"  @click="saveBtn" type="primary">保存</el-button>
          <el-button  v-show="!timeShow"  @click="quitBtn" type="primary">取消</el-button>
          <el-button  v-show="timeShow"  @click="editBtn" type="primary">编辑</el-button>
          <el-button v-show="timeShow" @click="delBtn" type="primary">删除</el-button>
        </span>
          <span style="margin-left: 10px">
          <el-popover
            placement="top"
            width="200"
            ref="importVisible">
            <p>只能以模板文件上传，否则服务器不识别！！</p>
            <div class="clearfix">
              <el-button size="mini" class="left" type="primary" @click="downloadBtn">下载模板</el-button>
              <el-upload
                class="right"
                action="#"
                :show-file-list="false"
                :before-upload="importBtn">
                <el-button type="success" size="mini">上传至服务器</el-button>
              </el-upload>
            </div>
          </el-popover>
          <el-button v-show="timeShow" v-popover:importVisible type="primary">导入</el-button>
        </span>
        </div>
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="timeData"
      stripe
      style="width: 100%">
      <el-table-column width="80" label="周" fixed="left" prop="label" align="center"></el-table-column>

      <el-table-column label="上午" align="center">
        <el-table-column
          width="118"
          v-for="(v,i) in titleData" :key="i"
           align="center">
          <template slot="header" slot-scope="">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
          </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div v-if="timeShow">
                {{scope.row[sbjectKey[i]]}}<br/>
                {{scope.row[teacherKey[i]]}}
            </div>
              <div v-else>
                <el-input
                  size="mini"
                  placeholder="科目"
                  suffix-icon="el-icon-date"
                  v-model="scope.row[sbjectKey[i]]">
                </el-input>
                <el-select
                  clearable
                  v-model="scope.row[teacherKey[i]]"
                  size="mini"
                  placeholder="任课老师">
                  <el-option
                    v-for="(val,ind) in teachers"
                    :key="ind"
                    :label="val.teacherName"
                    :value="val.id"></el-option>
                </el-select>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="下午" align="center">
        <el-table-column
          width="118"
          v-for="(v,i) in titleData" :key="i"
           align="center">
          <template slot="header" slot-scope="">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
          </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div v-if="timeShow">
                {{scope.row[sbjectKey[i]]}}<br/>
                {{scope.row[teacherKey[i]]}}
            </div>
              <div v-else>
                <el-input
                  size="mini"
                  placeholder="科目"
                  suffix-icon="el-icon-date"
                  v-model="scope.row[sbjectKey[i]]">
                </el-input>
                <el-select
                  clearable
                  v-model="scope.row[teacherKey[i]]"
                  size="mini"
                  placeholder="任课老师">
                  <el-option
                    v-for="(val,ind) in teachers"
                    :key="ind"
                    :label="val.teacherName"
                    :value="val.id"></el-option>
                </el-select>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="晚上" align="center">
        <el-table-column
          width="118"
          v-for="(v,i) in titleData" :key="i"
          align="center">
          <template slot="header" slot-scope="">
            <div class="tabletitle-timeline">
              第{{v.count}}节 <br/>
              {{v.startTime}}-{{v.endTime}}
          </div>
          </template>
          <template slot-scope="scope">
            <div >
              <div v-if="timeShow">
                {{scope.row[sbjectKey[i]]}}<br/>
                {{scope.row[teacherKey[i]]}}
            </div>
              <div v-else>
                <el-input
                  size="mini"
                  placeholder="科目"
                  suffix-icon="el-icon-date"
                  v-model="scope.row[sbjectKey[i]]">
                </el-input>
                <el-select
                  clearable
                  v-model="scope.row[teacherKey[i]]"
                  size="mini"
                  placeholder="任课老师">
                  <el-option
                    v-for="(val,ind) in teachers"
                    :key="ind"
                    :label="val.teacherName"
                    :value="val.id"></el-option>
                </el-select>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>


  export default {
     name: "mainStaskDetailbei",
    data() {
      return {
        pageButton:{},//权限按钮
        //查询
        gradeUnitData:[],//年级班级数据
        defaultProps: {value:'id'},//默认节点名与数据绑定
        positionArr:[],//级联选择值

        timeShow:true,//编辑表与展示表
        teachers:[],//全部教师

        sbjectKey:['oneS','twoS','threeS','fourS','fiveS','sixS','sevenS','eightS','nineS'],//科目key值
        teacherKey:['oneT','twoT','threeT','fourT','fiveT','sixT','sevenT','eightT','nineT'],//老师key值
        //每天的课表
        timeData:[
          {
            id:'1',
            label:'周一',
            oneS:'java教程1',
            oneT:'郑老师',
            twoS:'语文',
            twoT:'张老师',
            threeS:'心理辅导',
            threeT:'杨老师',
            fourS:'音乐',
            fourT:'巩老师',
            fiveS:'网络',
            fiveT:'征老师',
            sixS:'舞蹈',
            sixT:'程老师',
            sevenS:'ppt教程',
            sevenT:'翟老师',
            eightS:'职业规划',
            eightT:'郝老师',
            nineS:'就业指导',
            nineT:'曹老师'
          },
          {
            id:'2',
            label:'周二',
            oneS:'java教程2',
            oneT:'郑老师',
            twoS:'语文',
            twoT:'张老师',
            threeS:'心理辅导',
            threeT:'杨老师',
            fourS:'音乐',
            fourT:'巩老师',
            fiveS:'网络',
            fiveT:'征老师',
            sixS:'舞蹈',
            sixT:'程老师',
            sevenS:'ppt教程',
            sevenT:'翟老师',
            eightS:'职业规划',
            eightT:'郝老师',
            nineS:'就业指导',
            nineT:'曹老师'
          },
          {
            id:'3',
            label:'周三',
            oneS:'java教程3',
            oneT:'郑老师',
            twoS:'语文',
            twoT:'张老师',
            threeS:'心理辅导',
            threeT:'杨老师',
            fourS:'音乐',
            fourT:'巩老师',
            fiveS:'网络',
            fiveT:'征老师',
            sixS:'舞蹈',
            sixT:'程老师',
            sevenS:'ppt教程',
            sevenT:'翟老师',
            eightS:'职业规划',
            eightT:'郝老师',
            nineS:'就业指导',
            nineT:'曹老师'
          },
          {
            id:'4',
            label:'周四',
            oneS:'java教程',
            oneT:'郑老师',
            twoS:'语文',
            twoT:'张老师',
            threeS:'心理辅导',
            threeT:'杨老师',
            fourS:'音乐',
            fourT:'巩老师',
            fiveS:'网络',
            fiveT:'征老师',
            sixS:'舞蹈',
            sixT:'程老师',
            sevenS:'ppt教程',
            sevenT:'翟老师',
            eightS:'职业规划',
            eightT:'郝老师',
            nineS:'就业指导',
            nineT:'曹老师'
          },
          {
            id:'5',
            label:'周五',
            oneS:'java教程',
            oneT:'郑老师',
            twoS:'语文',
            twoT:'张老师',
            threeS:'心理辅导',
            threeT:'杨老师',
            fourS:'音乐',
            fourT:'巩老师',
            fiveS:'网络',
            fiveT:'征老师',
            sixS:'舞蹈',
            sixT:'程老师',
            sevenS:'ppt教程',
            sevenT:'翟老师',
            eightS:'职业规划',
            eightT:'郝老师',
            nineS:'就业指导',
            nineT:'曹老师'
          },
          {
            id:'',
            label:'周六',
          },
          {
            id:'',
            label:'周天',
          },
        ],
        belongName:'',//班级名
        belongId:"",//班级id
        belongType:"803",//803表示班级，教室804
        timeId:"",
        //课节数据---标题
        titleData:[
          {
            id:'1',
            count:1,
            label:'上午',
            startTime:'08:00',
            endTime:'08:30'
          },
          {
            id:'2',
            count:2,
            label:'上午',
            startTime:'09:00',
            endTime:'09:30'
          },
          {
            id:'3',
            count:3,
            label:'下午',
            startTime:'12:05',
            endTime:'12:35'
          },
          {
            id:'4',
            count:4,
            label:'下午',
            startTime:'14:00',
            endTime:'14:30'
          },
          {
            id:'5',
            count:5,
            label:'下午',
            startTime:'16:00',
            endTime:'16:30'
          },
          {
            id:'6',
            count:6,
            label:'下午',
            startTime:'17:00',
            endTime:'17:30'
          },
          {
            id:'7',
            count:7,
            label:'晚上',
            startTime:'19:00',
            endTime:'19:30'
          },
          {
            id:'8',
            count:8,
            label:'晚上',
            startTime:'20:00',
            endTime:'20:30'
          },
          {
            id:'9',
            count:9,
            label:'晚上',
            startTime:'21:00',
            endTime:'21:30'
          },
        ],
      }
    },
    mounted(){
      this.timetableLoad();
    },
    methods:{
      timetableLoad(){
        //根据path来找页面权限，按钮根据code来找对应的按钮权限
        let self = this;
        this.pageButton=auth.allButtons();
        auth.getButtons(this.$route.name).forEach(function (val) {
          self.pageButton[val.code]=true;
        });
        //全部教师
        requestServices.teacherAll().then((res) =>{
          this.teachers=res.resultData;
        });
        //获取年级班级级联
        requestServices.studentClass()
          .then((res)=>{
            this.gradeUnitData=res.resultData
          });
      },
      //年级班级级联
      gradeUnitChange(val){
        this.belongId=val[val.length-1];
        this.belongType='803'
      },
      //条件查询
      onSearch(){
        let self = this;
        if(this.belongId&&this.belongType){
          self.timeShow=true;
          self.getTimeTableFind();
        }else{
          this.$message.warning('请先选择班级')
        }
      },
      //获取课表
      getTimeTableFind(){},
      //保存
      saveBtn(){
        this.timeShow=true;
      },
      //取消
      quitBtn(){
        this.timeShow=true;
      },
      //编辑
      editBtn(){
        let self = this;
        if(this.belongId!==''&&this.belongType!==''){
          this.timeShow=false;
        }else{
          this.$message({type:'warning',message:'请先选择对应班级'})
        }
      },
      //删除课表
      delBtn(){
        this.$confirm('是否删除当前整张课表?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
          center: true
        }).then(() => {
          let self = this;
          if (this.timeId!==undefined&&this.timeId!=='') {
            requestServices.timeTableDelete({id:self.timeId}).then((res) =>{
              self.getTimeTableFind();//重新获取列表
            })
          }else{
            this.$message({type:'warning',message:'请先选择对应班级'})
          }
        });
      },
      //导入
      downloadBtn(){
        requestServices.timeTableDownload()
          .then((res)=>{
            let url = res.resultData;
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('id', 'downloadLink')
            link.setAttribute('download','模板.xls')
            document.body.appendChild(link)
            link.click()
            // 删除添加的a链接
            let objLink = document.getElementById('downloadLink')
            document.body.removeChild(objLink);
          })
      },
      importBtn(file) {
        if(!this.belongId){
          this.$message({type:'warning',message:'请先选择教室或者班级'})
          return false;
        }
        const isXls = file.type === 'application/vnd.ms-excel';
        const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        if(!isXls&&!isXlsx){
          this.$message('上传格式不正确，请确认上传文件后缀名为.xls或.xlsx')
          return false;
        }else{
          let importFd=new FormData();
          importFd.append('importFile',file)
          importFd.append('belongId',this.belongId)
          importFd.append('belongType',this.belongType)
          requestServices.timeTableImport(importFd)
            .then((res)=>{
              this.$message('文件已上传至服务器');
            })
        }
      },
    }
  }
</script>
<style>
  .tabletitle-timeline{
    line-height: 18px!important;
  }
</style>

