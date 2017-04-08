stars.input=(function() 
{
	var dom=stars.dom,$=dom.$,settings=stars.settings,inputHandlers;
	var keys=
	{
		13:"KEY_ENTER",
		32:"KEY_SPACE",
		37:"KEY_LEFT",
		38:"KEY_UP",
		39:"KEY_RIGHT",
		40:"KEY_DOWN"
		
		
	};
	
	function initialize()
	{
		inputHandlers={};
		var space=$("#game-screen .game-space")[0];
		dom.bind(space,"mousedown",function(event)
		{
			handleClick(event,"CLICK",event);
		});
		dom.bind(space,"touchstart",function(event)
		{
			handleClick(event,"TOUCH",event.targetTouches[0]);
		});
		dom.bind(document,"keydown",function(event)
		{
			var keyName=keys[event.keyCode];
			if(keyName&&settings.controls[keyName])
			{
				event.preventDefault();
				trigger(settings.controls[keyName]);
			}
		});
	}
	
	function handleClick(event,control,click)
	{
		var action=settings.controls[control];
		if(!action)
		{
			return;
		}
		//there is a little bit wrong
		var space=$("#game-screen .game-space")[0],
		rect=space.getBoundingClientRect(),relX,relY;
		relX=click.clientX-rect.left;
		relY=click.clientY-rect.top;
		trigger(action,relX,relY);
		event.preventDefault();
	}
	
	function bind(action,handler)
	{
		//bind a handler function to a game action
		if(!inputHandlers[action])
		{
			inputHandlers[action]=[];
		}
		inputHandlers[action].push(handler);
	}
	
	function trigger(action)
	{
		//trigger a game action
		var handlers=inputHandlers[action],
		args=Array.prototype.slice.call(arguments,1);
		if(handlers)
		{
			for(var i=0;i<handlers.length;i++)
			{
				handlers[i].apply(null,args);
			}
		}

	}
	
	return {
		initialize:initialize,
		bind:bind
	};
}
)();