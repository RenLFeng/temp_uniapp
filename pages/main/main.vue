<template>
	<view>
     <u-button class="go-upload" type="primary" @click="ppAPP()">拍拍审</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
    methods:{
      ppAPP(){
        uni.navigateTo({
          url: '/pages/webview/webview',
        });
      }
    }
	}
</script>

<style lang="scss">

</style>
