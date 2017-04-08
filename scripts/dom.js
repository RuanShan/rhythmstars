//It is a class created to help search out elements
stars.dom=(function() 
{
	var $=Sizzle;
	
	function hasClass(el,clsName)
	{
		var regex=new RegExp("(^|\\s)"+clsName+"(\\s|$)");
		return regex.test(el.className);
	}
	
	function addClass(el,clsName)
	{
		if (!hasClass(el,clsName))
		{
			el.className+=" "+clsName;
		}
	}
	
	function removeClass(el,clsName)
	{
		var regex=new RegExp("(^|\\s)"+clsName+"(\\s|$)");
		el.className=el.className.replace(regex,"");
	}
//This function help to bind the splash-screen but it don't have ability to disappear screens.
	function bind(element,event,handler)
	{
		if(typeof element=="string")
		{
			element=$(element)[0];
		}
		element.addEventListener(event,handler,false);	
	}
	
	return {
		$:$,
		hasClass:hasClass,
		addClass:addClass,
		removeClass:removeClass,
		bind:bind
	};
}
)();