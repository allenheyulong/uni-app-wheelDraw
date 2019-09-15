var wheelDraw = function() {
	this.mytime = ''; //跑马灯定时器名称
	this.lamp = 0; //判断跑马灯闪烁标记
	this.w2 = '';
	this.h2 = '';
	this.w1 = '';
	this.h1 = '';
	this.itemsNum = 0; //大转盘等分数
	this.itemsArc = 0; //大转盘每等分角度
	this.color = []; //扇形的背景颜色交替
	this.text = []; //每个扇形中的文字填充
	this.isRotate = 0;
	this.subText = '元'
}
wheelDraw.prototype.init = function(colors, textArray, isRotate, ctx, ctx2,subText,lightSpeed = 500,wh=300) {
	this.ctx = ctx;
	this.ctx2 = ctx2;
	this.itemsNum = textArray.length; //大转盘等分数
	this.itemsArc = 360/textArray.length; //大转盘每等分角度
	this.startRadian = 0; 
	this.awardRadian = (Math.PI * 2) / textArray.length, // 每一个奖项所占的弧度
	this.color = colors; //扇形的背景颜色交替
	this.text = textArray; //每个扇形中的文字填充
	// this.lightSpeed = lightSpeed;
	this.isRotate = isRotate;
	this.getCanvasI(lightSpeed,wh);
	this.getCanvasII(wh);
	this.subText = subText;
}
//获取圆心尺寸
wheelDraw.prototype.getCanvasII = function(wh) {
	let widthII = wh + 30
	let heightII = wh + 30
	this.w2 = parseInt(widthII / 2)
	this.h2 = parseInt(heightII / 2)
	this.light()
}
//转盘内部绘制
wheelDraw.prototype.getCanvasI = function(speed,wh) {
	let widthI = wh
	let heightI = wh
	this.w1 = parseInt(widthI / 2)
	this.h1 = parseInt(heightI / 2)
	this.Items(this.itemsArc) //每一份扇形的内部绘制
	this.mytime = setInterval(this.light.bind(this), speed)
}
//绘制奖品名称
wheelDraw.prototype.Items = function(e) {
	let that = this
	let itemsArc = e //每一分扇形的角度
	let Num = that.itemsNum // 等分数量
	let text = that.text // 放文字的数组
	for (let i = 0; i < Num; i++) {
		let _startRadian = that.startRadian + that.awardRadian * i,  // 每一个奖项所占的起始弧度
		    _endRadian = _startRadian + that.awardRadian;     // 每一个奖项的终止弧度

		that.ctx.beginPath()
		that.ctx.moveTo(that.w1, that.h1)
		that.ctx.arc(that.w1, that.h1, that.w1 - 5, ((itemsArc * i)) * Math.PI / 180, (itemsArc + itemsArc * i) * Math.PI / 180) //绘制扇形，注意下一个扇形比上一个扇形多一个itemsArc的角度
		that.ctx.closePath()
		if(Num % 2==0){
			//总数为偶数
			if (i % 2 == 0) { 
				//绘制偶数扇形和奇数扇形的颜色不同
				that.ctx.fillStyle = that.color[0]
			} else {
				that.ctx.fillStyle = that.color[1]
			}
		}else{
			if (i % 2 == 0&&i % 3 !== 0) {
				//绘制偶数扇形和奇数扇形的颜色不同
				that.ctx.fillStyle = that.color[0]
			} else if(i % 3 == 0){
				that.ctx.fillStyle = that.color[2]
			}else{
				that.ctx.fillStyle = '#ffffff'
			}
		}
		that.ctx.fill()
		that.ctx.save()
	}
	// that.ctx.draw()

	for (let i = 0; i < Num; i++) {
		let _startRadian = that.startRadian + that.awardRadian * i,  // 每一个奖项所占的起始弧度
		    _endRadian = _startRadian + that.awardRadian;     // 每一个奖项的终止弧度
		that.ctx.beginPath()
		that.ctx.font="20px Arial"
		that.ctx.fillStyle = '#ff461a'
		that.ctx.textAlign = 'center'
		that.ctx.textBaseline = 'middle'
		that.ctx.translate(that.w1, that.h1); //将原点移至圆形圆心位置
		//4 8 12 16 20
		//基数 偶数
		let icq = Num%4===0?1:0
		if(Num%2===1){
			//如果是基数
			icq =25%4===1?-0.5:0.5
		}
		// console.log((360/Num)*i+(180/Num)*Math.PI/180)
		that.ctx.rotate(((360/Num)*i+(180/Num)*icq)*Math.PI/180);
		that.ctx.fillText(that.text[i], 0, -(that.h1 * 0.8));
		that.ctx.font="12px Arial"
		that.ctx.fillText(that.subText, 0, -((that.h1-20) * 0.8));
		// that.ctx.fillText('元', 0, -((that.h1-10) * 0.8));
		that.ctx.restore(); //保存绘图上下文，使上一个绘制的扇形保存住。
	}
	that.ctx.draw()

}


//跑马灯绘制
wheelDraw.prototype.light = function() {
	var that = this
	var itemsNum = that.itemsNum
	that.lamp++
	if (that.lamp >= 2) {
		that.lamp = 0
	}
	that.ctx2.beginPath()
	that.ctx2.arc(that.w2, that.h2, that.w2, 0, 2 * Math.PI) //绘制底色为红色的圆形
	that.ctx2.fillStyle = "#FA7471";
	that.ctx2.fill()
	for (let i = 0; i < that.itemsNum * 2; i++) { //跑马灯小圆圈比大圆盘等分数量多一倍
		that.ctx2.save()
		that.ctx2.beginPath()
		that.ctx2.translate(that.w2, that.h2)
		that.ctx2.rotate(30 * i * Math.PI / 180)
		that.ctx2.arc(0, that.h2 - 10, 5, 0, 2 * Math.PI) //圆形跑马灯小圆圈
		//跑马灯第一次闪烁时与第二次闪烁时绘制相反的颜色，再配上定时器循环闪烁就可以达到跑马灯一闪一闪的效果了
		if (that.lamp == 0) { //第一次闪烁时偶数奇数的跑马灯各绘制一种颜色
			if (i % 2 == 0) {
				that.ctx2.fillStyle = "#FBF1A9";
			} else {
				that.ctx2.fillStyle = "#fbb936";
			}
		} else { //第二次闪烁时偶数奇数的跑马灯颜色对调
			if (i % 2 == 0) {
				that.ctx2.fillStyle = "#fbb936";
			} else {
				that.ctx2.fillStyle = "#FBF1A9";
			}
		}
		that.ctx2.fill()
		that.ctx2.restore() //恢复之前保存的上下文，可以将循环出来的跑马灯都保存下来。没有这一句那么每循环出一个跑马灯则上一个跑马灯绘图将被覆盖，
	}
	that.ctx2.draw()
}

export default wheelDraw