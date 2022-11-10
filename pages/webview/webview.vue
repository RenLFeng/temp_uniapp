<template>
  <view>
    <view>
      <web-view :webview-styles="webviewStyles" src="http://10.20.10.135:3001"></web-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        webviewStyles: {
          progress: {
            color: '#FF3333'
          }
        }
      };
    }
  }
</script>

<style lang="scss">

</style>
