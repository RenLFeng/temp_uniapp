<template>
	<view class="container">
    <view class="server-info">
      服务详细介绍
    </view>
		 <u-button class="footer-btn" type="primary" @click="goPlay()">购买服务</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
    methods:{
      goPlay(){}
    }
	}
</script>

<style lang="scss">
.container{
  .server-info{
    text-align: center;
  }
}
</style>
