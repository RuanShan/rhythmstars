/*-----------RTF 2013.4.22------------*/
stars.screens["high-score"] = (function() {
	var game=stars.game;
	var dom=stars.dom,$=dom.$;
	var firstRun = true;
    var HighScoreElement = $("#high-score")[0];
	
	var rect=($("#game .background")[0]).getBoundingClientRect();
	
	function highScoreSetup()
	{
		dom.bind("#high-score", "click", function(event) {
			game.showScreen("main-menu");
			globeMusic.playEffect('back');//音效
        });
	}
	
	function run() {
		if(firstRun){
			highScoreSetup();
			firstRun = false;
		}
		drawScores();
    }
	
	function drawScores(){//绘制Scores
		ScoreCtx.clearRect(0, 0, ScoreCanvas.width, ScoreCanvas.height);
		var top = "Top";
		var Height = ScoreCanvas.height*0.18;
		for(var i=0; i<5; i++){
				setCtxFillStyle(ScoreCtx, i, true);
				ScoreCtx.fillText(top + (i+1) + ":", ScoreCanvas.width*0.05, Height * (i+1));
				setCtxFillStyle(ScoreCtx, i, false);
				ScoreCtx.fillText(Storage[i], ScoreCanvas.width*0.5, Height * (i+1));
			}
	}
	
	function setCtxFillStyle(ctx, i, isTop){
		if(isTop){
			switch(i){
				case 0:ctx.fillStyle = "rgb(51,0,255)";break;
				case 1:ctx.fillStyle = "rgb(51,51,255)";break;
				case 2:ctx.fillStyle = "rgb(51,102,255)";break;
				case 3:ctx.fillStyle = "rgb(51,153,255)";break;
				case 4:ctx.fillStyle = "rgb(51,204,255)";break;
			}
		}
		else{
			switch(i){
				case 0:ctx.fillStyle = "rgb(204,0,51)";break;
				case 1:ctx.fillStyle = "rgb(204,51,51)";break;
				case 2:ctx.fillStyle = "rgb(204,102,51)";break;
				case 3:ctx.fillStyle = "rgb(204,153,51)";break;
				case 4:ctx.fillStyle = "rgb(204,204,51)";break;
			}
		}
	}
	
	function initialize(){//初始化Storage
		var gameSuccess = ["Level2", "Level3"];
		for(var i=0; i<2; i++){
			if(Storage[gameSuccess[i]] == null)
				Storage.setItem(gameSuccess[i],0);
		}
		
		for(var i=0; i<5; i++){
			if(Storage[i] == null)
				Storage.setItem(i,0);
		}
		
        ScoreCanvas = document.createElement("canvas");//初始化计分画布
        ScoreCtx = ScoreCanvas.getContext("2d");
		ScoreCanvas.width = rect.width * 0.825;
		ScoreCanvas.height = rect.height * 0.825;

        dom.addClass(ScoreCanvas, "scores");
        HighScoreElement.appendChild(ScoreCanvas);
		
		ScoreCtx.font= (rect.height * 0.065) + "px Broken_Glass";
		drawScores();
	}
	
	function Reset(){//reset for Storage
		var gameSuccess = ["Level2", "Level3"];
		for(var i=0; i<2; i++){
			Storage.setItem(gameSuccess[i],0);
		}
		
		for(var i=0; i<5; i++){
			Storage.setItem(i,0);
		}
	}
	
	function StorageScore(score){//存储分数
		for(var i=0; i<5; i++){
			if(score>Storage[i]){
				SeatStorage(i);
				Storage.setItem(i,score);
				break;
			}
		}
	}
	
	function SeatStorage(key){//将分数排序
		if(key<4){
			for(var i=4; i>key; i--){
				Storage.setItem(i,Storage[i-1]);
			}
		}
	}
	
	return {
		initialize : initialize,
		Reset : Reset,
		StorageScore : StorageScore,
		run : run
    };
})();


	var Storage = window.localStorage;
/*-------------------------------*/