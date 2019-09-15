<template>
	<view>
		<view v-if="prizeList.length>0" class="wheelDraw" :style="{width:wh+30+'px',height:wh+30+'px',margin:'0 auto'}">
			<canvas :style="{width:wh+30+'px',height:wh+30+'px'}" canvas-id='canvas-bg' class='canvasBg'></canvas>
			<canvas :style="{width:wh+'px',height:wh+'px',right:'50%',marginRight:-wh/2+'px',top:'15px',transform:transform,transition:'all '+rotatingTime+'s ease 0s'}"
			 canvas-id="canvas-one" class="canvasCon"></canvas>
			<view id="pointer" class="wheel-pointer"><i></i></view>
			<view class="wheel-btn">
				<view id="button" @click="clickButton">
					<b>立即<br>抽奖</b>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wheelDraw from "./wheelDraw.js"
	export default {
		data() {
			return {
				transform: 'rotate(0deg)',//转动角度
				isRotating:false,//转动状态
				wheelDraw: null,
				numberRotations:0,//转动次数
				show:false,
			}
		},
		props: {
			subText:{
				default:'元',
				type:String
			},
			init:{
				default:true,
				type:Boolean//一开始就初始化
			},
			winIndex:{//中奖的下标
				default:5,
				type:Number
			},
			rotatingTime:{//转动时间
				default:10,
				type:Number
			},
			wh: {//大转盘宽高
				default: 300,
				type: Number,
			},
			colors:{
				default:function(){
					return ['#00b49b','#fff900','#ffbf00']
				},
				type:Array
			},
			turns:{//最小圈数
				default:10,
				type: Number,
			},
			prizeList:{
				default:function(){
					var text = [];
					for(var k=0;k<20;k++){
						text.push(k)
					}
					return text
				},
				type:Array
			},
			lightSpeed:{
				default:500,
				type:Number
			}
		},
		mounted() {
			this.$nextTick(() => {
				if(this.init){
					this.drawInit()
				}
			})
		},
		methods: {
			drawInit(){
				this.show = true;
				var _this = this
				this.wheelDraw = new wheelDraw();
				var ctx = uni.createCanvasContext('canvas-one');
				var ctx2 = uni.createCanvasContext('canvas-bg');
				this.wheelDraw.init(this.colors, this.prizeList, 0, ctx, ctx2,this.subText,this.lightSpeed,this.wh)
			},
			routing(){
				if(this.isRotating) return //正在旋转
				this.isRotating = true
				let time = this.rotatingTime;
				let routingTimer = setInterval(()=>{
					// console.log(time)
					if(time>0){
						time--
					}else{
						this.isRotating = false
						this.numberRotations++
						//滚动结束的回调
						clearInterval(routingTimer)
						this.$emit('routingFinish')
					}
					// console.log(this.rotatingTime)
				},1000)
				let n = this.wheelDraw.isRotate //传入指定的旋转角度，内部指定获奖结果。在指定角度上加上旋转基数模拟转盘随机旋转。
				// 随机获奖结果
				/*    旋转度数 = 上次度数+ 最小圈数 * 360 + 当前数字 * 60 +随机角度  = 最终旋转度数     */
				 //取一个随机的旋转角度，使获奖结果随机化   30-20  10  - 已经转动的角度
				let e = this.numberRotations===0?0:this.winIndex
				n = n + this.turns * 360 + ((this.prizeList.length-this.winIndex)+e)/this.prizeList.length*360 // //1440为旋转基数，最低要旋转1440度，即4圈。rand-(rand%60) 这个是让指针永远停在扇形中心的算法。n + 是为了重复点击的时候有足够的旋转角度。
				this.wheelDraw.isRotate = n
				if (this.wheelDraw.isRotate) {
					this.transform = 'rotate(' + this.wheelDraw.isRotate + 'deg)'
				}
			},
			clickButton() {
				this.$emit('routingBefore')
			}
		},

	}
