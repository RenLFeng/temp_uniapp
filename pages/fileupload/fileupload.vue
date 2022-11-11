<template>
  <view class="container">
    <view class="title">
      请按照页码顺序上传您的合同
    </view>
    <text class="tips_info">支持上传图片,拍照,Docx文件</text>
    <drag-sort :controlsList="fileList" :controlsSize="{width: 100, height: 100}" @movechange="onMoveChange"
      ref="dragsort" v-if="fileList.length">
    </drag-sort>

    <view class="upload-wrap" @click="uploadFile" v-if="!hasPic">
      <text class="add_icon">+</text>
    </view>
    <view>


      <!--  <view>
      <u-action-sheet :list="list" v-model="show"></u-action-sheet>
      <u-button @click="show = true">打开ActionSheet</u-button>
    </view> -->
      <!--轮播图-->
      <!--    <view class="wrap">
      <u-swiper :list="list2" previousMargin="20" nextMargin="20" circular height="200"></u-swiper>
    </view> -->
      <!-- <u-action-sheet :actions="list2" :closeOnClickOverlay="true" :closeOnClickAction="true"  :title="title" :show="actionshow"  @close="show=false"></u-action-sheet> -->

      <!-- controlsList 表示控件的列表  controlsSize 表示每个控件的大小 -->

      <view class="upload-wrap" v-if="hasPic">
        <image class="pic-item" :src="hasPic.smallPic" mode="aspectFit" @click="preview"></image>
        <u-icon class="-icon" name="close" color="#f00" @click="delht"></u-icon>
      </view>
    </view>
    <u-button v-if="fileList.length && !hasPic" class="go-upload" type="primary" @click="submit()">完成</u-button>
    <u-button v-if="hasPic" class="go-upload" type="primary" @click="check()">审核合同</u-button>
  <!--  <u-action-sheet :actions="sheetlist" :closeOnClickOverlay="true" :closeOnClickAction="true" :title="title"
      :show="show"></u-action-sheet>
    <u-button @click="show = true">打开ActionSheet</u-button> -->
  </view>
</template>

<script>
  import DragSort from '@/components/dragsort.vue';
  export default {
    data() {
      return {
        show: false,
        title: '标题',
        content: 'uView的目标是成为uni-app生态最优秀的UI框架',
        sheetlist: [{
            name: '选项一',

          },
          {
            name: '选项二禁用',
          },
          {
            name: '开启load加载', //开启后文字不显示
          }
        ],
        hasPic: '',
        dataArray2: [{
            color: '#ee3131',
            label: '1'
          },
          {
            color: '#2dc3d5',
            label: '2'
          },
          {
            color: '#f5aa41',
            label: '3'
          },
          {
            color: '#42b983',
            label: '4'
          },
          {
            color: '#1983fb',
            label: '5'
          },
          {
            color: '#a15afd',
            label: '6'
          },
          {
            color: '#ffe874',
            label: '7'
          },
          {
            color: '#00a8fb',
            label: '8'
          },
          {
            color: '#f36586',
            label: '9'
          },
          {
            color: '#16d46b',
            label: '10'
          },
        ],
        dataArray: [{
            color: '#ee3131',
            label: '1',
            src: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
            title: 'swiper3',
          },
          {
            color: '#2dc3d5',
            label: '2',
            src: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
            title: 'swiper2',
          },
          {
            color: '#f5aa41',
            label: '3',
            src: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
            title: 'swiper1',
          },
        ],
        title: '',
        actionshow: false,
        popupshow: false,
        list3: [
          'https://cdn.uviewui.com/uview/swiper/1.jpg',
          'https://cdn.uviewui.com/uview/swiper/2.jpg',
          'https://cdn.uviewui.com/uview/swiper/3.jpg'
        ],
        list2: [{
            image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
            title: '昨夜星辰昨夜风，画楼西畔桂堂东'
          },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
            title: '身无彩凤双飞翼，心有灵犀一点通'
          },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
            title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
          }
        ],
        bannerList: ['https://cdn.uviewui.com/uview/swiper/swiper3.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper1.png'
        ],

        action: 'http://www.example.com/upload',
        fileList: [],
        list: [{
          text: '点赞',
          color: 'blue',
          fontSize: 28,
          subText: '感谢您的点赞'
        }, {
          text: '分享'
        }, {
          text: '评论'
        }],
        show: false
      };
    },
    onLoad() {
      this.getSavFile();
    },
    methods: {
      //生成的合同预览图
      getSavFile() {
        //HttpRequest....
        let vthis = this;
        uni.getStorage({
          key: 'htpic',
          success: function(res) {

            vthis.hasPic = res.data;
            console.log('getStorage ', vthis.hasPic);
          }
        });
      },
      preview() {
        if (this.hasPic) {
          uni.previewImage({
            urls: [this.hasPic.bigPic]
          })
        }
      },
      delht() {
        this.hasPic = '';
        uni.removeStorageSync('htpic');
      },
      //审核合同
      check() {
        uni.navigateTo({
          url: '/pages/server/server',
        });
      },
      //完成
      submit() {
        //httppost...
        this.hasPic = {
          id: 1000,
          smallPic: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          bigPic: 'https://cdn.uviewui.com/uview/swiper/3.jpg'
        };
        this.fileList = [];
        uni.setStorage({
          key: 'htpic',
          data: this.hasPic
        })
      },
      // 调序回调
      onMoveChange(obj) {
        // console.log('处理手指松开事件 parent', this.fileList)
        // console.log('onMoveChange',obj)
      },
      openPopup() {
        this.popupshow = true;
        console.log(this.popupshow)
      },
      uploadFile() {
        let vthis = this;
        uni.chooseImage({
          // count: 6, //默认9
          // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          // sourceType: ['album'], //album 从相册选图，camera 使用相机，
          success: function(res) {
            console.log(res);
            if (res.tempFiles && res.tempFiles.length) {
              vthis.fileList = [...vthis.fileList, ...res.tempFiles]
              vthis.$refs.dragsort && vthis.$refs.dragsort.initUpdate()
              console.log(' uni.chooseImage', vthis.fileList)
            }
          },
          fail(err) {
            // uni.$u.toast('失败异常');
          }
        });
      },
    },
    components: {
      DragSort
    }
  }
</script>

<style lang="scss">
  .container {
    padding: 20px 20px 100px;

    .title {
      // font-size: 18px;
      font-weight: bold;
      color: #282828;
      margin-bottom: 15px;
    }

    .tips_info {

      color: #999;
      font-size: 12px;
    }

    .file-lists-wrap {
      position: relative;
    }

    .upload-wrap {
      margin-top: 20px;
      width: 80px;
      height: 100px;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .add_icon {
        font-size: 30px;
        color: #999;
      }

      .-icon {
        position: absolute;
        top: 5px;
        right: 0;
        font-size: 12px;
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
