stars.screens["splash-screen"] = (function() {
    var game = stars.game,
        dom = stars.dom,
		$=dom.$,
        firstRun = true;

    function setup(getLoadProgress) {
		var scr=$("#splash-screen")[0];
		var inter=0//计时变量
		var pic=[1,2,3,2];
		var rocket=setInterval(function(){//火箭动态切换  RTF 2013.4.9
				$(".indicator",scr)[0].style.backgroundImage="url(images/progress_rocket"+pic[inter%4]+".png)";
				inter++;
		},50);
		
		
		//function checkProgress start.
		function checkProgress()
		{
			var p=getLoadProgress();
			
			if(p>0.282)
				$(".indicator",scr)[0].style.left=(p*7.8-2.2)+"em";
			if(p<1)
			{
				setTimeout(checkProgress,15);
			}
			
			else
			{
				setTimeout(function(){
					clearInterval(rocket);
					$(".progress",scr)[0].style.opacity=0.0;
					$(".continue",scr)[0].style.display="block";
					dom.bind("#splash-screen", "click", function() {
						game.showScreen("main-menu");
						globeMusic.playEffect('splahscreen');//音效
					});
				},500);
			}

		}
		
		//function checkProgress end, then execute.		
		checkProgress();
	}

    function run(getLoadProgress) {
        if (firstRun) {
            setup(getLoadProgress);
            firstRun = false;
        }
    }

    return {
        run : run
    };
})();
