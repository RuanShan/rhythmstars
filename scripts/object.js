// JavaScript Document

/*-----------RTF 2013.2.17------------*/
stars.object = (function () {


    var Sprite = function () {
        this.order; //所在的对象
        this.ctx;
        this.size = {//大小尺寸
            x: 0,
            y: 0
        }
        this.Pos = {//坐标
            x: 0,
            y: 0
        };
        this.speed = {//速度属性
            x: 0,
            y: 0
        };
    }

    Sprite.prototype = {
        draw: function () {
        },
        move: function () {

            this.Pos.x += this.speed.x;
            this.Pos.y += this.speed.y;
            //			if(this.childs!=null&&this.childs.length>0)//子元素的运动
            //			{
            //				for(var i=0;i<this.childs.length;i++){
            //					this.childs[i].speed = this.speed;
            //					this.childs[i].move();
            //				}
            //			}
        },
        appendChild: function (sprite) {
            if (this.childs == null) this.childs = [];
            this.childs.push(sprite);
        },
        drawChild: function () {
            if (this.childs != null && this.childs.length > 0) {
                for (var i = 0; i < this.childs.length; i++) {
                    this.childs[i].draw();
                }
            }
        }
    }

    var Canvas = function (canvas) {
        this.canvas = canvas; //画布
        this.ctx = this.setCtx();
        this.Interval = 25; //重绘间隔
        this.Sprites = [];//音符元素
        this.maxlength = 1; //画布元素容量
        this.length = 0; //画布元素数量
		
		this.PSprites=[];//星球元素组
		this.BG;//背景元素
		this.scoreSprite;//计分元素
		
		this.rate=1;//速度加成
    }

    Canvas.prototype = {
        setCtx: function () {
            return this.canvas.getContext("2d");
        },
        begin: function () {
            this.interval = setInterval((function (param) {//持续运行方法
                return function () { param.render(); };
            })(this), this.Interval);
        },
        render: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			if(this.BG != null){
					this.BG.draw();//绘制背景元素
			}
			if(this.PSprites != null){
				for (var i in this.PSprites) {//绘制星球元素
					this.PSprites[i].draw();
				}
			}
			
			if(this.scoreSprite != null){
            	this.scoreSprite.draw(); //绘制计分元素
			}
			
			if(this.Ending != null){
            	this.Ending.draw(); //绘制Ending元素
			}

			if(this.Sprites != null){
				for (var i in this.Sprites) {
					if(typeof(this.Sprites[i])=="function")continue; 
					this.Sprites[i].draw();
				}		
			}

            this.clearSprites();
        },
		clearScreen: function () {
			this.PSprites=[];//星球元素组归零
			this.BG=null;//背景元素归零
			this.scoreSprite=null;//计分元素归零
			this.Ending=null;//Ending元素归零
			this.Sprites = [];//音符元素归零
			this.length = 0;//元素数量归零
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
        addMusicSprites: function (sprites) {
            this.add = setInterval((function (sprites, param) {
                return function () {
                    param.addMusicSprite(sprites);
                }
            })(sprites, this), this.Interval);
        },

        addMusicSprite: function (sprites) {
            if (this.length < this.maxlength && sprites.length > 0) {
				
			/*-----------初始化元素属性------------*/
		sprites[0].order = this;
		sprites[0].ctx = this.ctx;
		sprites[0].musicalNodeComeOut();
			/*------------------------------------*/
            
			    this.Sprites[this.length] = sprites.shift();
                this.length++;
            }
        },


        /*-----------RTF 2013.2.21------------*/
        addScore: function (score) {
            score.order = this;
            score.ctx = this.ctx;
            this.scoreSprite = score;
        },
		
		addPlanets: function (planets) {//-----------RTF 2013.3.28
			for (var i in planets){
				planets[i].order = this;
				planets[i].ctx = this.ctx;
			}
			this.PSprites=planets;
        },
        /*-----------------------------------*/
		
		addBG: function (bg) {//-----------RTF 2013.4.11
				bg.order = this;
				bg.ctx = this.ctx;
				this.BG=bg;
        },
        /*-----------------------------------*/
		
		addEnding: function (end) {//-----------RTF 2013.5.28
				end.order = this;
				end.ctx = this.ctx;
				this.Ending=end;
        },
        /*-----------------------------------*/

        stop: function () {
            clearInterval(this.interval);
        },
        clearSprites: function () {
            for (var i in this.Sprites) {
                if (typeof (this.Sprites[i]) == "function") continue;
				if(this.Sprites[i].Bursted == 0)
				{
					stars.musicalNode.BurstNodesLength++;//统计被击中的音符数量
					this.Sprites[i].Burst();//被点击中的效果
				}
                if (this.Sprites[i].Pos.x - this.Sprites[i].size.x > this.canvas.width || this.Sprites[i].Pos.y - this.Sprites[i].size.y > this.canvas.height || this.Sprites[i].Pos.x + this.Sprites[i].size.x < 0 || this.Sprites[i].Pos.y + this.Sprites[i].size.y < 0) {
					
					this.length--;
					this.Sprites.splice(i, 1);
                }
            }
        },
        upMNode: function () {
            if (this.maxlength < 20)
                this.maxlength++;
        },
        downMNode: function () {
            if (this.maxlength > 0)
                this.maxlength--;
        },
        upRate: function () {
            if (this.rate < 3)
                this.rate+=0.5;
        },
        downRate: function () {
            if (this.rate > 0.5)
                this.rate-=0.5;
        }
    }





    return {
        Sprite: Sprite,
        Canvas: Canvas
    }
})();
