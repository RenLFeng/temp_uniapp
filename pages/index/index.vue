<template>
  <view class="container">
    <view class="item item1">
      <view class="text-info">
        <text class="title">AI智能审查</text>
        <text>一键上传,专业审查，开店无忧</text>
      </view>

      <u-button class="btn" size="mini" type="primary" @click="goUpload()">立即使用</u-button>
    </view>
    <!--
    <u-popup :show="show" @close="close" @open="open"  mode="center">
      <view>
        <text>出淤泥而不染，濯清涟而不妖</text>
      </view>
    </u-popup>
    <u-button @click="show = true">打开</u-button> -->
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
    <!-- view>
    		<u-action-sheet :list="[]" v-model="sheetshow"></u-action-sheet>
    		<u-button @click="sheetshow = true">打开ActionSheet</u-button>
    	</view>
    <view>
       <u-popup v-model="show">
         <view>出淤泥而不染，濯清涟而不妖</view>
       </u-popup>
       <u-button @click="show = true">打开</u-button>
     </view> -->
    <!--  <u-action-sheet :list="[]" v-model="sheetshow"></u-action-sheet>
     <u-button @click="sheetshow = true">打开ActionSheet</u-button> -->
    <!-- <u-button type="primary" @click="gowebview()">webview</u-button> -->

    <u-button
      v-track="{triggerType:'click',currentUrl: $route.path,behavior:'点击xxx按钮',businessCode: 19,actionType:'xxx-click'}"
      class="go-upload" type="primary" @click="goUpload()">立即使用</u-button>
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
        list: [{
            name: '选项一',
            subname: "选项一描述",
            color: '#ffaa7f',
            fontSize: '20'
          },
          {
            name: '选项二禁用',
            disabled: true
          },
          {
            name: '开启load加载', //开启后文字不显示
            loading: true
          }
        ],
        title: '标题',
        content: 'uView的目标是成为uni-app生态最优秀的UI框架',
        show: false,
        sheetshow: false,
        imageList: [],
        show: false,
        app_lists: arrs,

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
      uni.hideTabBar()
      // this.loadBannerData();
      // this.loadNoticeData();
    },
    methods: {
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
        color: #6e6d6d;
      }

      .title {
        font-size: 24px;
        color: #000;
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
          width: 100px;
          height: 30px;
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
