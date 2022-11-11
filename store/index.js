import Vue from 'vue'
import Vuex from 'vuex'
import {
  logout
} from '@/api/auth'
import {
  getUserInfo,
  login,
  menurole
} from '@/api/user'
import {
  passwordLogin,
  smsLogin,
  weixinMiniAppLogin
} from '@/api/auth'
const AccessTokenKey = 'ACCESS_TOKEN'
const RefreshTokenKey = 'REFRESH_TOKEN'

Vue.use(Vuex) // vue的插件机制
// Vuex.Store 构造器选项
const store = new Vuex.Store({
  state: {
    accessToken: uni.getStorageSync(AccessTokenKey), // 访问令牌
    refreshToken: uni.getStorageSync(RefreshTokenKey), // 刷新令牌
    userInfo: {},
    count: 10,
    ruterLists: [],
    students: [{
        id: 1,
        name: 'zhangsan',
        age: 18
      },
      {
        id: 2,
        name: 'lisi',
        age: 20
      },
      {
        id: 3,
        name: 'xiaohua',
        age: 15
      },
      {
        id: 4,
        name: 'jinjin',
        age: 22
      }
    ],
  },
  getters: {
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken,
    userInfo: state => state.userInfo,
    hasLogin: state => !!state.accessToken,

    //求count的平方
    powerCount(state) {
      return state.count * state.count
    },
    //拿到age大于20的学生
    more20stu(state) {
      return state.students.filter(s => s.age > 20)
    },
    more20stu2: state => state.students.filter(s => s.age > 20),
    //拿到age大于20的学生的个数
    more20stuLen(state, getters) {
      return getters.more20stu.length
    },
    //拿到age大于用户传进来的age值的学生
    moreAgestu(state, getters) {
      return function(age) {
        return state.students.filter(s => s.age > age)
      }
    },
  },
  mutations: {
    // 更新 state 的通用方法
    SET_STATE_ATTR(state, param) {
      if (param instanceof Array) {
        for (let item of param) {
          state[item.key] = item.val
        }
      } else {
        state[param.key] = param.val
      }
    },
    // 更新令牌
    SET_TOKEN(state, data) {
      // 设置令牌
      const {
        accessToken,
        refreshToken
      } = data
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      uni.setStorageSync(AccessTokenKey, accessToken)
      uni.setStorageSync(RefreshTokenKey, refreshToken)

      // 加载用户信息
      this.dispatch('getRuters');
      // this.dispatch('ObtainUserInfo')
    },
    // 更新用户信息
    SET_USER_INFO(state, data) {
      state.userInfo = data
    },
    // 清空令牌 和 用户信息
    CLEAR_LOGIN_INFO(state) {
      uni.removeStorageSync(AccessTokenKey)
      uni.removeStorageSync(RefreshTokenKey)
      state.accessToken = ''
      state.refreshToken = ''
      state.userInfo = {}
    },
    update_ruters(state, lists) {
      state.ruterLists = lists;
    }
  },
  actions: {
    //账号登录
    Login({
      state,
      commit
    }, {
      type,
      data
    }) {
      if (type === 0) {
        return passwordLogin(data).then(res => {
          commit('SET_TOKEN', res.data)
        })
      } else if (type === 1) {
        return smsLogin(data).then(res => {
          commit('SET_TOKEN', res.data)
        })
      } else {
        return weixinMiniAppLogin(data).then(res => {
          commit('SET_TOKEN', res.data)
        })
      }
    },
    // 退出登录
    async Logout({
      state,
      commit
    }) {
      commit('CLEAR_LOGIN_INFO')
      await logout()
    },
    // 获得用户基本信息
    async ObtainUserInfo({
      state,
      commit
    }) {
      const res = await getUserInfo()
      commit('SET_USER_INFO', res.data)
    },
    //async异步
    async getTodos({
      commit
    }) {
      const result = await axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10');
      commit('updateState', result.data);
    },
    //Promise异步
    fetchTodos({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        fetch('http://jsonplaceholder.typicode.com/todos?_limit=5')
          .then(res => res.json())
          .then(data => {
            commit('setState', data)
            resolve(data)
          })
          .catch(err => reject(err)); //抛出错误回调
      });
    },
    doLogin({
      commit
    }, params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          commit('SET_TOKEN', {
            accessToken: res.token,
            refreshToken: ''
          })
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    async getRuters({
      commit
    }, params) {
      let temp=[];
      let res = await menurole({});
      if (res.code == 200) {
        commit('update_ruters', res.data)
      }
    }
  }
})
export default store
