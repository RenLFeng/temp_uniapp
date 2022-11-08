<template>
  <view class="container">
    <view class="title">
      请按照页码顺序上传您的合同
    </view>
    <text class="tips_info">支持上传图片,拍照,Docx文件</text>
    <view class="upload-wrap" @click="uploadFile">
      <text class="add_icon">+</text>
      <!-- <u-upload :action="action" :file-list="fileList"></u-upload> -->
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        action: 'http://www.example.com/upload',
        fileList: []
      };
    },
    methods:{
      uploadFile() {
        uni.chooseImage({
          count: 6, //默认9
          // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          // sourceType: ['camera'], //album 从相册选图，camera 使用相机，
          success: function(res) {
            console.log(res);
            uni.previewImage({
              urls: res.tempFilePaths
            })
            console.log(JSON.stringify(res.tempFilePaths));
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  .container {
    padding: 18px;
    .title {
      font-size: 20px;
      color: #282828;
    }

    .tips_info {
       margin-top: 10px;
      color: #999;
      font-size: 12px;
    }

    .upload-wrap {
      margin-top: 20px;
      width: 80px;
      height: 100px;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      .add_icon{
        font-size: 30px;
        color: #999;
      }
    }
  }
</style>
