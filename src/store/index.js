import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    eventIndex: 5,
  },
  mutations: {
    // 初始化数组
    initList(state, data) {
      state.list = data
    },
    // 改变输入框的值的时候改变vuex中的表单值
    changeInputValue(state, value) {
      state.inputValue = value
    },
    // 添加事件
    addEvent(state) {
      const obj = {
        id: state.eventIndex,
        info: state.inputValue,
        done: false,
      }
      state.list.push(obj)
      state.eventIndex++
      state.inputValue = ''
    },
    // 删除事件
    delEvent(state, id) {
      for (const item in state.list) {
        if (state.list[item].id == id) {
          state.list.splice(item, 1)
        }
      }
    },
  },
  actions: {
    // 获取json文件中的数据（异步）
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    },
  },
  modules: {},
})
