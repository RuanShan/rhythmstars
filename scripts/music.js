/*-----------ZYB 2013.2.15------------*/
stars.music=function()
{
	const PATH="music/";
	const SOUNDS=['background','winner','loser','level1','level2','level3'];//---------RTF 2013.2.21-------------
	const EFFECTS=['back','level','mainmenu','pause','settings','splahscreen'];
	var gameAudioContext,gameAudioAnalyser,gameNodes={},gameSoundSource,gameEffectSource,gameSpectrum;
	var gameBuffers={};
	var stepS=parseFloat(document.getElementById("volume").step);
	var stepE=parseFloat(document.getElementById("sound-effect").step);
	
	var VolumeUp = false;//音量是否增大---RTF 5.18---
	var TrueValue;//音量记录---RTF 5.18---
	var RhythmLength;//储存Rhythm的数组与长度
	
	stars.music.prototype.initialize=function()//--------------初始化music  5.19----------------
	{
		var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
		gameAudioContext = new AudioContext();

		// try {
		//     var audioContext = new window.AudioContext();
		// } catch (e) {
		//     alert('Your browser does not support AudioContext!');
		// }

		gameAudioAnalyser=gameAudioContext.createAnalyser();
		gameAudioAnalyser.smoothingTimeConstant=0.85;
		gameAudioAnalyser.connect(gameAudioContext.destination);
		fetchSounds("SOUNDS");
		fetchSounds("EFFECTS");
		routeSound();
		
		var volume=document.getElementById("volume");
		var soundEffect=document.getElementById("sound-effect");
		volume.onchange=function(){gameNodes.soundVolume.gain.value=volume.value};
		soundEffect.onchange=function(){gameNodes.effectVolume.gain.value=soundEffect.value};
		//___________ZYB 2013.5.16____________________
		volume.addEventListener("touchstart", drag, false);
		soundEffect.addEventListener("touchstart", drag, false);
		
		function drag(e) {
			var touch = e.targetTouches[0],
				x = touch.clientX,
				y = touch.clientY,
				rect = this.getBoundingClientRect();
			e.preventDefault();	
				
			function move() {
				var	newX = touch.clientX,
				newY = touch.clientY;
				this.value=(newX-rect.left)/rect.width;
				if(this.id=="volume"){
					gameNodes.soundVolume.gain.value=volume.value;
				}
				else{
					gameNodes.effectVolume.gain.value=soundEffect.value;
				}
			}

			this.addEventListener("touchmove", move, false);
			
			this.addEventListener("touchend", function() {
				this.removeEventListener("touchmove", move);
			}, false);
		};
	
		function fetchSounds(audioType)
		{
			var temp=new Array;
			if(audioType==="SOUNDS")
			{
				temp=SOUNDS;
			}else if(audioType==="EFFECTS")
			{
				temp=EFFECTS;
			}
			var request=new XMLHttpRequest();
			for(var i=0,len=temp.length;i<len;i++)
			{
				request=new XMLHttpRequest();
				request._soundName=temp[i];
				request.open('GET',PATH+request._soundName+'.mp3',true);
				request.responseType='arraybuffer';

				request.addEventListener('load',bufferSound,false);
				request.send();
			}
		}
		
		function bufferSound(e)
		{
			var request = e.target;

			var buff=request.response;

			gameAudioContext.decodeAudioData(buff, function(buffer) {

                gameBuffers[request._soundName] = buffer;
            });
		}
		
		function routeSound()//---加载音乐文件---
		{
			gameNodes.soundVolume=gameAudioContext.createGain();
			gameNodes.effectVolume=gameAudioContext.createGain();
			var	soundVolume,effectVolume;
			soundVolume=document.getElementById("volume").value;
			effectVolume=document.getElementById("sound-effect").value;

			gameNodes.soundVolume.gain.value=soundVolume;
			gameNodes.effectVolume.gain.value=effectVolume;
			
			gameSoundSource=gameAudioContext.createBufferSource();
			gameEffectSource=gameAudioContext.createBufferSource();
					
			gameSoundSource.connect(gameNodes.soundVolume);
			gameEffectSource.connect(gameNodes.effectVolume);
			gameNodes.soundVolume.connect(gameAudioAnalyser);
			gameNodes.effectVolume.connect(gameAudioContext.destination);
		
		}
	}
	
	stars.music.prototype.Reset=function(){//----重置音量  5.18-----
		gameNodes.soundVolume.gain.value = 0.5;
		gameNodes.effectVolume.gain.value = 0.5;
	}
	
	stars.music.prototype.SetTrueValue=function(){//----记录音量大小  5.18-----
		TrueValue = gameNodes.soundVolume.gain.value;
	}
	
	stars.music.prototype.VolumeUp=function(){//----点击星球时增大音量  5.18-----
		if(!VolumeUp){
			if(gameNodes.soundVolume.gain.value < 0.5)
				gameNodes.soundVolume.gain.value *=2;
			else
				gameNodes.soundVolume.gain.value = 1;
			
			VolumeUp = true;
		}
		
		setTimeout(function(){
			gameNodes.soundVolume.gain.value=TrueValue;
			VolumeUp = false;
		},1000);
	}
	
	stars.music.prototype.playEffect=function(which,time)//---播放音效---
	{
		//route again.
		gameEffectSource=gameAudioContext.createBufferSource();
		gameEffectSource.connect(gameNodes.effectVolume);
		gameNodes.effectVolume.connect(gameAudioContext.destination);

		gameEffectSource.buffer=getEffectBuffer(which);
		gameEffectSource.start(0);
	}
	
	stars.music.prototype.playSound=function(which,loopOrNot,time)//---播放音乐---
	{
		if(time == null) time=0;
		//route again.
		gameSoundSource=gameAudioContext.createBufferSource();

		gameSoundSource.connect(gameNodes.soundVolume);

		gameNodes.soundVolume.connect(gameAudioAnalyser);
		gameSoundSource.buffer=getSoundBuffer(which);
		gameSoundSource.loop=loopOrNot;//是否循环
		gameSoundSource.start(0);
	}
	stars.music.prototype.pauseSound=function()//---暂停音乐 5.19---
	{
		gameSoundSource.disconnect();
		window.clearInterval(gameSpectrum);//停止分析节奏
	}
	
	stars.music.prototype.resumeSound=function()//---原处继续播放音乐 5.19---
	{
		gameSoundSource.connect(gameNodes.soundVolume);
		this.rhythm();//继续分析节奏
	}
	
	stars.music.prototype.rhythm=function(L)//--------------分析节奏  5.16----------------
	{
		//gameSpectrum=window.setInterval((function(param){return function(){statistic(param);};})(this),1000);
		gameSpectrum=window.setInterval(statistic,1000);
		if(L!=null)
			this.RhythmLength = L;
		else
			L = this.RhythmLength;

		/*-------------ZYB 2013.2.16-----TODO-----------*/
		function statistic(param)
		{
			var freqbyteData=new Uint8Array(gameAudioAnalyser.frequencyBinCount);
			gameAudioAnalyser.getByteFrequencyData(freqbyteData);
			var s=0;
			for(var i=9;i<10;i++)
			{
				s+=freqbyteData[i];
			}

			if(stars.musicalNode.MNodes.length < L){ //&& gameSoundSource.playbackState <= 2){
				stars.musicalNode.MNodes.push(new stars.musicalNode.MNode(s%4+1));
				stars.musicalNode.MNodesLength++;//统计产生音符数量
			}

			// if(/*gameSoundSource.playbackState > 2 &&*/ stars.display.GetMusicalNodes()==0){
			// 	window.clearInterval(gameSpectrum);//停止分析节奏
			// 	stars.display.EndGame();
			// }
			gameSoundSource.onended = function(){
				window.clearInterval(gameSpectrum);//停止分析节奏
				stars.display.EndGame();
			}
		}
	}
	
/*------------------helper functions----------*/	
	function getSoundBuffer(whichOne)
	{
		for(var i=0;i<SOUNDS.length;i++){
			if(SOUNDS[i]==whichOne){
				var soundName=SOUNDS[i];
				break;
			}
		}
		return gameBuffers[soundName];
	}
	function getEffectBuffer(whichOne)
	{
		for(var i=0;i<EFFECTS.length;i++){
			if(EFFECTS[i]==whichOne){
				var soundName=EFFECTS[i];
				break;
			}
		}
		return gameBuffers[soundName];
	}
/*---------------------------------------------*/
}

		var globeMusic=new stars.music();
		globeMusic.initialize();
