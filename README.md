# uni-APP 幸运大转盘
## 演示地址  https://lebow01.github.io/uni-app-wheelDraw/
### 使用说明

#### 下载项目
在 ``script`` 中引用组件：

```
	import wheelDraw from '@/components/wheelDraw/index'

	components: {
		wheelDraw
	}
```

#### 属性

|属性名			| 引用路径														|说明			      	|
|---|---|---|
|prizeList		| 奖品列表 														|数组格式 [1,2,3,4,5,6]  |
|init			| 是否直接初始化 													|默认 false             	|
|winIndex		| 中奖的下标 													|默认 1             		|
|rotatingTime   | 转盘转动时间 													|默认 10秒             	|
|wh   			| 转盘宽高 													    |默认 300px             	|
|colors   		| 颜色数组 当大转盘为基数数组时可长度是3 							|默认 ['#00b49b','#fff900','#ffbf00']            	|
|turns   		| 转动的圈数  													|默认 10            	|
|subText   		| 转盘的文字  													|默认 元          	|

|lightSpeed     | 跑马灯的速度													|默认 500          	|

#### 方法

|组件名			|说明													|
|---|---|---|
|routingBefore		|转动前的回调					|
|routingFinish		|转动结束的回调				|


#### 使用
```
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
```
#### 其他

- 目前支持编译到：H5、App
