<template>
  <el-row :gutter="12">
    <el-col :span="20" push="2" pull="2">
      <el-col :span="20">
          <div class="cardgroup">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
            <div class="inline">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>
            <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
            <div class="design">行业分类：交通运输设备</div>
            <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
            <div class="inline">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>
            <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
            <div class="design">行业分类：交通运输设备</div>
            <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
            <div class="inline">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>
            <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
            <div class="design">行业分类：交通运输设备</div>
            <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
            <div class="inline">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>
            <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
            <div class="design">行业分类：交通运输设备</div>
            <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
            <div class="inline">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>
            <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
            <div class="design">行业分类：交通运输设备</div>
            <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
            <div class="inline">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>
            <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
            <div class="design">行业分类：交通运输设备</div>
            <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
          </el-card>
        </el-col>
      </div></el-col>
      <el-col :span="4">
      <div class="hotCompany">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </el-card>
      </div></el-col>
    
    </el-col>

  </el-row>
</template>
<script>
export default {
  name: "excellentCompany"
};
</script>
<style>

.image {
  width: 80%;
  /* height: 110px; */
}

.inline {
  width: 50%;
  float: left;
}
.designbutten {
  position: relative;
  top: 40px;
  float: left;
}
.design {
  position: relative;
  top: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
}
.title {
  position: relative;
  top: 20px;
  float: top, left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  color: dodgerblue;
}
.hotCompany {
}
</style>
