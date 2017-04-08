stars.space=(function() 
{
	var $=stars.dom.$;
	var rect=($("#game .background")[0]).getBoundingClientRect();
	var screenWidth=rect.width,screenHeight=rect.height;
	var planet=stars.planet,musicalNode=stars.musicalNode;
	var settings = stars.settings, numdifficultLevel, numPlanetTypes, numStateTypes, numMusicalNodeTypes = 0;
	
	/*-----------游戏参数------------*/
	var GameScore = 0;
	var RunningOrNot=false;//是否运行中
	//var difficultLevel, power, state, numMusicalNode;
	/*------------------------------------*/	

	
	function initialize(callback)
	{
		numdifficultLevel=settings.numdifficultLevel;
		numPlanetTypes=settings.numPlanetTypes;
		numStateTypes=settings.numStateTypes;
		numMusicalNodeTypes=settings.numMusicalNodeTypes;
		baseScore=settings.baseScore;
		fillSpace();
		callback();
	}
	
	function fillSpace()
	{
		//the parameters need change to fit the screen
		var radius;
		if(screenWidth<screenHeight)
		{
			radius=screenWidth/6.5;
		}
		else
		{
			radius=screenHeight/6.5;
		}
		
		planet.PlanetR=radius;//星球操作半径
		/*-------------------RTF  3013.3.27----------------------------------*/
		planet.Planets[1]=(new planet.Planet(Math.round(screenWidth*7/30),Math.round(screenHeight*12/30),radius,1));
		planet.Planets[2]=(new planet.Planet(Math.round(screenWidth*8/30),Math.round(screenHeight*23/30),radius,2));
		planet.Planets[3]=(new planet.Planet(Math.round(screenWidth*20/30),Math.round(screenHeight*18/30),radius,3));
		planet.Planets[4]=(new planet.Planet(Math.round(screenWidth*25/30),Math.round(screenHeight*26/30),radius,4));
		/*-------------------------------------------------------------------*/


	}
			


	
	function checkpos(x,y)
	{
		if(x<0||x>screenWidth||y<0||y>screenHeight)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	function checkLength(x1,y1,x2,y2)
	{
		return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
	}

	function checkInside(x1,y1,x2,y2,r)
	{
		var s=checkLength(x1,y1,x2,y2);
		if(checkpos(x1,y1)&&checkpos(x2,y2)&&s<=r)
		{
			return true;
		}
		else
		{
			return false;
		}
		
	}
	
	function whichPlanet(x,y)
	{
		var whichPlanet=0;
		for(var i=1;i<=numPlanetTypes;i++)
		{
			var planetX=planet.get(i,"PosX"),planetY=planet.get(i,"PosY"),r=planet.get(i,"radius");
			if(checkInside(x,y,planetX,planetY,r))
			{
				whichPlanet=i;
				break;
			}
		}
		return whichPlanet;
	}
	
	return {
		$:$,
		initialize : initialize,
		checkLength : checkLength,
		checkInside : checkInside,
        whichPlanet : whichPlanet,
		RunningOrNot : RunningOrNot,
		GameScore : GameScore,
	};
}
)();