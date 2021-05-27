<template>

  <div style="height:820px;padding:20px;">
      <el-row
        :gutter="20"
        style="font:size:14px;margin-top:10px;margin-left:10px;margin-bottom:10px"
      >
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>资源服务</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    <iframe
      id="zjuIframe"
      ref="zjuIframe"
      :src="url"
      width="100%"
      height="100%"
      frameborder="no"
      style="border: 1px solid #eee"
    />
  </div>
</template>
<script>

export default {
  name: 'ZjuEngine',
  data() {
    return {
      url: 'http://101.132.153.135/hachang'
    }
  },
  mounted() {
    // 通过postMessage()将流程id传给iframe组件
    const userInfo = {
      user_id: '223', // 哈长用户id
      user_name: 'test_user', // 哈长用户名
      user_phone: '10086', // 用户联系电话，可选
      company_id: '2', // 哈长用户所在企业id
      company_name: 'test_company' // 哈长用户所在企业
    }
    this.postMessage(userInfo)
  },
  methods: {
    /**
     * 向子程序发送数据
     * @returns {Promise<void>}
     */
    async postMessage(params) {
      const mapFrame = this.$refs['zjuIframe']
      if (mapFrame.attachEvent) { // 兼容浏览器判断
        mapFrame.attachEvent('onload', function() {
          const iframeWin = mapFrame.contentWindow
          iframeWin.postMessage(JSON.stringify(params), this.url)
          // data传递的参数   *写成子页面的域名或者是ip
        })
      } else {
        mapFrame.onload = function() {
          const iframeWin = mapFrame.contentWindow
          iframeWin.postMessage(JSON.stringify(params), this.url)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
