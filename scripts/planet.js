stars.planet=(function() 
{
	var Planets=[], $=Sizzle;
	var PlanetR;
	
	
	/*-------------------RTF  3013.3.27--------------------*/
	var Planet = function (X, Y, radius, Type) {
        this.radius = radius; //半径
        this.Pos = {//坐标
            x: X,
            y: Y
        };
        this.size = {
            x: this.radius,
            y: this.radius
        }
        this.type = Type; //星球类别
		this.image=new Image();
		this.imageB=new Image();//点击后效果图
		this.P=0.5;//载入图片名
		this.maxP= this.setMaxP();
		this.speed=0.166;
		this.Burst=false;//是否被点击中
    }

    Planet.prototype = new stars.object.Sprite();
	
	Planet.prototype.Burst = {
		
	}

    Planet.prototype.setMaxP = function () {
		switch(this.type){
			case 1:return 6;
			case 2:return 14;
			case 3:return 7;
			case 4:return 7;
		}		
	}
	
    Planet.prototype.draw = function () {
		
		var ImageSrc="images/";
		switch(this.type){
			case 1:ImageSrc+="blue";break;
			case 2:ImageSrc+="purple";break;
			case 3:ImageSrc+="brown";break;
			case 4:ImageSrc+="green";break;
		}
		
		if(this.Burst){
			this.imageB.src = ImageSrc+"Burst"+".png";//点击后效果图片src
			this.ctx.drawImage(this.imageB, this.Pos.x-this.radius, this.Pos.y-this.radius, 2*this.radius, 2*this.radius);
		}
		
		this.image.src = ImageSrc+Math.round(this.P)+".png";//图片src

		this.ctx.drawImage(this.image, this.Pos.x-this.radius, this.Pos.y-this.radius, 2*this.radius, 2*this.radius);
		
        this.move();
    }

    Planet.prototype.move = function () {
		
        this.P += this.speed;
		if(this.P>this.maxP+0.5)this.P=0.5;

    }
	
	
	/*-------------------------------------------------------------------*/
	
	
	
	
	

	

	
	function get(whichOne,str)
	{
		switch(str)
		{
			case "PosX":return Planets[whichOne].Pos.x;break;
			case "PosY":return Planets[whichOne].Pos.y;break;
			case "type":return Planets[whichOne].Pos.type;break;
			case "radius":return Planets[whichOne].radius;break;
		}
	}
	
		
	/*-------------------RTF  3013.4.11--------------------*/
	var BackGround = function (level) {
		
        this.Level = level; //背景类别
		
		this.image=new Image();
		this.P=0.5;//载入图片号
		this.Pic;//载入图片名
		this.PArray=null;//图片数组
		this.maxP;
		this.speed;
		this.initialize();//初始化
    }

    BackGround.prototype = new stars.object.Sprite();

    BackGround.prototype.initialize = function () {
		switch(this.Level){
			case 1:this.maxP=10;this.speed=0.083;this.Pic="BlackGround";break;
			case 2:this.maxP=24;this.speed=0.042;this.Pic="PurpleGround";
				this.PArray=[1,1,2,3,4,5,6,7,8,9,10,10,10,10,9,8,7,6,5,4,3,2,1,1];break;
			case 3:this.maxP=15;this.speed=0.042;this.Pic="GreenGround";break;
		}		
	}
	
    BackGround.prototype.draw = function () {
		
		var ImageSrc="images/";
		
		if(this.PArray != null)
			this.image.src = ImageSrc+this.Pic+this.PArray[Math.round(this.P)-1]+".jpg";//用图片数组加载
		else
			this.image.src = ImageSrc+this.Pic+Math.round(this.P)+".jpg";//图片src
		
		this.ctx.drawImage(this.image, 0, 0, this.order.canvas.width, this.order.canvas.height);

        this.move();
    }

    BackGround.prototype.move = function () {
		
        this.P += this.speed;
		if(this.P>this.maxP+0.5)this.P=0.5;

    }
	
	
	/*-------------------------------------------------------------------*/

	
	return {
		$:$,
		get:get,
		Planet:Planet,//---RTF 2013.3.28---
		BackGround:BackGround,
		Planets:Planets,
		PlanetR:PlanetR
	};
}
)();