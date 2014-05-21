	
	var trace = function(str){ console.log(str); };
	
	$(document).ready( function(){ init(); } );
	
	var t;
	
	var spaceSquidReplayDelay;
	
	function init()
	{
		display_init();
		
		screenUpdateInit(true);
		
		timerList_init();
		
		microBattleSequence_init();
	}
	
	function microBattleSequence_init()
	{
		var mbs_delay;
		
		mbs_delay = new AnimationTimer();
		
		timerList_add(mbs_delay);
		mbs_delay.time(2, microBattleSequence_boss);	
	}
	
	function microBattleSequence_boss()
	{
		var mbs_delay;
		
		$(".boss-armL-Cont").addClass("boss-armL-Cont-UP");
		$(".boss-armR-Cont").addClass("boss-armL-Cont-UP");
		
		mbs_delay = new AnimationTimer();
		
		timerList_add(mbs_delay);
		mbs_delay.time(2, microBattleSequence_scrollDown);
	}
	
	function microBattleSequence_scrollDown()
	{
		var mbs_css;
		var mbs_scroll = -1560; // -1480; // -1640;
		
		mbs_css = 	{
						"-webkit-transform"	: "translateY(" + mbs_scroll + "px)",
						"transform"			: "translateY(" + mbs_scroll + "px)"
					};
				
		$(".stage-view-y").css(mbs_css);
		
		$("#microBattle_wrapper .stage-view-y")[0].addEventListener("webkitTransitionEnd", microBattleSequence_inView, false);
		$("#microBattle_wrapper .stage-view-y")[0].addEventListener("transitionend", microBattleSequence_inView, false);
	}
	
	function microBattleSequence_inView(event)
	{
		var mbs_level_delay;
		
		$("#microBattle_wrapper .stage-view-y")[0].removeEventListener("webkitTransitionEnd", microBattleSequence_inView, false);
		$("#microBattle_wrapper .stage-view-y")[0].removeEventListener("transitionend", microBattleSequence_inView, false);	
		
		spaceSquids_setup();
		
		mbs_level_delay = new AnimationTimer();
		
		timerList_add(mbs_level_delay);
		mbs_level_delay.time(1, microBattleSequence_fadeOutLevel);		
	}
	
	function microBattleSequence_fadeOutLevel()
	{
		var css;
		
		css = 	{
					"-webkit-transform" : "translateY(0%)",
					"transform"			: "translateY(0%)"
				};
				
		$(".microBattle_fade_main").css(css);
		
		$(".microBattle_weather").css("opacity", "0");
		
		$(".tween-microBattleWeatherFade")[0].addEventListener("webkitTransitionEnd", microBattleSequence_startBattle, false);
		$(".tween-microBattleWeatherFade")[0].addEventListener("transitionend", microBattleSequence_startBattle, false);
		
		spaceSquids_animationStart();
	}
	
	function microBattleSequence_startBattle(event)
	{
		$(".tween-microBattleWeatherFade")[0].removeEventListener("webkitTransitionEnd", microBattleSequence_startBattle, false);
		$(".tween-microBattleWeatherFade")[0].removeEventListener("transitionend", microBattleSequence_startBattle, false);		
	
		$("#player1 .map-goat-head").removeClass("mapPlayer_head_default").addClass("mapPlayer_head_fear");
		$("#player2 .map-enemy_40x40-head").removeClass("map-enemy_40x40_head_default").addClass("map-enemy_40x40_head_fear");
		
		battleNav_init();
	}
	
	function battleNav_init()
	{
		var css;		
	
		$(".tween-battle-cloud")[0].addEventListener("webkitTransitionEnd", battleNav_inView, false);
		$(".tween-battle-cloud")[0].addEventListener("transitionend", battleNav_inView, false);
		
		css = 	{
					"-webkit-transform" : "translateY(" + 0 + "px)",
					"transform" 		: "translateY(" + 0 + "px)"			
				};
				
		$("#battle-cloud").css(css);
	}
	
	function battleNav_inView(event)
	{
		$(".tween-battle-cloud")[0].removeEventListener("webkitTransitionEnd", battleNav_inView, false);
		$(".tween-battle-cloud")[0].removeEventListener("transitionend", battleNav_inView, false);		
	}
	
	function spaceSquids_setup()
	{
		if(DISPLAY._width < 480)
		{
			$("#spaceSquid0").remove();
			$("#spaceSquid1").remove();	
		}
		
		else
		{
			spaceSquids_animationInit();
			
			spaceSquidReplayDelay = new AnimationTimer();
			timerList_add(spaceSquidReplayDelay);			
		}
	}
	
	function spaceSquids_animationInit()
	{
		var css;
		
		css	=	{
					"-webkit-transform" : "translateY(" + DISPLAY._height  + "px)",
					"transform" : "translateY(" + DISPLAY._height  + "px)"
				};
		
		$("#spaceSquid0").css(css);
		$("#spaceSquid1").css(css);	
	}
	
	function spaceSquids_animationStart()
	{
		var css;
		var final_y = 240;
		
		$("#spaceSquid0").addClass("tween-spaceSquidMain");
		$("#spaceSquid1").addClass("tween-spaceSquidMain");
		
		$(".tween-spaceSquidMain")[0].addEventListener("webkitTransitionEnd", spaceSquids_animationMid, false);
		$(".tween-spaceSquidMain")[0].addEventListener("transitionend", spaceSquids_animationMid, false);
		
		css	=	{
					"-webkit-transform" : "translateY(" + final_y + "px)",
					"transform" 		: "translateY(" + final_y + "px)"
				};
		
		$("#spaceSquid0").css(css);
		$("#spaceSquid1").css(css);
	}

	function spaceSquids_animationMid(event)
	{
		$(".tween-spaceSquidMain")[0].removeEventListener("webkitTransitionEnd", spaceSquids_animationMid, false);
		$(".tween-spaceSquidMain")[0].removeEventListener("transitionend", spaceSquids_animationMid, false);
		
		$("#spaceSquid0 .spaceSquid_legs0").addClass("tween-SpaceSquid_legsStop");
		$("#spaceSquid0 .spaceSquid_legs1").addClass("tween-SpaceSquid_legsStop");
		
		$("#spaceSquid1 .spaceSquid_legs0").addClass("tween-SpaceSquid_legsStop");
		$("#spaceSquid1 .spaceSquid_legs1").addClass("tween-SpaceSquid_legsStop");
		
		
		// battleNav_init();
		
		spaceSquidReplayDelay.time(4, spaceSquids_animationReturn);	
	}
	
	function spaceSquids_animationReturn()
	{
		var css;
		
		css	=	{
					"-webkit-transform" : "translateY(" + DISPLAY._height + "px)",
					"transform" : "translateY(" + DISPLAY._height + "px)"
				};
		
		$("#spaceSquid0 .spaceSquid_legs0").removeClass("tween-SpaceSquid_legsStop").addClass("tween-SpaceSquid_legsPlay");
		$("#spaceSquid0 .spaceSquid_legs1").removeClass("tween-SpaceSquid_legsStop").addClass("tween-SpaceSquid_legsPlay");
		
		$("#spaceSquid1 .spaceSquid_legs0").removeClass("tween-SpaceSquid_legsStop").addClass("tween-SpaceSquid_legsPlay");
		$("#spaceSquid1 .spaceSquid_legs1").removeClass("tween-SpaceSquid_legsStop").addClass("tween-SpaceSquid_legsPlay");
		
		
		$("#spaceSquid0").css(css);
		$("#spaceSquid1").css(css);
		
		$(".tween-spaceSquidMain")[0].addEventListener("webkitTransitionEnd", spaceSquids_animationEnd, false);
		$(".tween-spaceSquidMain")[0].addEventListener("transitionend", spaceSquids_animationEnd, false);				
	}
	
	function spaceSquids_animationEnd(event)
	{
		$(".tween-spaceSquidMain")[0].removeEventListener("webkitTransitionEnd", spaceSquids_animationEnd, false);
		$(".tween-spaceSquidMain")[0].removeEventListener("transitionend", spaceSquids_animationEnd, false);
		
		$("#spaceSquid0").removeClass("tween-spaceSquidMain");
		$("#spaceSquid1").removeClass("tween-spaceSquidMain");		
		
		// spaceSquids_animationInit();
		
		// spaceSquidReplayDelay.time(1, spaceSquids_animationStart);	
	}
	