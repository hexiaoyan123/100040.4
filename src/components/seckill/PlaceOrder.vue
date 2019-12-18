<template>
  <div class="container">
    <div class="top">
      <div class="top-in">
        <div class="top-info">
          <div class="top-info-name">{{$init.seckill.name}}</div>
        </div>
        <div class="top-b">
          <div class="top-info-title">选择数量：</div>
          <div class="top-b-in">
            <div class="top-b-left">
              <div class="top-nums">
                <span class="top-nums-1" @click="reduceNum">-</span>
                <span class="top-nums-2">{{form.quantity}}</span>
                <span class="top-nums-3" @click="addNum">+</span>
              </div>
            </div>
            <div class="top-b-right">
              <span>总金额：</span>
              <em>¥ {{totalPrice | priceFormat}}</em>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cf_foDown">
      <div class="cf_foDownT on">
        <span class="cf_e00373">1.购买活动票成功后，请在电影上映时兑换影票，兑换方式以活动页面说明为准；</span>
      </div>
      <div class="cf_foDownT on">
        <span class="cf_e00373">2.请在10分钟内完成支付，超时系统将释放此订单。</span>
      </div>
    </div>
    <div>
      <div class="bnt" @click="saveOrder">确认订单</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总金额
      totalPrice: this.$route.query.seckillPrice,

      form: {
        seckillId: this.$init.seckill.id,
        flag: this.$route.query.flag,
        quantity: 1
      }
    };
  },
  created() {},
  methods: {
    // 增加数量
    addNum() {
      if (this.form.quantity < this.$init.seckill.maximum) {
        this.form.quantity += this.$init.seckill.stepSize;
        this.totalPrice = this.form.quantity * this.$route.query.seckillPrice;
      }
    },

    // 减少数量
    reduceNum() {
      if (this.form.quantity > this.$init.seckill.minimum) {
        this.form.quantity -= this.$init.seckill.stepSize;
        this.totalPrice = this.form.quantity * this.$route.query.seckillPrice;
      }
    },

    // 保存订单
    saveOrder() {
      let vm = this;
      vm.$store.commit("ctrlLoader", true);
      vm.$http
        .post("/panda-activity-seckill/v1/saveOrder", vm.form)
        .then(function(response) {
          vm.$store.commit("ctrlLoader", false);

          if (response.data.code == "1000") {
            vm.$router.push(
              "/seckill/confirmOrder?orderId=" + response.data.result
            );
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    }
  },
  filters: {
    // 价格格式化
    priceFormat(val) {
      if (val) {
        return val / 100;
      } else if (val === 0) {
        return "0";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #eee;
}
.top {
  padding: 30px 30px 80px 30px;
  background: url(../../assets/seckill/bg.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 24px;
}
.top-t {
  border-bottom: 1px solid #fff;
  line-height: 100px;
  display: flex;
}
.top-t-left {
  flex: 10;
  font-size: 48px;
}
.top-t-right {
  font-size: 30px;
}
.top-info {
  border-bottom: 1px solid #fff;
  line-height: 48px;
  padding: 20px 0;
}
.top-info-name {
  font-size: 30px;
}
.top-b {
  padding: 20px 0;
}
.top-b-in {
  line-height: 58px;
}
.top-b-in {
  display: flex;
}
.top-b-left {
  flex: 10;
  margin-top: 10px;
}
.top-nums {
  display: inline-block;
  border: 1px solid #fff;
  border-radius: 8px;
  text-align: center;
}
.top-nums-1 {
  display: inline-block;
  width: 50px;
  border-right: 1px solid #fff;
  font-size: 30px;
}
.top-nums-2 {
  display: inline-block;
  width: 80px;
}
.top-nums-3 {
  display: inline-block;
  border-left: 1px solid #fff;
  width: 50px;
  font-size: 30px;
}
.top-b-right {
  line-height: 60px;
}
.top-b-right em {
  color: #eee93a;
  font-size: 38px;
}
.cf_foDown {
  padding: 50px 50px 50px 50px;
  font-size: 26px;
}
.cf_foDown > div {
  text-indent: 40px;
  line-height: 48px;
  /* background: url(../../assets/ac/diandian.png) no-repeat; */
  background-size: 15px 15px;
  background-position: 0 13px;
  margin-top: 30px;
}
.bnt {
  width: 500px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  background-color: #e00373;
}
</style>