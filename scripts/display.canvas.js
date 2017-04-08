stars.display = (function (level) {
    var dom = stars.dom,
	$ = dom.$, cursor,
	canvas, ctx,
	mnode, mctx,
	musicalNodeSize,
	firstRun = true, game = $("#game .background")[0];
    var spaceElement = $("#game-screen .game-space")[0];
    var screenWidth = game.clientWidth, screenHeight = game.clientHeight;
    var planet = stars.planet, musicalNode = stars.musicalNode, space = stars.space;

	
    /*-----------RTF 2013.2.21------------*/
    var musicCanvas;//音符画布
	var backgroundCanvas;//背景画布
	var gameLevel=0;//关卡标识
    /*------------------------------------*/


    function setup() {
        musicalNodeSize = stars.settings.musicalNodeSize;
        //main canvas 
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        dom.addClass(canvas, "space");
        canvas.width = screenWidth;
        canvas.height = screenHeight;
        ctx.save();
        //musical canvas
        mnode = document.createElement("canvas");
        mctx = mnode.getContext("2d");
        dom.addClass(mnode, "space-musicalNode");
        mnode.width = screenWidth;
        mnode.height = screenHeight;
        mctx.save();


        musicCanvas = new stars.object.Canvas(mnode);
        backgroundCanvas = new stars.object.Canvas(canvas);
		
        //add them into html context.
        spaceElement.appendChild(canvas);
        spaceElement.appendChild(mnode);

    }

    function initialize(level,callback) {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        musicCanvas.maxlength = level+3;//初始化音符画布最大音符量
		drawBackground(level);//绘制背景画布
		Start(level);
        callback();
    }
	
	function drawBackground(level){
		backgroundCanvas.addScore(new musicalNode.Score(space.GameScore=0, level));//绘制并初始化积分元素

		backgroundCanvas.addPlanets(planet.Planets);//添加星球元素

		backgroundCanvas.addBG(new planet.BackGround(level));//添加背景元素
		backgroundCanvas.begin();
	}
	
	
	function Start(level){//-----------------5.16-------------------
		
		space.RunningOrNot = true;//游戏进行中
		stars.display.gameLevel = level;//初始化关卡变量
		
		globeMusic.SetTrueValue();//初始化音量
		globeMusic.rhythm(musicCanvas.maxlength * 2);//开始节奏分析

        musicCanvas.addMusicSprites(musicalNode.MNodes);//画布中加入音符元素
		
        musicCanvas.begin();

	}
	



    function setCursor(x, y, selected, which) {

        if (arguments.length > 0) {
            cursor = {
                x: x,
                y: y,
                selected: selected,
                which: which
            };
        }
        else {
            cursor = null;
        }
		
		renderCursor();
    }
    function renderCursor() {
		
		globeMusic.VolumeUp();
		
        var color, x, y, r;
        if (cursor.which > 0) {
			
			var P=planet.Planets[cursor.which];
			if(P.radius==planet.PlanetR)P.radius*=1.5;
	
			if(!P.Burst)P.Burst=true;
			
			setTimeout(function(){
				if(P.radius>planet.PlanetR)P.radius/=1.5;
				if(P.Burst)P.Burst=false;
			},500);
        }

    }




	//-----------------关卡中的音符变化-------------------//
    function upMNode() {
        musicCanvas.upMNode();
    }

    function downMNode() {
        musicCanvas.downMNode();
    }

    function upRate() {
        musicCanvas.upRate();
    }

    function downRate() {
        musicCanvas.downRate();
    }
	//-------------------------------------------------------//
	

	
	function PauseGame(){//---暂停游戏---
		space.RunningOrNot=false;
		musicCanvas.stop();
	}
	
	function ExitGame(){//---退出游戏---
		backgroundCanvas.stop();
		backgroundCanvas.clearScreen();
		musicCanvas.clearScreen();
		musicalNode.clear();
		
		stars.screens["high-score"].StorageScore(space.GameScore);
		var gameSuccess = "Level" + (stars.display.gameLevel + 1);
		if(space.GameScore > 1000 && stars.display.gameLevel < 3){
			Storage.setItem(gameSuccess, 1);
		}
	}
	
	function RetryGame(){//---重新开始游戏---
		backgroundCanvas.stop();
		backgroundCanvas.clearScreen();
		musicCanvas.clearScreen();
		musicalNode.clear();
	}
		
	function Resume(){//---回到游戏---
		space.RunningOrNot=true;
		musicCanvas.begin();
	}
	
	function EndGame(){
		PauseGame();
		
		var finish = musicalNode.BurstNodesLength / musicalNode.MNodesLength;
		backgroundCanvas.scoreSprite = null;
		$("#game-screen .game-space .pause")[0].style.display = "none";
		backgroundCanvas.addEnding(new musicalNode.Ending(finish, space.GameScore, stars.display.gameLevel));//---游戏结束画面---
		
	}
	
	function ExitEnd(){
		$("#game-screen")[0].onclick = function(event){
			$("#pause-screen")[0].style.display = "none";//隐藏暂停界面
			$("#game-screen .game-space")[0].style.display = "none";//隐藏游戏界面
			$("#game-screen .options-space")[0].style.display = "block";//预备选关界面
			stars.display.ExitGame();
			
			globeMusic.playSound('background',true);//重新播放背景音乐
			$("#game-screen")[0].onclick = function(event){}
		}
		
	}
	
	function GetMusicalNodes(){//---获得当前musicCanvas中活动音符的数量---
		return musicCanvas.Sprites.length;
	}
	
    function checkBingo(which) {
		
        for (var i in musicCanvas.Sprites) {
            if (musicCanvas.Sprites[i].Bursted < 0 && musicCanvas.Sprites[i].orientation == which) {
                if (space.checkInside(planet.get(which, "PosX"), planet.get(which, "PosY"), musicCanvas.Sprites[i].Pos.x, musicCanvas.Sprites[i].Pos.y, planet.PlanetR+musicCanvas.Sprites[i].radius)) {
					
					space.GameScore += 200;
                    backgroundCanvas.scoreSprite.newScore = space.GameScore;//--------------计分增加--------------
                    musicCanvas.Sprites[i].Bursted = 0;
                }
            }
        }
    }
    /*-------------------------------------*/


    return {
        initialize: initialize,
        setCursor: setCursor,
        /*-----------RTF 2013.2.17------------*/
		drawBackground : drawBackground,
        upMNode : upMNode,
        downMNode : downMNode,
		upRate : upRate,
		downRate : downRate,
        checkBingo : checkBingo,
		PauseGame : PauseGame,
		Resume : Resume,
		ExitGame : ExitGame,
		RetryGame : RetryGame,
		EndGame : EndGame,
		ExitEnd : ExitEnd,//Ending后退出游戏界面
		gameLevel : gameLevel,
		GetMusicalNodes: GetMusicalNodes//---获得当前音符元素数量---
        /*------------------------------------*/
    }
})();