</script>
<style scoped lang="scss">
	.wheelDraw {
		position: relative;

		.canvasBg {
			position: absolute;
		}

		.canvasCon {
			position: absolute;
		}

		.wheel-pointer {
			position: absolute;
			z-index: 30;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 140upx;
			height: 140upx;
			border: 1px solid #e60;
			box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
			border-radius: 50%;
		}

		.wheel-pointer:before {
			position: absolute;
			top: -40upx;
			left: 50%;
			display: block;
			width: 60upx;
			height: 60upx;
			border: 1px solid #e60;
			background: #fb0;
			content: '';
			box-shadow: inset 1px 1px 0 rgba(255, 255, 255, .5);
			-moz-transform-origin: left top;
			-webkit-transform-origin: left top;
			-o-transform-origin: left top;
			-ms-transform-origin: left top;
			transform-origin: left top;
			-moz-transform: rotate(30deg) skewY(30deg);
			-webkit-transform: rotate(30deg) skewY(30deg);
			-o-transform: rotate(30deg) skewY(30deg);
			-ms-transform: rotate(30deg) skewY(30deg);
			transform: rotate(30deg) skewY(30deg);
		}

		.wheel-pointer:after {
			position: relative;
			display: block;
			width: 100%;
			height: 100%;
			background: #ffcc00;
			content: '';
			border-radius: 50%;
			box-shadow: inset 1px 1px 0 rgba(255, 255, 255, .5);
			background: -moz-linear-gradient(-45deg, #ffcc00 0%, #ff8800 50%, #ffcc00 100%);
			background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, #ffcc00), color-stop(50%, #ff8800), color-stop(100%, #ffcc00));
			background: -webkit-linear-gradient(-45deg, #ffcc00 0%, #ff8800 50%, #ffcc00 100%);
			background: -o-linear-gradient(-45deg, #ffcc00 0%, #ff8800 50%, #ffcc00 100%);
			background: -ms-linear-gradient(-45deg, #ffcc00 0%, #ff8800 50%, #ffcc00 100%);
			background: linear-gradient(135deg, #ffcc00 0%, #ff8800 50%, #ffcc00 100%);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffcc00', endColorstr='#ffcc00', GradientType=1);
		}

		.wheel-pointer i {
			position: absolute;
			z-index: 35;
			top: -36upx;
			left: 0;
			right: 0;
			margin: 0 auto;
			display: block;
			width: 60upx;
			height: 60upx;
			overflow: hidden;
		}

		.wheel-pointer i:before {
			display: block;
			width: 100%;
			height: 100%;
			content: '';
			-moz-transform-origin: left top;
			-webkit-transform-origin: left top;
			-o-transform-origin: left top;
			-ms-transform-origin: left top;
			transform-origin: left top;
			-moz-transform: translateX(50%) rotate(30deg) skewY(30deg);
			-webkit-transform: translateX(50%) rotate(30deg) skewY(30deg);
			-o-transform: translateX(50%) rotate(30deg) skewY(30deg);
			-ms-transform: translateX(50%) rotate(30deg) skewY(30deg);
			transform: translateX(50%) rotate(30deg) skewY(30deg);
			background: rgb(255, 178, 0);
			background: -moz-linear-gradient(40deg, rgba(255, 178, 0, 1) 0%, rgba(255, 179, 0, 1) 45%, rgba(254, 214, 86, 1) 46%, rgba(255, 146, 0, 1) 90%);
			background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(255, 178, 0, 1)), color-stop(45%, rgba(255, 179, 0, 1)), color-stop(46%, rgba(254, 214, 86, 1)), color-stop(90%, rgba(255, 146, 0, 1)));
			background: -webkit-linear-gradient(40deg, rgba(255, 178, 0, 1) 0%, rgba(255, 179, 0, 1) 45%, rgba(254, 214, 86, 1) 46%, rgba(255, 146, 0, 1) 90%);
			background: -o-linear-gradient(40deg, rgba(255, 178, 0, 1) 0%, rgba(255, 179, 0, 1) 45%, rgba(254, 214, 86, 1) 46%, rgba(255, 146, 0, 1) 90%);
			background: -ms-linear-gradient(40deg, rgba(255, 178, 0, 1) 0%, rgba(255, 179, 0, 1) 45%, rgba(254, 214, 86, 1) 46%, rgba(255, 146, 0, 1) 90%);
			background: linear-gradient(50deg, rgba(255, 178, 0, 1) 0%, rgba(255, 179, 0, 1) 45%, rgba(254, 214, 86, 1) 46%, rgba(255, 146, 0, 1) 90%);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb200', endColorstr='#ff9200', GradientType=1);
		}

		.wheel-btn {
			position: absolute;
			z-index: 40;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			padding: 10upx;
			width: 100upx;
			height: 100upx;
			box-shadow: inset 0 1px 1px rgba(255, 102, 0, .4), inset 0 -1px 1px rgba(255, 238, 0, .4);
			background: -moz-linear-gradient(top, rgba(255, 85, 0, 0.7) 0%, rgba(255, 221, 0, 1) 100%);
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 85, 0, 0.7)), color-stop(100%, rgba(255, 221, 0, 1)));
			background: -webkit-linear-gradient(top, rgba(255, 85, 0, 0.7) 0%, rgba(255, 221, 0, 1) 100%);
			background: -o-linear-gradient(top, rgba(255, 85, 0, 0.7) 0%, rgba(255, 221, 0, 1) 100%);
			background: -ms-linear-gradient(top, rgba(255, 85, 0, 0.7) 0%, rgba(255, 221, 0, 1) 100%);
			background: linear-gradient(to bottom, rgba(255, 85, 0, 0.7) 0%, rgba(255, 221, 0, 1) 100%);
			border-radius: 60px;
			z-index: 240;
		}

		.wheel-btn b {
			display: block;
			color: #fff;
			font-size: 16px;
			padding-top:10upx;
			text-align: center;
			text-shadow: 2px 0 0 #c30, -2px 0 0 #c30, 0 2px 0 #c30, 0 -2px 0 #c30, 1px 1px 0 #c30, -1px -1px 0 #c30, -1px 1px 0 #c30, -1px -1px 0 #c30, 0 2px 6px #a30;
		}

		.wheel-btn a {
			color: #ff0;
			position: relative;
			display: table-cell;
			vertical-align: middle;
			width: 100upx;
			height: 100upx;
			overflow: hidden;
			color: #ff0;
			font: 700 14px/25px 'microsoft yahei';
			font-size: 16px;
			text-align: center;
			text-decoration: none;
			border-radius: 50%;
			box-shadow: -1px -1px 10px rgba(255, 255, 255, .5), 1px 1px 3px rgba(0, 0, 0, .4), inset -1px -2px 0 #a30;
			text-shadow: 1px 0 0 #c30, -1px 0 0 #c30, 0 1px 0 #c30, 0 -1px 0 #c30, 0 0 3px #fff;
			background: rgb(204, 51, 0);
			background: -moz-linear-gradient(top, rgba(204, 51, 0, 1) 0%, rgba(255, 221, 0, 1) 100%);
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(204, 51, 0, 1)), color-stop(100%, rgba(255, 221, 0, 1)));
			background: -webkit-linear-gradient(top, rgba(204, 51, 0, 1) 0%, rgba(255, 221, 0, 1) 100%);
			background: -o-linear-gradient(top, rgba(204, 51, 0, 1) 0%, rgba(255, 221, 0, 1) 100%);
			background: -ms-linear-gradient(top, rgba(204, 51, 0, 1) 0%, rgba(255, 221, 0, 1) 100%);
			background: linear-gradient(to bottom, rgba(204, 51, 0, 1) 0%, rgba(255, 221, 0, 1) 100%);
		}

		.wheel-btn a:after {
			position: absolute;
			bottom: 7px;
			right: 5px;
			display: block;
			width: 90upx;
			height: 90upx;
			content: '';
			border-radius: 50%;
			opacity: .8;
			background: -moz-linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%);
			background: -webkit-gradient(linear, right bottom, left top, color-stop(0%, rgba(255, 255, 255, 1)), color-stop(30%, rgba(255, 255, 255, 0)));
			background: -webkit-linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%);
			background: -o-linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%);
			background: -ms-linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%);
			background: linear-gradient(-45deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ccffffff', endColorstr='#00ffffff', GradientType=1);
		}
	}
</style>
