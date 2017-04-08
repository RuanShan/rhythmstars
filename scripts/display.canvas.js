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
    var musicCanvas;//��������
	var backgroundCanvas;//��������
	var gameLevel=0;//�ؿ���ʶ
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
        musicCanvas.maxlength = level+3;//��ʼ�������������������
		drawBackground(level);//���Ʊ�������
		Start(level);
        callback();
    }
	
	function drawBackground(level){
		backgroundCanvas.addScore(new musicalNode.Score(space.GameScore=0, level));//���Ʋ���ʼ������Ԫ��

		backgroundCanvas.addPlanets(planet.Planets);//�������Ԫ��

		backgroundCanvas.addBG(new planet.BackGround(level));//��ӱ���Ԫ��
		backgroundCanvas.begin();
	}
	
	
	function Start(level){//-----------------5.16-------------------
		
		space.RunningOrNot = true;//��Ϸ������
		stars.display.gameLevel = level;//��ʼ���ؿ�����
		
		globeMusic.SetTrueValue();//��ʼ������
		globeMusic.rhythm(musicCanvas.maxlength * 2);//��ʼ�������

        musicCanvas.addMusicSprites(musicalNode.MNodes);//�����м�������Ԫ��
		
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




	//-----------------�ؿ��е������仯-------------------//
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
	

	
	function PauseGame(){//---��ͣ��Ϸ---
		space.RunningOrNot=false;
		musicCanvas.stop();
	}
	
	function ExitGame(){//---�˳���Ϸ---
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
	
	function RetryGame(){//---���¿�ʼ��Ϸ---
		backgroundCanvas.stop();
		backgroundCanvas.clearScreen();
		musicCanvas.clearScreen();
		musicalNode.clear();
	}
		
	function Resume(){//---�ص���Ϸ---
		space.RunningOrNot=true;
		musicCanvas.begin();
	}
	
	function EndGame(){
		PauseGame();
		
		var finish = musicalNode.BurstNodesLength / musicalNode.MNodesLength;
		backgroundCanvas.scoreSprite = null;
		$("#game-screen .game-space .pause")[0].style.display = "none";
		backgroundCanvas.addEnding(new musicalNode.Ending(finish, space.GameScore, stars.display.gameLevel));//---��Ϸ��������---
		
	}
	
	function ExitEnd(){
		$("#game-screen")[0].onclick = function(event){
			$("#pause-screen")[0].style.display = "none";//������ͣ����
			$("#game-screen .game-space")[0].style.display = "none";//������Ϸ����
			$("#game-screen .options-space")[0].style.display = "block";//Ԥ��ѡ�ؽ���
			stars.display.ExitGame();
			
			globeMusic.playSound('background',true);//���²��ű�������
			$("#game-screen")[0].onclick = function(event){}
		}
		
	}
	
	function GetMusicalNodes(){//---��õ�ǰmusicCanvas�л����������---
		return musicCanvas.Sprites.length;
	}
	
    function checkBingo(which) {
		
        for (var i in musicCanvas.Sprites) {
            if (musicCanvas.Sprites[i].Bursted < 0 && musicCanvas.Sprites[i].orientation == which) {
                if (space.checkInside(planet.get(which, "PosX"), planet.get(which, "PosY"), musicCanvas.Sprites[i].Pos.x, musicCanvas.Sprites[i].Pos.y, planet.PlanetR+musicCanvas.Sprites[i].radius)) {
					
					space.GameScore += 200;
                    backgroundCanvas.scoreSprite.newScore = space.GameScore;//--------------�Ʒ�����--------------
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
		ExitEnd : ExitEnd,//Ending���˳���Ϸ����
		gameLevel : gameLevel,
		GetMusicalNodes: GetMusicalNodes//---��õ�ǰ����Ԫ������---
        /*------------------------------------*/
    }
})();
