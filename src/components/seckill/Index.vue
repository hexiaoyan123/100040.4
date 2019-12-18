<template>
  <div class="ac-cont">
    <div class="ac-cont-in">
      <!-- Banner图 -->
      <figure class="img-cont">
        <img v-if="$init.seckill.banner" :src="$init.seckill.banner" />
      </figure>

      <div class="info">
        <div class="info-left">
          <div class="meany">
            <span class="now">
              <small>￥</small>
              {{seckill.seckillPrice | priceFormat}}
            </span>
          </div>
        </div>
        <div class="info-right">
          <div class="info-btn btn1" v-show="!isRunSeckill">未开始</div>
          <div class="info-btn btn2" v-show="isRunSeckill" @click="checkSeckill">立即抢票</div>
        </div>
      </div>

      <!-- 活动说明 -->
      <figure class="img-cont">
        <img v-if="$init.seckill.info" :src="$init.seckill.info" />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 秒杀
      seckill: {},

      // 执行秒杀
      isRunSeckill: false,

      // 秒杀时间
      seckillTime: {
        // 当前时间戳
        currentTimestamp: 0,
        // 活动开始时间
        seckillStartTime: 0,
        // 活动结束时间
        seckillEndTime: 0,
        // 活动开始日期
        seckillStartDate: 0,
        // 活动结束日期
        seckillEndDate: 0
      }
    };
  },
  created() {
    // 获取秒杀
    this.getSeckill();
  },
  methods: {
    // 获取秒杀
    getSeckill() {
      let vm = this;
      vm.$store.commit("ctrlLoader", true);
      vm.$http
        .get("/panda-activity-seckill/v1/getSeckill/" + vm.$init.seckill.id)
        .then(function(response) {
          vm.$store.commit("ctrlLoader", false);

          if (response.data.code == "1000") {
            if (response.data.result) {
              vm.seckill = response.data.result;
              vm.initTime();
            }
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    },

    // 初始化
    initTime() {
      let vm = this;

      // 当前时间戳
      vm.seckillTime.currentTimestamp = vm.getTimestamp();
      // 活动开始时间
      vm.seckillTime.seckillStartTime = vm.getMillisecond(
        vm.seckill.seckillStartTime
      );
      // 活动开始时间
      vm.seckillTime.seckillEndTime = vm.getMillisecond(
        vm.seckill.seckillEndTime
      );
      // 活动开始日期
      vm.seckillTime.seckillStartDate = vm.getTimestamp(
        vm.seckill.seckillStartDate
      );
      // 获取结束日期
      vm.seckillTime.seckillEndDate = vm.getTimestamp(
        vm.seckill.seckillEndDate
      );

      // 倒计时
      setInterval(() => {
        vm.seckillTime.currentTimestamp = vm.getTimestamp();
        if (
          vm.seckillTime.currentTimestamp >= vm.seckillTime.seckillStartDate &&
          vm.seckillTime.currentTimestamp <= vm.seckillTime.seckillEndDate
        ) {
          vm.calculateSeckillTime();
        } else {
          vm.isRunSeckill = false;
        }
      }, 1000);
    },

    // 获取时间的毫秒
    getMillisecond(val) {
      let num = 0;
      val.split(":").map((e, i) => {
        if (i == 0) {
          num += (e - 0) * 60 * 60 * 1000;
        } else if (i == 1) {
          num += (e - 0) * 60 * 1000;
        } else if (i == 2) {
          num += (e - 0) * 1000;
        }
      });
      return num;
    },

    // 获取时间戳
    getTimestamp(val) {
      if (val) {
        if (val.indexOf("-") >= 0) {
          let newTime = val.split("-").join("/");
          return new Date(newTime).getTime();
        } else {
          return new Date(val).getTime();
        }
      } else {
        return new Date().getTime();
      }
    },

    // 计算出本周的活动时间段
    calculateSeckillTime() {
      let vm = this;

      // 本周活动时间
      let seckillList = [];
      // 现在时间
      let nowDay = new Date();
      // 今天周几
      let day = new Date().getDay() || 7;
      let isRunSeckill = false;

      vm.seckill.seckillWeek.split(",").map((e, i) => {
        let day0 = new Date(
          nowDay.getFullYear(),
          nowDay.getMonth(),
          nowDay.getDate() + (e - 0) - day
        ).getTime();

        let obj = {
          start: day0 + vm.seckillTime.seckillStartTime,
          end: day0 + vm.seckillTime.seckillEndTime
        };

        if (
          obj.start <= vm.seckillTime.currentTimestamp &&
          vm.seckillTime.currentTimestamp <= obj.end
        ) {
          isRunSeckill = true;
        }
        seckillList.push(obj);
      });

      if (vm.isRunSeckill != isRunSeckill) {
        vm.isRunSeckill = isRunSeckill;
      }
    },

    // 验证秒杀
    checkSeckill() {
      let vm = this;
      vm.$store.commit("ctrlLoader", true);
      vm.$http
        .get("/panda-activity-seckill/v1/checkSeckill/" + vm.seckill.id)
        .then(function(response) {
          vm.$store.commit("ctrlLoader", false);
          if (response.data.code == "1000") {
            vm.$router.push(
              "/seckill/placeOrder?seckillPrice=" +
                vm.seckill.seckillPrice +
                "&flag=" +
                response.data.result
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
    priceFormat(value) {
      if (value) {
        return value / 100;
      } else if (value === 0) {
        return "0";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.ac-cont {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 88px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.ac-cont-in {
  min-height: 101%;
}
.img-cont {
  display: block;
  width: 100%;
}
.img-cont img {
  display: block;
  width: 100%;
}
.info {
  padding: 60px 78px;
  display: flex;
}
.info-left {
  flex: 10;
}
.info-btn {
  width: 230px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 8px;
  font-size: 28px;
}
.btn1 {
  color: #d8d8d8;
  background-color: #f0f0f0;
}
.btn2 {
  color: #fff;
  background: -webkit-linear-gradient(left, #ffa262, #ff3666);
  background: -o-linear-gradient(left, #ffa262, #ff3666);
  background: -moz-linear-gradient(left, #ffa262, #ff3666);
  background: -ms-linear-gradient(left, #ffa262, #ff3666);
  background: linear-gradient(to right, #ffa262 0%, #ff3666 100%);
}
.info-right {
  /* padding-top: 20px; */
}
.meany {
  line-height: 70px;
}
.meany .now {
  font-size: 60px;
  color: #de4548;
}
.meany .now small {
  font-size: 33px;
}
.meany del {
  font-size: 33px;
  color: #d8d8d8;
}
.nums {
  line-height: 38px;
  font-size: 24px;
}
.nums span {
  color: #de4548;
}
.opne-btn-cont {
  width: 100%;
  background-color: #e3007f;
  box-sizing: border-box;
  height: 140px;
  padding-top: 30px;
}
.opne-btn {
  display: block;
  margin: 0 auto;
  /* background: url(../../assets/open-btn.png) no-repeat; */
  background-size: 100% 100%;
  height: 84px;
  width: 322px;
}
</style>