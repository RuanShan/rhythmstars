stars.game = (function() {
    var dom = stars.dom,
        $ = dom.$;
		
		
	 function createBackground() {
        if (!Modernizr.canvas) return;

        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
			background = $("#game .background")[0],//主背景
            rect = background.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.scale(rect.width, rect.height);	
		ctx.save();	

        background.appendChild(canvas);
    }



    /* hide the active screen (if any) and show the screen with the specified id */
    function showScreen(screenId) {
        var activeScreen = $("#game .screen.active")[0],
            screen = $("#" + screenId)[0];
        if (activeScreen) {
            dom.removeClass(activeScreen, "active");
        }
		//extract screen parameters from arguments
		var args=Array.prototype.slice.call(arguments,1);
        // run the screen module
        stars.screens[screenId].run.apply(stars.screens[screenId],args);

        // display the screen html
        dom.addClass(screen, "active");
		
		if(screenId=="about"){
			setBackground(screenId);//设置“关于”界面的背景切换
		}
    }
	
	function setBackground(screenId){
		//var FirstSet=false;
		var Ground;
		var P=0;
		var Pmax;
		var PStop=-1;
		var PArray;
		var interval;
		
		switch(screenId){
			case "main-menu": Ground = $("#game .background")[0];interval=800;
							Pmax=4;PArray=[1,2,3,2];break;
							
			case "about": Ground = $("#about")[0];interval=350;
							Pmax=9;PArray=[1,2,3,4,5,6,7,8,9];PStop=10;break;
							
			case "settings": Ground = $("#settings")[0];interval=500;
							Pmax=12;PArray=[1,2,3,4,5,6,7,6,5,4,3,2];break;
							
			case "pause-screen": Ground = $("#pause-screen")[0];interval=400;
							Pmax=10;PArray=[1,2,3,4,5,6,7,8,9,10];break;
		}
		
		function ChangeGround(){
			Ground.style.backgroundImage = "url(images/" + screenId + (PArray[P%Pmax]) + ".png)";
			P++;
			if(P!=PStop){
				setTimeout(ChangeGround, interval);
			}
			else if(screenId == "about"){
				stars.dom.$("#about")[0].onclick = function(event) {
					stars.game.showScreen("main-menu");
					globeMusic.playEffect('back');//音效
				}
			}
		}

		ChangeGround();

	}
	
	
/*-------------------ZYB 2013.2.14---------------------------*/
    function gameSetup() {
        // disable native touchmove behavior to 
        // prevent overscroll
        dom.bind(document, "touchmove", function(event) {
            event.preventDefault();
        });
		//listen to the event of orientation-change
		dom.bind(document, "orientationchange", function(event) {
			event.preventDefault();
		});
        // hide the address bar on Android devices
        if (/Android/.test(navigator.userAgent))
		{
            $("html")[0].style.height = "200%";
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 0);
        }
		createBackground();
		
		setBackground("main-menu");//设置背景变化
		setBackground("settings");
		setBackground("pause-screen");
				
    }
    
    // expose public methods
    return {
        gameSetup : gameSetup,
        showScreen : showScreen
    };
})();
/*------------------------------------------------------------*/