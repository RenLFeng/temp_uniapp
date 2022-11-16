<template>
  <view class="container index-page">
    <view class="item item1">
      <view class="text-info">
        <text class="title">法务专家+AI智能合同审查</text>
        <text>一键上传，专业审查，开店无忧</text>
      <!--  <text>{{userEventInfo.PageViewTime}}</text>
         <text>{{userEventInfo.pageLoadTime}}</text> -->
      </view>
      <u-button class="btn" type="primary" shape="circle" @click="goUpload()">立即使用</u-button>
    </view>
    <view class="imgitem item2" id="item2 开店">
  <!--    <view class="item-title">
        <view class="title-img -left"></view>
        <view class="title-text">
          <text>想要开店?</text>
          <text>面临各种合同</text>
        </view>
        <view class="title-img -right"> </view>
      </view> -->
      <!-- <image class="coverbgimg" style="height: 154px;" src="../../static/images/index/img2.png"></image> -->
      <image class="coverbgimg" style="height: 50px;"  src="../../static/images/index/item2-1.png"></image>
      <image class="coverbgimg" style="height: 149px;" src="../../static/images/index/item2-2.png"></image>
    </view>
    <view class="imgitem item3" id="item3 坑">
      <image class="coverbgimg" style="height: 314px;" src="../../static/images/index/item3.png"></image>
    </view>
    <view class="imgitem item4" id="item4 遇到">
      <image class="coverbgimg" style="height: 42px;" src="../../static/images/index/item4-1.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 342px;" src="../../static/images/index/item4-2.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 146px;" src="../../static/images/index/item4-3.png" mode="aspectFit">
      </image>
    </view>
    <view class="imgitem item5" id="item5 用心">
      <image class="coverbgimg" style="height: 390px;" src="../../static/images/index/item5.png" mode="aspectFit">
      </image>
    </view>
    <view class="imgitem item6" id="item6 套餐">
      <image class="coverbgimg" style="height: 60px;" src="../../static/images/index/item6-1.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 152px;" src="../../static/images/index/item6-2.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 152px;" src="../../static/images/index/item6-3.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 166px;" src="../../static/images/index/item6-4.png" mode="aspectFit">
      </image>
    </view>
    <view class="imgitem item7" id="item7 流程">
      <image class="coverbgimg" style="height: 42px;" src="../../static/images/index/item7-1.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 316px;" src="../../static/images/index/item7-2.png" mode="aspectFit">
      </image>
    </view>
    <view class="imgitem item8" id="item8 选择">
      <image class="coverbgimg" style="height: 53px;" src="../../static/images/index/item8-1.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 266px;" src="../../static/images/index/item8-2.png" mode="aspectFit">
      </image>
      <image class="coverbgimg" style="height: 179px;margin-top: 20px;" src="../../static/images/index/item8-3.png"
        mode="aspectFit"></image>
    </view>
    <view class="imgitem item9" id="item9 放心保护">
      <image class="coverbgimg" style="height: 168px;" src="../../static/images/index/item9.png" mode="widthFix">
      </image>
    </view>
    <view class="imgitem item10" id="item10 拍拍审">
      <image class="coverbgimg" style="height: 158px;" src="../../static/images/index/item10.png" mode="aspectFit">
      </image>
    </view>
    <u-button
      v-track="{triggerType:'click',currentUrl: $route.path,behavior:'点击xxx按钮',businessCode: 19,actionType:'xxx-click'}"
      class="go-upload" type="primary" @click="goUpload()">立即使用</u-button>
  </view>
