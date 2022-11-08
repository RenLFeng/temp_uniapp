<template>
  <view class="container">
    <view class="item item1">
      <text class="title">AI智能审查</text>
      <text>一键上传,专业审查，开店无忧</text>

      <!-- <u-button class="auth-btn" type="primary" @click="uploadFile">上传文件</u-button> -->
      <!-- <u-button class="auth-btn" type="primary" @click="toWeixin">打开微信</u-button> -->

      <!-- <u-button class="auth-btn" type="primary" @click="toWeixinMini0">打开微信小程序0</u-button>
       <u-button class="auth-btn" type="primary" @click="toWeixinMini1">打开微信小程序1</u-button>
        <u-button class="auth-btn" type="primary" @click="toWeixinMini2">打开微信小程序2</u-button> -->
      <!-- <view class="item item1">
        <u-button class="auth-btn" type="primary" v-for="(item,i) in app_lists" :key="item.scheme" @click="toAPP(item)">
          打开{{item.name}}
        </u-button>
      </view> -->
      <!--    <view>
        <u-popup v-model="show">
          <view>出淤泥而不染，濯清涟而不妖</view>
        </u-popup>
        <u-button @click="show = true">打开</u-button>
      </view> -->
      <!-- <u-calendar v-model="show" :mode="mode"></u-calendar>
    <u-button @click="show = true">打开</u-button> -->
    </view>
    <!-- <view>上传图片  {{imageList.length}}/{{count}}</view>
    <view class="uni-list list-pd">
    	<view class="uni-uploader__files">
    		<block v-for="(image,index) in imageList" :key="index">
    			<view class="uni-uploader__file">
    				<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
    			</view>
    		</block>
   		<view class="uni-uploader__input-box">
    			<view class="uni-uploader__input" @tap="chooseImage"></view>
    		</view>
    	</view>
    </view> -->
    <u-button class="go-upload" type="primary" @click="goUpload()">立即使用</u-button>
  </view>

</template>

<script>
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

  export default {
    components: {},
    data() {
      return {
        imageList: [],
        show: false,
        app_lists: arrs
      }
    },
    computed: {
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

      // this.loadBannerData();
      // this.loadNoticeData();
    },
    methods: {
      goUpload(e) {
        console.log(e);
        uni.navigateTo({
          url: '/pages/hetong/hetong',
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
      }
    },

  }
</script>

<style lang="scss" scoped>
  .container {
    .item {
      text-align: center;
      padding: 20px;
      height: 200px;

      text {
        font-size: 14px;
      }

      .title {
        font-size: 22px;
        color: #000;
      }

      .auth-btn {
        width: 50%;
        margin-bottom: 20px
      }

      &.item1 {
        @include flex;
        align-items: center;
        align-content: space-around;
        justify-content: center;
        flex-direction: column;
        background: #f0f0f0;
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
