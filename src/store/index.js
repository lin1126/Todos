import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    eventIndex: 5,
    viewKey: 'all',
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
          return
        }
      }
    },
    // 更新复选框状态
    updateStatus(state, param) {
      for (const item in state.list) {
        if (state.list[item].id == param.id) {
          state.list[item].done = param.status
          console.log(param)
          return
        }
      }
    },
    // 清除已完成
    clearEvent(state) {
      state.list = state.list.filter((x) => x.done == false)
    },
    // 更改当前选中按钮
    selectBtn(state, val) {
      state.viewKey = val
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
  getters: {
    // 返回未完成事件的条数
    comNum(state) {
      return state.list.filter((x) => {
        return x.done == false
      }).length
    },
    // 更改当前选中按钮时,改变相应的数据
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter((x) => x.done == false)
      } else if (state.viewKey === 'done') {
        return state.list.filter((x) => x.done == true)
      }
    },
  },
  modules: {},
})