</template>
<script>
  import residenceTime from '@/common/residenceTime.js';
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';
  let arrs = [
    // 只在 ios 中生效
    {
      name: 'App Store',
      scheme: 'itms-apps://'
    },
    {
      name: '支付宝',
      pname: 'com.eg.android.AlipayGphone',
      scheme: 'alipay://'
    },
    {
      name: '淘宝',
      pname: 'com.taobao.taobao',
      scheme: 'taobao://'
    },
    {
      name: 'QQ',
      pname: 'com.tencent.mobileqq',
      scheme: 'mqq://'
    },
    {
      name: '微信',
      pname: 'com.tencent.mm',
      scheme: 'weixin://'
    },
    {
      name: '京东',
      pname: 'com.jingdong.app.mall',
      scheme: 'openApp.jdMobile://'
    },
    {
      name: '新浪微博',
      pname: 'com.sina.weibo',
      scheme: 'sinaweibo://'
    },
    {
      name: '优酷',
      pname: 'com.youku.phone',
      scheme: 'youku://'
    }
  ]
  import {
    getBannerData,
    getNoticeData
  } from '../../api/index'
  import {
    captcha,
    login,
    getinfo
  } from '@/api/user';
  export default {
    components: {

    },
    mixins:[residenceTime],
    data() {
      return {
        pagetype:'indexPage',
        bannerLists:[
          {
            title:''
          }
        ],
        list: [{
            name: '选项一',
            // subname: "选项一描述",
            // color: '#ffaa7f',
            // fontSize: '20'
          },
          {
            name: '选项二禁用',
            // disabled: true
          },
          {
            name: '开启load加载', //开启后文字不显示
            // loading: true
          }
        ],
        title: '标题',
        content: 'uView的目标是成为uni-app生态最优秀的UI框架',
        show: false,
        sheetshow: false,
        imageList: [],
        show: false,
        app_lists: arrs,
        loginInfo: {
          username: 'admin',
          password: '@LD#F4*309-Ai',
          rememberMe: false,
          code: '6200',
          uuid: ''
        },
        codesrc: ''
      }
    },
    computed: {
      ...mapState(['ruterLists','userEventInfo']),
      ...mapGetters(['powerCount']),
      swiperList() {
        return this.bannerList.map(item => {
          if (item) {
            return item
          }
        })
      },
      noticeTextList() {
        return this.noticeList.map(item => {
          if (item.title) {
            return item.title
          }
        })
      }
    },

    onLoad() {
      // this.testPost();
      uni.hideTabBar();
      // console.log('parent page onLoad')


    },
    onShow(){
       // console.log('parent page onShow')
    },

    methods: {
      onselect(v) {
        console.log('seeh', v)
      },
      onclose() {

      },
      open() {
        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
        // this.$refs.popup.open('top')
      },
      async testPost() {
        let res = await captcha({
          page: 0,
          pagesize: 20
        })
        // let res = await banke({
        //   page: 0,
        //   pagesize: 5
        // })
        this.codesrc = res.data
        this.loginInfo.uuid = res.id;
      },
      _login() {
        this.$store.dispatch('doLogin', this.loginInfo).then(res => {
          console.log('登录', res)
          if (res.code == 200) {
            setTimeout(() => {
              getinfo()
            }, 3000)
          }
        })
      },
      gowebview() {
        uni.navigateTo({
          url: '/pages/webview/webview',
        });
      },
      goUpload(e) {
        console.log(e);
        uni.navigateTo({
          url: '/pages/fileupload/fileupload',
        });
      },
      uploadFile() {
        uni.chooseImage({
          count: 6, //默认9
          // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera'], //album 从相册选图，camera 使用相机，
          success: function(res) {
            console.log(res);
            uni.previewImage({
              urls: res.tempFilePaths
            })
            console.log(JSON.stringify(res.tempFilePaths));
          }
        });
      },
      toAPP(item) {
        console.log(item);
        // plus.runtime.openURL(item.scheme);
      },

      toWeixin() {
        plus.runtime.openURL("weixin://");
      },
      toWeixinMini0() {
        plus.share.getServices(function(res) {
          var sweixin = null;
          for (var i = 0; i < res.length; i++) {
            var t = res[i];
            if (t.id == 'weixin') {
              sweixin = t;
            }
          }
          if (sweixin) {
            sweixin.launchMiniProgram({
              id: 'gh_ba5cafca7265', // 要跳转小程序的原始ID
              path: 'pages/index/index', // 指定默认页面及传参（可不要此行）
              // path: 'pages/index/index?phone=0', // 指定默认页面及传参（可不要此行
              type: 2 // 微信小程序版本类型可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0
            });
          }
        }, function(res) {
          console.log(JSON.stringify(res));
        });
      },
      toWeixinMini1() {
        plus.share.getServices(function(res) {
          var sweixin = null;
          for (var i = 0; i < res.length; i++) {
            var t = res[i];
            if (t.id == 'weixin') {
              sweixin = t;
            }
          }
          if (sweixin) {
            sweixin.launchMiniProgram({
              id: 'gh_ba5cafca7265', // 要跳转小程序的原始ID
              path: 'pages/index/index', // 指定默认页面及传参（可不要此行）
              // path: 'pages/index/index?phone=0', // 指定默认页面及传参（可不要此行
              type: 1 // 微信小程序版本类型可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0
            });
          }
        }, function(res) {
          console.log(JSON.stringify(res));
        });
      },
      toWeixinMini2() {
        plus.share.getServices(function(res) {
          var sweixin = null;
          for (var i = 0; i < res.length; i++) {
            var t = res[i];
            if (t.id == 'weixin') {
              sweixin = t;
            }
          }
          if (sweixin) {
            sweixin.launchMiniProgram({
              id: 'gh_ba5cafca7265', // 要跳转小程序的原始ID
              path: 'pages/index/index', // 指定默认页面及传参（可不要此行）
              // path: 'pages/index/index?phone=0', // 指定默认页面及传参（可不要此行
              type: 2 // 微信小程序版本类型可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0
            });
          }
        }, function(res) {
          console.log(JSON.stringify(res));
        });
      },
      loadBannerData() {
        getBannerData().then(res => {
          this.bannerList = res.data
        })
      },
      loadNoticeData() {
        getNoticeData().then(res => {
          this.noticeList = res.data
        })
      },
      handleSearchClick(e) {
        uni.$u.route('/pages/search/search')
      },
      handleSwiperClick(index) {
        console.log('点击了图片索引值：', index)
      },
      handleProdItemClick(productId) {
        uni.$u.route('/pages/product/product', {
          productId: productId
        })
      },
      open() {
        // console.log('open');
      },
      close() {
        this.show = false
        // console.log('close');
      }
    },
    // beforeDestroy() {},

  }
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: 80px;

    .item {
      text-align: center;
      padding: 20px;
      height: 200px;

      text {
        font-size: 14px;
        color: #6e6d6d;
      }

      .title {
        font-size: 24px;
        color: #000;
        font-weight: bold;
      }

      .auth-btn {
        width: 50%;
        margin-bottom: 20px
      }

      &.item1 {
        @include flex;
        justify-content: space-evenly;
        flex-direction: column;
        background: #f0f0f0;

        .text-info {
          @include flex;
          flex-direction: column;

          text {
            margin-top: 10px;
          }
        }

        .btn {
          width: 150px;
          font-size: 18px;
          // padding: 0 20px;
        }
      }
    }

    .imgitem {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .item-title {
        width: 95%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .title-img {
          width: 25%;
          height: 50px;
          position: absolute;
          background-repeat: no-repeat;
          background-size: 100% 100%;

          &.-left {
            left: 0;
            background-image: url('../../static/images/index/_left.png');
          }

          &.-right {
            right: 0;
            background-image: url('../../static/images/index/_right.png');
          }
        }

        .title-text {
          display: flex;
          flex-direction: column;
          width: 50%;
          font-size: 26px;
          height: 100%;
          font-weight: bold;
          align-items: center;
          justify-content: center;
          line-height: 26px;
        }
      }

    }

    .go-upload {
      width: 80%;
      position: fixed;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 0);
      z-index: 99999;
    }

  }
</style>
