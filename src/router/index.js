/* eslint-disable */

import Vue from "vue";
import Router from "vue-router";
import Init from "@/common/init";

// 公共业务
import Success from "@/components/Success";
import Fail from "@/components/Fail";
import Error from "@/components/Error";

// 用户相关业务
import UserHome from "@/components/user/Home";
import LoginWechatCode from "@/components/user/LoginWechatCode";
import LoginPhoneCode from "@/components/user/LoginPhoneCode";

// 聚合支付业务
import PayChannel from "@/components/payment/PayChannel";
import XianJinKaPay from "@/components/payment/XianJinKaPay";
import CiKaPay from "@/components/payment/CiKaPay";
import DianQuanPay from "@/components/payment/DianQuanPay";
import MyCard from "@/components/payment/MyCard";
import BindingCard from "@/components/payment/BindingCard";
import CardInfo from "@/components/payment/CardInfo";
import CardConsumption from "@/components/payment/CardConsumption";
import UpdateCardPassword from "@/components/payment/UpdateCardPassword";
import CardHelp from "@/components/payment/CardHelp";
import ScanCode from "@/components/payment/ScanCode";

// 电影票业务
import MovieHome from "@/components/movie/Home";
import MovieFilm from "@/components/movie/Film";
import MovieCinema from "@/components/movie/Cinema";
import MovieCinemaDetails from "@/components/movie/CinemaDetails";
import MovieCinemaByFilm from "@/components/movie/CinemaByFilm";
import MovieField from "@/components/movie/Field";
import MovieSeat from "@/components/movie/Seat";
import MovieOrders from "@/components/movie/orders";
import MovieOrderDetails from "@/components/movie/OrderDetails";
import ConfirmCinemaOrder from "@/components/movie/ConfirmCinemaOrder";
import UsableRange from "@/components/movie/UsableRange";

// 秒杀业务
import SeckillIndex from "@/components/seckill/Index";
import SeckillPlaceOrder from "@/components/seckill/PlaceOrder";
import SeckillConfirmOrder from "@/components/seckill/ConfirmOrder";
import SeckillOrders from "@/components/seckill/Orders";
import SeckillOrderDetails from "@/components/seckill/OrderDetails";

Vue.use(Router);
export default new Router({
  routes: [
    // 跳转首页
    {
      path: "*",
      // redirect: "/movie/home"
      redirect: Init.channel.indexUrl
    },

    // 公共业务
    {
      path: "/success",
      name: "操作成功",
      component: Success,
      meta: {
        power: false
      }
    },
    {
      path: "/fail",
      name: "操作失败",
      component: Fail,
      meta: {
        power: false
      }
    },
    {
      path: "/error",
      name: "系统异常",
      component: Error,
      meta: {
        power: false
      }
    },

    // 用户相关业务
    {
      path: "/user/home",
      name: "个人中心",
      component: UserHome,
      meta: {
        power: true,
        bottomBar: true
      }
    },
    {
      path: "/user/loginWechatCode",
      name: "微信登录",
      component: LoginWechatCode,
      meta: {
        power: false
      }
    },
    {
      path: "/user/loginPhoneCode",
      name: "手机验证登录",
      component: LoginPhoneCode,
      meta: {
        power: false
      }
    },

    // 聚合支付业务
    {
      path: "/payment/payChannel",
      name: "支付渠道",
      component: PayChannel,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/xianJinKaPay",
      name: "现金卡支付",
      component: XianJinKaPay,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/ciKaPay",
      name: "次卡支付",
      component: CiKaPay,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/dianQuanPay",
      name: "点券支付",
      component: DianQuanPay,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/myCard",
      name: "我的卡券",
      component: MyCard,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/bindingCard",
      name: "绑定卡券",
      component: BindingCard,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/cardInfo",
      name: "卡券详情",
      component: CardInfo,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/cardConsumption",
      name: "卡券消费明细",
      component: CardConsumption,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/updateCardPassword",
      name: "修改卡券密码",
      component: UpdateCardPassword,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/cardHelp",
      name: "卡券帮助",
      component: CardHelp,
      meta: {
        power: true
      }
    },
    {
      path: "/payment/scanCode",
      name: "扫码详情",
      component: ScanCode,
      meta: {
        power: false
      }
    },

    // 电影票业务
    {
      path: "/movie/home",
      name: "电影票",
      component: MovieHome,
      meta: {
        power: true,
        keepAlive: true,
        bottomBar: true
      }
    },
    {
      path: "/movieCinema/:id",
      name: "选择影院",
      component: MovieCinema,
      meta: {
        power: true
      }
    },
    {
      path: "/movie/cinemaDetails",
      name: "选择影院",
      component: MovieCinemaDetails,
      meta: {
        power: true
      }
    },
    {
      path: "/movie/film",
      name: "影片详情",
      component: MovieFilm,
      meta: {
        power: true
      }
    },
    {
      path: "/movie/cinema",
      name: "选择影院",
      component: MovieCinema,
      meta: {
        power: true,
        keepAlive: true,
        bottomBar: true
      }
    },
    {
      path: "/movie/cinemaByFilm/:filmId",
      name: "选择影院",
      component: MovieCinemaByFilm,
      meta: {
        power: true,
        bottomBar: true
      }
    },
    {
      path: "/movie/field",
      name: "选择放映场次",
      component: MovieField,
      meta: {
        power: true
      }
    },
    {
      path: "/movie/seat/:id",
      name: "选择座位",
      component: MovieSeat,
      meta: {
        power: true
      }
    },
    {
      path: "/movie/orders",
      name: "电影订单",
      component: MovieOrders,
      meta: {
        keepAlive: true,
        power: true
      }
    },
    {
      path: "/movie/orderDetails",
      name: "电影订单详情",
      component: MovieOrderDetails,
      meta: {
        power: true
      }
    },
    {
      path: "/movie/confirmCinemaOrder/:orderId",
      name: "确认电影订单",
      component: ConfirmCinemaOrder,
      meta: {
        power: true
      }
    },
    {
      path: "/movie/usableRange",
      name: "使用范围",
      component: UsableRange,
      meta: {
        power: false
      }
    },

    // 秒杀业务
    {
      path: "/seckill/index",
      name: "秒杀首页",
      component: SeckillIndex,
      meta: {
        power: true,
        bottomBar: true
      }
    },
    {
      path: "/seckill/placeOrder",
      name: "下单",
      component: SeckillPlaceOrder,
      meta: {
        power: true
      }
    },
    {
      path: "/seckill/confirmOrder",
      name: "确认订单",
      component: SeckillConfirmOrder,
      meta: {
        power: true
      }
    },
    {
      path: "/seckill/orders",
      name: "订单",
      component: SeckillOrders,
      meta: {
        power: true
      }
    },
    {
      path: "/seckill/orderDetails",
      name: "订单详情",
      component: SeckillOrderDetails,
      meta: {
        power: true
      }
    }
  ]
});
