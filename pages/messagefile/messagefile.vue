<template>
  <view class="container">
    <view class="title">轻松上传文件</view>
    <view class="tips-info">
      将文件发送之微信（文件传输助手,自己或者好友）,选择刚刚发送文件的聊天对象,选择文件,点击确认即可上传成功
    </view>
    <view class="lists-box">
      <u-cell :title="v.name" v-for="(v,i) in fileLists" :key="i" @click="fileItemClick(v)"></u-cell>
    </view>
    <button class="go-upload" v-if="!fileLists.length" @click="doUpload('update')"> 立刻上传</button>
    <view class="do-btns" v-else>
      <button class="btn" @click="doUpload('update')"> 重新上传</button>
      <button class="btn" @click="doUpload('submit')"> 保存并返回APP</button>
    </view>

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
      uni.hideTabBar()
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
      doUpload(type) {
        switch (type) {
          case 'update':
            this.sleFile();
            break;
          case 'submit':
            this.uploadFile(this.fileLists[0])
            break;
        }
      },
      sleFile() {
        let self = this;
        wx.chooseMessageFile({
          count: 1,
          type: 'file',
          success(res) {
            // tempFilePath可以作为 img 标签的 src 属性显示图片
            console.log(res);
            if (res.tempFiles && Array.isArray(res.tempFiles) && res.tempFiles.length) {
              const tempFilePaths = res.tempFiles;
              self.fileLists = tempFilePaths
            } else {
              uni.showToast({
                title: '无文件'
              });
            }

          },
          fail(err) {

          },
        })
      },
      uploadFile(file) {
        if (file && file.path) {
          let vthis = this;
          uni.showLoading({
            title: '上传中'
          });
          wx.uploadFile({
            url: 'https://', //开发服务
            filePath: file.path,
            name: file.name,
            formData: {},
            success(res) {
              uni.showToast({
                title: '上传成功'
              });
              vthis.fileLists = [];
              //do something  回到APP function
            },
            fail: (err) => {
              uni.showToast({
                title: '上传失败' + err.errMsg,
                duration:3000
              });
            },
            complete: () => {
              uni.hideLoading();
            }
          })
        }

      },
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
      color: #999;
    }

    .lists-box {
      margin-top: 30px;
    }

    .file-item {
      margin-bottom: 15px;
      background: #f0f0f0;
    }

    .do-btns {
      display: flex;
      position: fixed;
      width: 100%;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 0);

      .btn {
        width: 45%;
        margin: 0 2.5%;
        background: #57b2b2;
        color: #fff;
        font-size: 16px;
      }
    }

    .go-upload {
      position: fixed;
      width: 80%;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 0);
      z-index: 99999;
      background: #57b2b2;
      color: #fff;
    }
  }
</style>
