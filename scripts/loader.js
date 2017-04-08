var stars = {
    screens : {},
	settings:{
		baseScore:0,
		numdifficultLevel:3,
		numPlanetTypes:4,
		numStateTypes:3, //normal=1,high=2,very high=3
		numMusicalNodeTypes:3,
		controls:{
			KEY_UP:"moveUp",
			KEY_LEFT:"moveLeft",
			KEY_DOWN:"moveDown",
			KEY_RIGHT:"moveRight",
			KEY_ENTER:"tapPlanet",
			KEY_SPACE:"tapPlanet",
			CLICK:"tapPlanet",
			TOUCH:"tapPlanet",
		}
	},
	images:{}
};

window.addEventListener("load", function() {
	//dentermin musicalNode size
	var musicalNodeProto=document.getElementById("musicalNode-proto"),
	rect=musicalNodeProto.getBoundingClientRect();
	stars.settings.musicalNodeSize=rect.width;

Modernizr.addTest("standalone", function() {
    return (window.navigator.standalone != false);
});

//entend yepnope with preloading
yepnope.addPrefix("preload",function(resource){
	resource.noexec=true;
	return resource;
});

var numPreload=0,numLoaded=0;
yepnope.addPrefix("loader",function(resource){
	//console.log("Loading: "+resource.url);
	var isImage=/.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec=isImage;
	numPreload++;
	resource.autoCallback=function(e)
	{
		//console.log("Finished loading: " + resource.url);
		numLoaded++;
		if(isImage)
		{
			var image=new Image();
			image.src=resource.url;
			stars.images[resource.url]=image;
		}
	};
	return resource;
});

function getLoadProgress()
{
	if(numPreload>0)
	{
		return numLoaded/numPreload;
	}
	else
	{
		return 1;
	}

}
// loading stage 1
Modernizr.load([
{ 
    load : [
        "scripts/sizzle.js",
        "scripts/dom.js",
        "scripts/game.js",
		
		"loader!images/GameLogo.png",//主Logo
		"loader!images/main-menu1.png",//主背景
		"loader!images/main-menu2.png",
		"loader!images/main-menu3.png",
		"loader!images/progress.png",//进度条与火箭
		"loader!images/progress_rocket1.png",
		"loader!images/progress_rocket2.png",
		"loader!images/progress_rocket3.png",

    ]
},{
    test : Modernizr.standalone,
    yep : "scripts/screen.splash.js",
    nope : "scripts/screen.splash-install.js",
    complete : function() {
/*-------------------ZYB 2013.2.14---------------------------*/
        stars.game.gameSetup();
/*-----------------------------------------------------------*/
        if (Modernizr.standalone) {
            stars.game.showScreen("splash-screen",getLoadProgress);
        } else {
            stars.game.showScreen("install-screen");
        }
    }
}
]);


// loading stage 2
if (Modernizr.standalone) {
    Modernizr.load([
    {
        load : [
		
        "loader!scripts/tween.js","loader!scripts/object.js","loader!scripts/planet.js","loader!scripts/musicalNode.js","loader!scripts/space.js","loader!scripts/display.canvas.js",
		"loader!scripts/input.js","loader!scripts/screen.main-menu.js","loader!scripts/screen.settings.js","loader!scripts/screen.about.js",
		"loader!scripts/screen.highscore.js","loader!scripts/screen.game.js","loader!scripts/screen.help.js",

		"loader!images/blue1.png",//四个星球
		"loader!images/blue2.png",
		"loader!images/blue3.png",
		"loader!images/blue4.png",
		"loader!images/blue5.png",
		"loader!images/blue6.png",
		"loader!images/purple1.png",
		"loader!images/purple2.png",
		"loader!images/purple3.png",
		"loader!images/purple4.png",
		"loader!images/purple5.png",
		"loader!images/purple6.png",
		"loader!images/purple7.png",
		"loader!images/purple8.png",
		"loader!images/purple9.png",
		"loader!images/purple10.png",
		"loader!images/purple11.png",
		"loader!images/purple12.png",
		"loader!images/purple13.png",
		"loader!images/purple14.png",
		"loader!images/brown1.png",
		"loader!images/brown2.png",
		"loader!images/brown3.png",
		"loader!images/brown4.png",
		"loader!images/brown5.png",
		"loader!images/brown6.png",
		"loader!images/brown7.png",
		"loader!images/green1.png",
		"loader!images/green2.png",
		"loader!images/green3.png",
		"loader!images/green4.png",
		"loader!images/green5.png",
		"loader!images/green6.png",
		"loader!images/green7.png",
		
		"loader!images/blueBurst.png",//星球发光效果
		"loader!images/brownBurst.png",
		"loader!images/purpleBurst.png",
		"loader!images/greenBurst.png",
		
		"loader!images/BlackGround1.jpg",//三个关卡背景——黑
		"loader!images/BlackGround2.jpg",
		"loader!images/BlackGround3.jpg",
		"loader!images/BlackGround4.jpg",
		"loader!images/BlackGround5.jpg",
		"loader!images/BlackGround6.jpg",
		"loader!images/BlackGround7.jpg",
		"loader!images/BlackGround8.jpg",
		"loader!images/BlackGround9.jpg",
		"loader!images/BlackGround10.jpg",
		
		"loader!images/PurpleGround1.jpg",//三个关卡背景——紫
		"loader!images/PurpleGround2.jpg",
		"loader!images/PurpleGround3.jpg",
		"loader!images/PurpleGround4.jpg",
		"loader!images/PurpleGround5.jpg",
		"loader!images/PurpleGround6.jpg",
		"loader!images/PurpleGround7.jpg",
		"loader!images/PurpleGround8.jpg",
		"loader!images/PurpleGround9.jpg",
		"loader!images/PurpleGround10.jpg",
		
		"loader!images/GreenGround1.jpg",//三个关卡背景——绿
		"loader!images/GreenGround2.jpg",
		"loader!images/GreenGround3.jpg",
		"loader!images/GreenGround4.jpg",
		"loader!images/GreenGround5.jpg",
		"loader!images/GreenGround6.jpg",
		"loader!images/GreenGround7.jpg",
		"loader!images/GreenGround8.jpg",
		"loader!images/GreenGround9.jpg",
		"loader!images/GreenGround10.jpg",
		"loader!images/GreenGround11.jpg",
		"loader!images/GreenGround12.jpg",
		"loader!images/GreenGround13.jpg",
		"loader!images/GreenGround14.jpg",
		"loader!images/GreenGround15.jpg",
		
		"loader!images/GB1.png",//游戏背景切换
		"loader!images/GB2.png",
		"loader!images/GB3.png",
		"loader!images/GB4.png",
		"loader!images/GB5.png",
		"loader!images/GB6.png",
		"loader!images/GB7-Black.png",
		"loader!images/GB8-Black.png",
		"loader!images/GB9-Black.png",
		"loader!images/GB7-Green.png",
		"loader!images/GB8-Green.png",
		"loader!images/GB9-Green.png",
		"loader!images/GB7-Purple.png",
		"loader!images/GB8-Purple.png",
		"loader!images/GB9-Purple.png",
		
		"loader!images/game-screen.png",//各个界面背景
		"loader!images/high-score.png",
		"loader!images/about1.png",
		"loader!images/about2.png",
		"loader!images/about3.png",
		"loader!images/about4.png",
		"loader!images/about5.png",
		"loader!images/about6.png",
		"loader!images/about7.png",
		"loader!images/about8.png",
		"loader!images/about9.png",
		"loader!images/settings1.png",
		"loader!images/settings2.png",
		"loader!images/settings3.png",
		"loader!images/settings4.png",
		"loader!images/settings5.png",
		"loader!images/settings6.png",
		"loader!images/settings7.png",
		"loader!images/pause-screen1.png",
		"loader!images/pause-screen2.png",
		"loader!images/pause-screen3.png",
		"loader!images/pause-screen4.png",
		"loader!images/pause-screen5.png",
		"loader!images/pause-screen6.png",
		"loader!images/pause-screen7.png",
		"loader!images/pause-screen8.png",
		"loader!images/pause-screen9.png",
		"loader!images/pause-screen10.png",
		
		"loader!images/NewGame.png",//主选单按键
		"loader!images/HighScoreB.png",
		"loader!images/SettingsB.png",
		"loader!images/AboutB.png",
		"loader!images/NewGame2.png",
		"loader!images/HighScoreB2.png",
		"loader!images/SettingsB2.png",
		"loader!images/AboutB2.png",
		
		"loader!images/LevelLocked.png",//选关界面按键
		"loader!images/Back.png",
		"loader!images/Back2.png",
		"loader!images/Level1.png",
		"loader!images/Level1-2.png",
		"loader!images/Level2.png",
		"loader!images/Level2-2.png",
		"loader!images/Level3.png",
		"loader!images/Level3-2.png",
		
		"loader!images/Pause.png",//暂停界面按键
		"loader!images/Pause2.png",
		"loader!images/Resume.png",
		"loader!images/Resume2.png",
		"loader!images/Retry.png",
		"loader!images/Retry2.png",
		"loader!images/Menu.png",
		"loader!images/Menu2.png",
		
		"loader!images/Cancel.png",//其他设置按键
		"loader!images/Cancel2.png",
		"loader!images/Effect.png",
		"loader!images/Volume.png",
		
		"loader!images/BlackNode1.png",//四种音符		
		"loader!images/BlackNode2.png",		
		"loader!images/BlackNode3.png",		
		"loader!images/BlackNode1-B.png",		
		"loader!images/BlackNode2-B.png",		
		"loader!images/BlackNode3-B.png",
		"loader!images/PurpleNode1.png",
		"loader!images/PurpleNode2.png",
		"loader!images/PurpleNode3.png",
		"loader!images/PurpleNode1-B.png",
		"loader!images/PurpleNode2-B.png",
		"loader!images/PurpleNode3-B.png",
		"loader!images/BrownNode1.png",
		"loader!images/BrownNode2.png",
		"loader!images/BrownNode3.png",
		"loader!images/BrownNode1-B.png",
		"loader!images/BrownNode2-B.png",
		"loader!images/BrownNode3-B.png",
		"loader!images/GreenNode1.png",
		"loader!images/GreenNode2.png",
		"loader!images/GreenNode3.png",
		"loader!images/GreenNode1-B.png",
		"loader!images/GreenNode2-B.png",
		"loader!images/GreenNode3-B.png",
		
		"loader!scripts/music.js",//最耗时
		
		]
    }
    ]);
}

}, false);
