<template>
  <view class="container">
    <view class="title">轻松上传文件</view>
    <view class="tips-info">
      将文件发送之微信（文件传输助手,自己或者好友）,选择刚刚发送文件的聊天对象,选择文件,点击确认即可上传成功
    </view>
    <!--   <view class="file-item" v-for="(v,i) in fileLists" @click="fileItemClick(v)">
      <text>{{v.name}}</text>
    </view> -->
 
    <button class="go-upload" @click="goUpload(5)"> 立刻上传</button>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        mode: 'date',
        picSrc: '',
        fileLists: []
      }
    },
    onLoad() {

    },
    methods: {
      fileItemClick(item) {
        switch (item.type) {
          case 'file':
            uni.openDocument({
              filePath: item.path,
              showMenu: true,
              success: function(res) {}
            });

            break;
          case 'image':
            console.log('预览')
            uni.previewImage({
              urls: [item.path]
            })
            break;
        }
      },
      goUpload(v) {
        let self = this;
        wx.chooseMessageFile({
          count: 10,
          success(res) {
            // tempFilePath可以作为 img 标签的 src 属性显示图片
            const tempFilePaths = res.tempFiles;
            self.fileLists = tempFilePaths
            console.log(tempFilePaths);
          },
          fail(err) {
            uni.$u.toast('打开失败' + JSON.stringify(err))
          },
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 30px;

    .title {
      font-size: 22px;
      font-weight: bold;
    }

    .tips-info {
      font-size: 12px;
      margin-top: 10px;
      color: #282828;
    }

    .file-item {
      margin-bottom: 15px;
      background: #f0f0f0;
    }

    .go-upload {
      position: fixed;
      width: 80%;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 0);
      z-index: 99999;
      background: #3c9cff;
      color: #fff;
    }
  }
</style>
