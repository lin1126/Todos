<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="changeHander" />
    <a-button type="primary" @click="addEventHander">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox>{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delEventHander(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>0条剩余</span>
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['changeInputValue', 'addEvent', 'delEvent']),
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
  },
  computed: {
    ...mapState(['list', 'inputValue']),
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
