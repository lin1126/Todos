<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="changeHander" />
    <a-button type="primary" @click="addEventHander">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @click="
            (e) => {
              statusHander(e, item.id)
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="delEventHander(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{ comNum }}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeKey('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeKey('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeKey('done')">已完成</a-button>
        </a-button-group>
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['changeInputValue', 'addEvent', 'delEvent', 'updateStatus', 'clearEvent', 'selectBtn']),
    // 输入框值改变时触发
    changeHander(e) {
      this.changeInputValue(e.target.value)
    },
    // 添加事件
    addEventHander() {
      this.addEvent()
    },
    // 删除事件
    delEventHander(id) {
      this.delEvent(id)
    },
    // 更新复选框的状态
    statusHander(e, id) {
      const param = {
        id: id,
        status: e.target.checked,
      }
      this.updateStatus(param)
    },
    // 清除已完成
    clear() {
      this.clearEvent()
    },
    // 更改按钮颜色
    changeKey(val) {
      this.selectBtn(val)
    },
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['comNum', 'infoList']),
  },
  mounted() {
    this.$store.dispatch('getList')
  },
}
</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
