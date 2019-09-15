# uni-APP 幸运大转盘
## 演示地址 
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
  prizeList    init  winIndex  rotatingTime  wh  colors   turns subText lightSpeed  
|属性名			|引用路径														|说明			      	|
|---|---|---|
|prizeList		| 奖品列表 														|数组格式 [1,2,3,4,5,6]  	|
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

#### 其他

- 目前支持编译到：H5、App
