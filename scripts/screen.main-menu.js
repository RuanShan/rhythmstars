/*------------------ZYB 2013.2.15-------------------*/
stars.screens["main-menu"] = (function() {
    var dom = stars.dom,
        game = stars.game,
		$=dom.$,
        firstRun = true;
    function mainmenuSetup() {
        dom.bind("#main-menu ul.menu", "click", function(e) {
            if (e.target.nodeName.toLowerCase() === "button") {
                var action = e.target.getAttribute("name");

                game.showScreen(action);
				globeMusic.playEffect('mainmenu');//音效
            }
        });
		stars.screens["high-score"].initialize();//初始化高分榜分数
		
        setTimeout(function(){
            /*-----------背景音乐-------------*/
            globeMusic.playSound('background',true);//音效
            /*-------------------------------*/
        }, 5000);
    }

    function run() {
        if (firstRun) {
            mainmenuSetup();
            firstRun = false;
        }
    }

    return {
        run : run
    };
})();
