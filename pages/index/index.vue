<template>
	<view class="content" style="padding-top:30%;">
		<wheelDraw :winIndex="winIndex" @routingBefore="routingBefore" @routingFinish="routingFinish"  ref='wheelDraw' :init="true" :prizeList="turnTableList" :wh="300" :lightSpeed="500"></wheelDraw>
	</view>
</template>
<script>
	import wheelDraw from '@/components/wheelDraw/index'
	export default {
		components: {
			wheelDraw
		},
		data() {
			return {
				winIndex:1,
				turnTableList:[
					100,
					200,
					300,
					500,
					600,
					800
				]
			}
		},
		onLoad() {
			//初始化方法
			//this.$refs.wheelDraw.drawInit()
		},
		methods: {
			routingBefore(){
				console.log('抽奖开始！')
				this.$refs.wheelDraw.routing() //开始转动
			},
			routingFinish(){
				uni.showModal({
					title: '中奖提示',
					content: '恭喜你中奖'+this.turnTableList[this.winIndex]+'元',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
		}
	}
</script>

<style>
	page{
		background: mediumturquoise;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
