
/*-----------RTF 2013.2.17------------*/
stars.musicalNode = (function () {
	
    var $ = Sizzle;
	var rect=($("#game .background")[0]).getBoundingClientRect();


    var MNodes = [];//产生的原始音符数组
	var BurstNodesLength = 0;//被击中的音符数量
	var MNodesLength = 0;//产生的原始音符数量
	
	function clear(){
		this.MNodes = [];
		this.BurstNodesLength = 0;
		this.MNodesLength = 0;
	}
	
    var MNode = function (orien) {//----------------5.16------------------
        this.t = 0;
        this.radius = rect.width/8; //半径
        this.size = {
            x: this.radius,
            y: this.radius
        }
        this.orientation = orien; //目标
        this.change = false; //是否转折
		this.Bursted = -1;//是否点中
        this.style = Math.ceil(Math.random() * 8); //路线风格
        this.setChangePos();
		
		this.image=new Image();//音符图片
		this.P;//图片名
		this.PEnd;//图片名后缀
		this.setP();//设置图片名
		this.PArray=[1,2,3,2];//图片数组
		this.PMax=4;//图片数组长度
		this.Pn=0;//图片计数
		
		this.rate=1;//移动速度
		
    }

    MNode.prototype = new stars.object.Sprite();
	
    MNode.prototype.Burst = function () {//音符被点击中的效果
		this.rate = 2;
		this.Bursted = 1;
		this.PEnd = "-B.png";
	}
    MNode.prototype.setP = function () {//音符被点击中的效果
		switch(this.orientation)
		{
			case 1:this.P="images/BlackNode";break;
			case 2:this.P="images/PurpleNode";break;
			case 3:this.P="images/BrownNode";break;
			case 4:this.P="images/GreenNode";break;
		}
		this.PEnd = ".png";
	}
    MNode.prototype.setChangePos = function () {
        this.changePos = {
            x: stars.planet.get(this.orientation, "PosX"),
            y: stars.planet.get(this.orientation, "PosY")
        }
    }
    MNode.prototype.checkChangePos = function () {
        if (stars.space.checkLength(this.Pos.x, this.Pos.y, this.changePos.x, this.changePos.y) < 5) {
            this.change = true;
        }
    }
    MNode.prototype.draw = function () {

		this.image.src = this.P + this.PArray[Math.round((this.Pn/10))%(this.PMax)] + this.PEnd; ///*音符动态效果*/
		this.Pn++;
		
        this.ctx.drawImage(this.image, this.Pos.x - this.radius, this.Pos.y - this.radius, this.radius * 2, this.radius * 2);

        this.drawChild();
        this.move();
    }

    MNode.prototype.move = function () {
		
		this.checkChangePos();//检查是否转折
        if (this.change) {
            this.Pos.x += this.speed.x * this.rate;
            this.Pos.y += this.speed.y * this.rate;
        }
        else {
            this.randFly();
        }
        this.t += this.order.Interval / 1000;


    }

    MNode.prototype.randFly = function () {

        var orien = this.orientation,
			x = this.Pos.x,
			y = this.Pos.y,
			t = this.t;

        var x2 = this.changePos.x,
			y2 = this.changePos.y;



        var s = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2)) / this.order.rate; //运动矩形对角线

        function fly1(x, y, x2, y2, param)//
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 4;

            param.Pos = {
                x: Math.ceil(Tween.Linear(t, x, w, d)),
                y: Math.ceil(Tween.Bounce.easeInOut(t, y, h, d))
            }
        }

        function fly2(x, y, x2, y2, param)//
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 4;

            param.Pos = {
                x: Math.ceil(Tween.Linear(t, x, w, d)),
                y: Math.ceil(Tween.Sine.easeInOut(t, y, h, d))
            }
        }

        function fly3(x, y, x2, y2, param)//The most easy
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 1.5;

            param.Pos = {
                x: Math.ceil(Tween.Linear(t, x, w, d)),
                y: Math.ceil(Tween.Elastic.easeOut(t, y, h, d))
            }
        }

        function fly4(x, y, x2, y2, param)//easy
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 2;

            param.Pos = {
                x: Math.ceil(Tween.Linear(t, x, w, d)),
                y: Math.ceil(Tween.Back.easeOut(t, y, h, d, 3))
            }
        }

        function fly5(x, y, x2, y2, param)//
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 4;

            param.Pos = {
                x: Math.ceil(Tween.Back.easeOut(t, x, w, d)),
                y: Math.ceil(Tween.Linear(t, y, h, d))
            }
        }

        function fly6(x, y, x2, y2, param)//----极快-----
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 4;

            param.Pos = {
                x: Math.ceil(Tween.Sine.easeInOut(t, x, w, d)),
                y: Math.ceil(Tween.Linear(t, y, h, d))
            }
        }

        function fly7(x, y, x2, y2, param)//
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 1.5;

            param.Pos = {
                x: Math.ceil(Tween.Elastic.easeOut(t, x, w, d)),
                y: Math.ceil(Tween.Linear(t, y, h, d))
            }
        }

        function fly8(x, y, x2, y2, param)//横向4
        {
            var w = (x2 - x),
				h = (y2 - y),
				d = s / 2;

            param.Pos = {
                x: Math.ceil(Tween.Back.easeOut(t, x, w, d, 3)),
                y: Math.ceil(Tween.Linear(t, y, h, d))
            }
        }
        switch (this.style) {
            case 1: fly1(x, y, x2, y2, this); break;
            case 2: fly2(x, y, x2, y2, this); break;
            case 3: fly3(x, y, x2, y2, this); break; 
            case 4: fly4(x, y, x2, y2, this); break;
            case 5: fly5(x, y, x2, y2, this); break;
            case 6: fly6(x, y, x2, y2, this); break;
            case 7: fly7(x, y, x2, y2, this); break;
            default: fly8(x, y, x2, y2, this); break;
        }

        this.speed = {
            x: this.Pos.x - x,
            y: this.Pos.y - y
        }
    }

    MNode.prototype.musicalNodeComeOut = function () {
		
        var pos = Math.round(Math.random() * 3 + 0.5);
        var newPosX, newPosY;
        switch (pos) {
            case 1:
                {
                    newPosX = 0;
                    newPosY = Math.round(Math.random() * this.order.canvas.height);
                    break;
                }
            case 2:
                {
                    newPosX = this.order.canvas.width;
                    newPosY = Math.round(Math.random() * this.order.canvas.height);
                    break;
                }
            case 3:
                {
                    newPosX = Math.round(Math.random() * this.order.canvas.width);
                    newPosY = 0;
                    break;
                }
        }
        this.Pos = {
            x: newPosX,
            y: newPosY
        };
    }


    /*-----------RTF 2013.2.21------------*/
    var Score = function (baseScore, level) {
		this.newScore = baseScore;
        this.baseScore = baseScore;
		this.Level = level;
        this.Pos = {//坐标
            x: 0,
            y: rect.height * 0.0625
        };
		this.increaseSpeed = 0;
    }
    Score.prototype = new stars.object.Sprite();
    Score.prototype.draw = function () {
		
        this.setFillStyle(this.ctx, this.Level);
		
		var Score="";
		if(this.baseScore<10)Score="00000"+this.baseScore;
		else if(this.baseScore<100)Score="0000"+this.baseScore;
		else if(this.baseScore<1000)Score="000"+this.baseScore;
		else if(this.baseScore<10000)Score="00"+this.baseScore;
		else if(this.baseScore<100000)Score="0"+this.baseScore;
		
		this.ctx.font = (rect.height * 0.0625) + "px NiseSonicShuffle";
        this.ctx.fillText("Score:", this.Pos.x, this.Pos.y);
		this.ctx.font = (rect.height * 0.0625) + "px Grunge_Puddles";
        this.ctx.strokeText(Score, this.Pos.x, this.Pos.y+rect.height * 0.07);
	
        this.increase();
    }
	
	Score.prototype.setFillStyle = function (ctx, i) {
		switch(i){
			case 1:ctx.fillStyle = "#006";ctx.strokeStyle = "#00F";break;
			case 2:ctx.fillStyle = "#93F";ctx.strokeStyle = "#63F";break;
			case 3:ctx.fillStyle = "#3C0";ctx.strokeStyle = "#3F6";break;
		}
	}
	
    Score.prototype.increase = function () {
		var add = this.newScore - this.baseScore;
		if(add>0){
			this.increaseSpeed = Math.round(add / 10 + 1);
			if(this.baseScore+this.increaseSpeed<=this.newScore)
				this.baseScore+=this.increaseSpeed;
			else{
				this.baseScore=this.newScore;
				this.increaseSpeed=0;
			}
		}
    }
    /*------------------------------------*/
	
	
    /*-----------RTF 2013.5.27------------*/
    var Ending = function (finish, score, level) {
		this.Finish = 0;
		this.EndingFinish = finish.toFixed(2) * 100;
		this.playSound();//根据完成度播放音效
		this.Score = 0;
		this.EndingScore = score;
		this.end ="";
		this.Timer=0;
		this.opacity = 0;
		this.Level = level;//所在关卡
		
        this.Pos = {//坐标
            x: 80,
            y: 160
        };
		this.speed = {//速度
			x: 0,
			y: 0
		};
    }
    Ending.prototype = new stars.object.Sprite();	
	Ending.prototype.playSound = function () {
		if(this.EndingFinish <70){globeMusic.playSound("loser");}
		else{globeMusic.playSound("winner");}
	}
	Ending.prototype.setLinGrad = function (i) {
		var colorBegin, colorStop;
		switch(i){
			case 1:colorBegin = "rgba(0,0,255," +  this. opacity + ")";colorStop = "rgba(0,0,96," +  (this. opacity+0.4) + ")";break;
			case 2:colorBegin = "rgba(96,48,255," +  this. opacity + ")";colorStop = "rgba(144,48,255," +  (this. opacity+0.4) + ")";break;
			case 3:colorBegin = "rgba(48,255,96," +  this. opacity + ")";colorStop = "rgba(48,192,0," +  (this. opacity+0.4) + ")";break;
		}
		this.linGrad = this.ctx.createLinearGradient(0, 0, 0, rect.height);
		this.linGrad.addColorStop(0, colorBegin);
		this.linGrad.addColorStop(1, colorStop);
	}
    Ending.prototype.draw = function () {
		
		this.setLinGrad(this.Level);//可优化
		this.ctx.fillStyle = this.linGrad;
		
		if(this.opacity<0.4) this.opacity += 0.01;
		this.ctx.fillRect(0,0,rect.width,rect.height);//=======
		
		this.ctx.font = "40px NiseSonicShuffle";
		
		this.drawFinish();
		if(this.Finish == this.EndingFinish) this.drawScore();
		if(this.Score == this.EndingScore) this.drawEnding();
		
        this.increase();
	}
	
    Ending.prototype.drawFinish = function () {
		
        this.drawFont("FINISH", this.Pos.x, this.Pos.y, "white");
		
		
        this.drawFont(this.Finish + "%", this.Pos.x, this.Pos.y+40, "white");
	}
	
    Ending.prototype.drawScore = function () {
		
        this.drawFont("SCORE", this.Pos.x, this.Pos.y+80, "white");

		
        this.drawFont(this.Score+"", this.Pos.x, this.Pos.y+120, "white", true);
	}
	
    Ending.prototype.drawEnding = function () {
		if(this.Timer == 0){
			setTimeout((function(param){return function(){param.setEnd(param);};})(this),2000);
			this.Timer = 1;
		}
		
		this.ctx.font = "40px GraphicAttitude_Mono";
		
       	this.drawFont(this.end, this.Pos.x, this.Pos.y+200, "red", true);
    }
	
    Ending.prototype.setEnd = function (param) {
		if(this.Finish < 70){
			param.end="FAILED";
		}
		else{
			param.end="PASSED";
		}
		this.setLinGrad = function (i) {
			var colorBegin, colorStop;
			switch(i){
				case 1:colorBegin = "rgba(0,0,255,0.4)";colorStop = "rgba(0,0,96,0.8)";break;
				case 2:colorBegin = "rgba(96,48,255,0.4)";colorStop = "rgba(144,48,255,0.8)";break;
				case 3:colorBegin = "rgba(48,255,96,0.4)";colorStop = "rgba(48,192,0,0.8)";break;
			}
			this.linGrad = this.ctx.createLinearGradient(0, 0, 0, rect.height);
			this.linGrad.addColorStop(0, colorBegin);
			this.linGrad.addColorStop(0.7, "rgba(0,0,0,0.9)");
			this.linGrad.addColorStop(0.75, "rgba(0,0,0,0.9)");
			this.linGrad.addColorStop(1, colorStop);
		}
		stars.display.ExitEnd();
    }
	
    Ending.prototype.drawFont = function (font, x, y, color, Ending) {
		var W = 80/3;
		var size = font.length;
		if(Ending){
			size = font.length *1.15;
		}
		if(font !=　"")
		{
			this.ctx.fillStyle = color;
			this.ctx.fillText(font, x+(6-size)/2*W, y);
		}
	}
	
    Ending.prototype.increase = function () {
		if(this.Finish != this.EndingFinish){
			var add = this.EndingFinish - this.Finish;
			if(add>0){
				this.increaseSpeed = Math.round(add / 30 + 1);
				if(this.Finish+this.increaseSpeed<=this.EndingFinish)
					this.Finish+=this.increaseSpeed;
				else{
					this.Finish=this.EndingFinish;
					this.increaseSpeed=0;
				}
			}
		}
		else if(this.Score != this.EndingScore){
			var add = this.EndingScore - this.Score;
			if(add>0){
				this.increaseSpeed = Math.round(add / 20 + 1);
				if(this.Score+this.increaseSpeed<=this.EndingScore)
					this.Score+=this.increaseSpeed;
				else{
					this.Score=this.EndingScore;
					this.increaseSpeed=0;
				}
			}
		}
	}
    /*------------------------------------*/

    return {
        $: $,
        MNodes: MNodes,
		BurstNodesLength: BurstNodesLength,
		MNodesLength: MNodesLength,
        MNode: MNode,
        Score: Score,
		Ending: Ending,
		clear: clear
    };
}
)();
