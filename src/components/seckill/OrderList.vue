<template>
  <div class="movie-conter">
    <!-- 瀑布流滚动加载 -->
    <van-list v-model="falls.loading" :finished="falls.finished" @load="fallsOnLoad">
      <div class="order-list-item">
        <order-list-item
          v-for="(item, index) in list"
          :key="index"
          :obj="item"
          @refreshList="getOrder"
        ></order-list-item>
        <div class="noData" v-show="list.length == 0 && ! falls.loading">暂无数据</div>
        <div class="noData" v-show="list.length > 0 && falls.finished">到底了！</div>
      </div>
    </van-list>
  </div>
</template>

<script>
import OrderListItem from "./OrderListItem";
export default {
  name: "OrderList",
  components: {
    "order-list-item": OrderListItem
  },
  props: ["dataStatu"],
  data() {
    return {
      list: [],
      pageNum: 1,
      // 瀑布流
      falls: {
        // 加载中
        loading: true,
        // 结束调用
        finished: false
      }
    };
  },
  created() {
    this.getOrder(true);
  },
  methods: {
    // 瀑布流加载数据
    fallsOnLoad() {
      this.getOrder();
    },

    // 获得订单列表
    getOrder(clear) {
      // 页码处理
      if (clear) {
        this.list = [];
        this.pageNum = 1;
        this.falls.finished = false;
      } else {
        this.pageNum += 1;
      }
      let vm = this;
      let postData = {
        dataStatus: this.dataStatu
      };
      postData.pageNo = this.pageNum;
      postData.pageSize = 20;
      this.$http
        .post("/panda-activity-seckill/v1/pageOrder", postData)
        .then(function(response) {
          if (response.data.code == "1000") {
            if (response.data.result && response.data.result.length > 0) {
              vm.list = vm.list.concat(response.data.result);
              vm.$nextTick(() => {
                vm.falls.loading = false;
              });
            } else {
              vm.falls.loading = false;
              vm.falls.finished = true;
            }
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    }
  }
};
</script>

<style scoped>
.order-list-item {
  padding: 20px;
}
.movie-conter {
  height: 100%;
  overflow: auto;
}
</style>

