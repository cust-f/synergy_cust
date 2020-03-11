import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user: window.sessionStorage.getItem('user'),
    token: window.sessionStorage.getItem('token'),
    menuList: "",
    identity: "",
    taskId1:""
}

const mutations = {
    //将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
        state.token = data
        window.sessionStorage.setItem('token', data)
    },
    //获取用户名
    GET_USER: (state, data) => {
        //把用户名存起来
        state.user = data
        window.sessionStorage.setItem('user', data)
    },
    //登出
    LOGOUT: (state) => {
        state.token = null
        state.user = null
        window.sessionStorage.removeItem('token')
    },
    //存储菜单
    SET_List: (state, data) => {
        state.menuList = data
    },
    //标记身份
    SET_IDENTITY: (state, data) => {
        state.identity = data;
    },
    //储存任务ID
    SET_TASKID: (state, data) => {
        state.taskId1 = data
    },
}
const actions = {

}
export default new Vuex.Store({
    state,
    mutations,
    actions
})