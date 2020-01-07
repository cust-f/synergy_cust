// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import './assets/icon/iconfont.css'
import './assets/icon/iconfont'
import './assets/css/icon.css'

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import './Layout/components/common/Admin/directives';
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios //改变原型链
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/login');
    } else {
        next();
        // // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        // if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
        //     Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        //         confirmButtonText: '确定'
        //     });
        // } else {
        //     next();
        // }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
