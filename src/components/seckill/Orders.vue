<template>
  <div class="goods-list-out-cont order-list">
    <van-tabs v-model="dataStatu">
      <van-tab v-for="(item, index) in dataStatus" :key="item.id" :title="item.name">
        <order-list v-if="dataStatu == index" :dataStatu="item.id"></order-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import OrderList from "./OrderList";
export default {
  name: "Orders",
  components: {
    "order-list": OrderList
  },
  data() {
    return {
      // 状态
      dataStatu: 0,

      // 1：待支付；2：已支付；3：已发送；4：已取消
      dataStatus: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "待支付"
        },
        {
          id: 2,
          name: "已支付"
        },
        {
          id: 3,
          name: "已发送"
        },
        {
          id: 4,
          name: "已取消"
        }
      ]
    };
  },
  created() {
    if (this.$route.query.type) {
      this.dataStatu = this.$route.query.type - 0;
    } else {
      this.dataStatu = "";
    }
  },
  methods: {},
  watch: {
    "$route.query"() {
      if (this.$route.query.type) {
        this.dataStatu = this.$route.query.type - 0;
      } else {
        this.dataStatu = "";
      }
    }
  }
};
</script>

<style scoped>
/* 商品列表 */
.goods-list-out-cont {
  /* margin-top: 20px; */
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  background-color: #f8f8f8;
}
</style>
<style>
.order-list .van-tabs {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.order-list .van-tabs__content {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.order-list .van-tab__pane {
  height: auto;
}
</style>
