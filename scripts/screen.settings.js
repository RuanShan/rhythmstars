-----------ZYB 2013.2.13------------*/
stars.screens["settings"] = (function() {
	var game=stars.game;
	var dom=stars.dom,$=dom.$;
	var firstRun = true;
	var language = "E";
	function setup()
	{
		var soundEffect=$("#sound-effect")[0],
			volume=$("#volume")[0];

		dom.bind(".back", "click", function(event) {
            //event.preventDefault();
			game.showScreen("main-menu");
			globeMusic.playEffect('back');//音效
        });
		
		/*---------RTF 2013.5.16-------*/
		dom.bind("#language","click",function(e){
			if(language == "E"){
				$("#language")[0].innerHTML = "中文/English";
				language =　"C";
			}
			else{
				$("#language")[0].innerHTML = "English/中文";
				language =　"E";
			}
			globeMusic.playEffect('settings');//音效
		});
		// dom.bind("#helper","click",function(e){
		// 	game.showScreen("help");
		// 	globeMusic.playEffect('settings');//音效
		// });
		dom.bind("#reset","click",function(e){
			volume.value = 0.5;//重置音量调节
			soundEffect.value = 0.5;
			stars.screens["high-score"].Reset();//-----重置关卡-------
			globeMusic.Reset();
			globeMusic.playEffect('settings');//音效
		});
		/*-------------------------------*/
	}
	function run() {
        if (firstRun) {
			setup();
            firstRun = false;
        }
    }
	return {
       run : run
    };
})();
/*-------------------------------