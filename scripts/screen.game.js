stars.screens["game-screen"] = (function () {
    var space = stars.space, planet = stars.planet, display = stars.display, input = stars.input, cursor, firstRun = true, settings = stars.settings;

	/*--------------------JZH----------------------*/
	var dom = stars.dom,
        game = stars.game,
		$=dom.$;        	
	var gameScreen = $("#game-screen .game-space")[0];
	var levelScreen = $("#game-screen .options-space")[0];
	var pauseButton = $("#game-screen .game-space .pause")[0];
	var pauseScreen = $("#pause-screen")[0];
	var level = $("#game-screen .options-space .level");
	/*---------------------------------------------*/
	
    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
		
		if(Storage["Level2"] == 1){//-----------5.16---------
			$("#b")[0].style.backgroundImage = "url(images/Level2.png)";
			$("#b")[0].onmouseover = function(e){
				$("#b")[0].style.backgroundImage = "url(images/Level2-2.png)";
			}
			$("#b")[0].onmouseout = function(e){
				$("#b")[0].style.backgroundImage = "url(images/Level2.png)";
			}
		}
		else{
			$("#b")[0].style.backgroundImage = "url(images/LevelLocked.png)";
			$("#b")[0].onmouseover = function(e){}
			$("#b")[0].onmouseout = function(e){}
		}
		
		if(Storage["Level3"] == 1){//-----------5.16---------
			$("#c")[0].style.backgroundImage = "url(images/Level3.png)";
			$("#c")[0].onmouseover = function(e){
				$("#c")[0].style.backgroundImage = "url(images/Level3-2.png)";
			}
			$("#c")[0].onmouseout = function(e){
				$("#c")[0].style.backgroundImage = "url(images/Level3.png)";
			}
		}
		else{
			$("#c")[0].style.backgroundImage = "url(images/LevelLocked.png)";
			$("#c")[0].onmouseover = function(e){}
			$("#c")[0].onmouseout = function(e){}
		}

    }
	
		
	//选择关卡，进入游戏页面
	dom.bind(level[0],"click",function(){
		EnterGame(1,startGame);
		globeMusic.playEffect('level');//音效
	});
	
	dom.bind(level[1],"click",function(){
		if(Storage["Level2"] == 1){//关卡解锁
			EnterGame(2,startGame);
			globeMusic.playEffect('level');//音效
		}
	});
	
	dom.bind(level[2],"click",function(){
		if(Storage["Level3"] == 1){//关卡解锁
			EnterGame(3,startGame);
			globeMusic.playEffect('level');//音效
		}
	});	
			
	function startGame(level){
		if(level ==1)
			globeMusic.playSound('level'+level);//关卡音乐
		else if(level == 2)
			globeMusic.playSound('level'+level);//关卡音乐
		else if(level == 3)
			globeMusic.playSound('level'+level);//关卡音乐
			
		
		space.initialize(function () {
			
        	display.initialize(level,function () {
                //start the game
        		cursor =
				{
			    	x: 0,
			    	y: 0,
			    	selected: false,
			    	which: 0  //which planet is selected by cursor. 
				};
 			});
        });
		
	}
	
	
	
	
	function EnterGame(level,callback,Retry) {//游戏背景切换

		globeMusic.pauseSound();//暂时暂停音乐
		var opac=1;
		var P=1;
		var PEnd="";
		var Timer, Timer2;
		var Screen = levelScreen;
		
		if(Retry) Screen = pauseScreen;
		
		LevelDisappear();
		
		function LevelDisappear(){
			Screen.style.opacity = opac;
			opac-=0.1;
			if(opac<=0){
				pauseButton.style.display = "none";//隐藏暂停按键
				gameScreen.style.display = "block";//显示游玩界面
				Screen.style.display = "none";//隐藏选关界面
				Screen.style.opacity = 1;
				GameAppear();
			}
			else{
				setTimeout(LevelDisappear,100);
			}
		}
		
		function GameAppear(){
			if(P==7)
			{
				switch(level)
				{
					case 1:PEnd="-Black";break;
					case 2:PEnd="-Purple";break;
					case 3:PEnd="-Green";break;
				}
			}
			gameScreen.style.backgroundImage="url(images/GB" + P + PEnd + ".png)";
			P++;
			if(P>9)
			{
				Timer2=clearTimeout(Timer);
				callback(level);
				pauseButton.style.display = "block";//显示暂停按键
			}
			else
			{
				Timer=setTimeout(GameAppear,200);
			}
		}
	}
		
		
    function setCursor(x, y, select, which) {
        cursor.x = x;
        cursor.y = y;
        cursor.selected = select;
        cursor.which = which;
		
		if(space.RunningOrNot){
        	display.setCursor(x, y, select, which);
            display.checkBingo(which);//----计分-------
		}
    }
    function tapPlanet(x, y) {
        var which = space.whichPlanet(x, y);
        if (arguments.length == 0) {
            tapPlanet(cursor.x, cursor.y);
            return;
        }

        if (which == 0) {
            setCursor(x, y, false, 0);
            //display.redraw("#000000",function(){});	
        }
        else {
            setCursor(x, y, true, which);
            //alert("Planet: "+which);
            //display.redraw("#fff000",function(){});

        }

    }
    function moveUp() {
		//display.upRate();
        var PlanetX = planet.get(1, "PosX"), PlanetY = planet.get(1, "PosY");
        setCursor(PlanetX, PlanetY, true, 1);
    }
    function moveDown() {
		//display.downRate();
        var PlanetX = planet.get(4, "PosX"), PlanetY = planet.get(4, "PosY");
        setCursor(PlanetX, PlanetY, true, 4);
    }
    function moveLeft() {
        var PlanetX = planet.get(2, "PosX"), PlanetY = planet.get(2, "PosY");
        setCursor(PlanetX, PlanetY, true, 2);
    }
    function moveRight() {
        var PlanetX = planet.get(3, "PosX"), PlanetY = planet.get(3, "PosY");
        setCursor(PlanetX, PlanetY, true, 3);
    }
	
    function setup() {
        input.initialize();
        input.bind("tapPlanet", tapPlanet);
        input.bind("moveUp", moveUp);
        input.bind("moveDown", moveDown);
        input.bind("moveLeft", moveLeft);
        input.bind("moveRight", moveRight);
		
		/*---------------ZYB --2013.5.16------------*/
		dom.bind("#game-screen .options-space .back","click",function(e){
			game.showScreen("main-menu");
			globeMusic.playEffect('back');//音效
		});
		dom.bind("#game-screen .game-space .pause","click",function(e){
			pause();
			globeMusic.playEffect('pause');//音效
		});
		dom.bind("#pause-screen .resume","click",function(e){
			resume();
			globeMusic.playEffect('pause');//音效
		});
		dom.bind("#pause-screen .retry","click",function(e){
			retry();
			globeMusic.playEffect('level');//音效
		});
		dom.bind("#pause-screen .menu", "click", function(event) {
			globeMusic.playEffect('back');//音效
			exit();
        });
		
		
		//进入暂停页面
		dom.bind("#game-screen .game-space .pause","touchstart",function(e){
			pause();
			globeMusic.playEffect('pause');//音效
		});
		
		
		//暂停游戏
		function pause()
		{
			pauseScreen.style.display = "block";//隐藏暂停界面
			$("#pause-score")[0].innerHTML = space.GameScore;
			
			globeMusic.pauseSound();//暂停播放音乐
			display.PauseGame();
		}
		//退出游戏界面
		function exit()
		{
			game.showScreen("main-menu");//显示主选单
			pauseScreen.style.display = "none";//隐藏暂停界面
			gameScreen.style.display = "none";//隐藏游戏界面
			levelScreen.style.display = "block";//预备选关界面

			display.ExitGame();
			globeMusic.playSound('background',true,10);//重新播放背景音乐
		}
		function retry()
		{
			gameScreen.style.display = "none";//隐藏游戏界面
			
			display.RetryGame();
			EnterGame(display.gameLevel,startGame,true);
		}
		//返回继续游戏
		function resume()
		{
			pauseScreen.style.display = "none";//隐藏暂停界面
			
			globeMusic.resumeSound();//原处开始音乐
			display.Resume();
		}
		/*---------------------------------*/
	}
	
		
    return {
        run: run
    };
}
)();