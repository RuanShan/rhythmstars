/*-----------RTF 2013.5.16------------*/
stars.screens["help"] = (function() {
	var game=stars.game;
	var dom=stars.dom,$=dom.$;
	var firstRun = true;
	
	var rect=($("#game .background")[0]).getBoundingClientRect();
		
	function HelpSetup()
	{
		dom.bind("#help", "click", function(event) {
			game.showScreen("settings");
        });
	}
	
	function run() {
		if(firstRun){
			HelpSetup();
			firstRun = false;
		}
    }
	
	return {
		run : run
    };
})();
/*-------------------------------*/