	
	var trace = function(str){ console.log(str); };
	
	$(document).ready( function(){ init(); } );
	
	var t;
	
	var spaceSquidsUse = false;
	
	var microBattleData_HTML_battleNav = "";
	var microBattleData_HTML_fadeWrapper = "";
	
	var BATTLE_NAV;
	
	function init()
	{
		display_init();
		
		screenUpdateInit(true);
		
		timerList_init();
		
		microBattleSequence_init();
	
		microBattleSequence_storeData();
	}
	
	function microBattleSequence_storeData()
	{
		microBattleData_HTML_battleNav = $("#battle-nav").html();
		microBattleData_HTML_fadeWrapper = $("#microBattle_fade_wrapper").html();
		
		$("#battle-nav").html("");
		$("#microBattle_fade_wrapper").html("");
	}
	
	function microBattleSequence_addData()
	{
		$("#battle-nav").html(microBattleData_HTML_battleNav);
		$("#microBattle_fade_wrapper").html(microBattleData_HTML_fadeWrapper);
		
		microBattleSequence_sceneReady();	
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
		$("#microBattle_wrapper .stage-view-y")[0].removeEventListener("webkitTransitionEnd", microBattleSequence_inView, false);
		$("#microBattle_wrapper .stage-view-y")[0].removeEventListener("transitionend", microBattleSequence_inView, false);	
		
		microBattleSequence_addData();		
	}
	
	function microBattleSequence_sceneReady()
	{
		var mbs_level_delay;
		
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
		
		if(spaceSquidsUse)
		{
			spaceSquids_animationStart();	
		}
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
		BATTLE_NAV = {};
		
		BATTLE_NAV.settings = {};
		
		BATTLE_NAV.settings.y_max = 211;
		
		BATTLE_NAV.settings.y_hide = 	{
											"-webkit-transform" : "translateY(" + -BATTLE_NAV.settings.y_max + "px)",
											"transform" 		: "translateY(" + -BATTLE_NAV.settings.y_max + "px)"
										};
								
		BATTLE_NAV.settings.y_show = 	{
											"-webkit-transform" : "translateY(0px)",
											"transform" 		: "translateY(0px)"			
										};
		
		BATTLE_NAV.settings.options_show = "battle-nav-show";
		BATTLE_NAV.settings.options_hide = "battle-nav-hide";								
		BATTLE_NAV.settings.options_tween = "tween-battle-nav";
		
				
		BATTLE_NAV.options = {};
		
		BATTLE_NAV.options.stone = $("#battle-nav #battle-stone");
		BATTLE_NAV.options.paper = $("#battle-nav #battle-paper");
		BATTLE_NAV.options.scissors = $("#battle-nav #battle-scissors");
		
		
		BATTLE_NAV.player_1 = {};
		BATTLE_NAV.player_2 = {};
		
		BATTLE_NAV.player_1.head = $("#battle-nav-player1 .battleCute-warrior-head");
		BATTLE_NAV.player_1.headType = "goat";
		
		BATTLE_NAV.player_2.head = $("#battle-nav-player2 .battleCute-warrior-head");
		BATTLE_NAV.player_2.headType = "bird";
		
		
		BATTLE_NAV.game = {};
		
		BATTLE_NAV.game.result = "LOSE";
										
		battleNav_show();
	}
	
	function battleNav_show()
	{
		$(".tween-battle-cloud")[0].addEventListener("webkitTransitionEnd", battleNav_inView, false);
		$(".tween-battle-cloud")[0].addEventListener("transitionend", battleNav_inView, false);
				
		$("#battle-cloud").css(BATTLE_NAV.settings.y_show);		
	}
	
	function battleNav_inView(event)
	{
		$(".tween-battle-cloud")[0].removeEventListener("webkitTransitionEnd", battleNav_inView, false);
		$(".tween-battle-cloud")[0].removeEventListener("transitionend", battleNav_inView, false);		
	
		battleNav_control(true);
	}
	
	function battleNav_control(run)
	{
		// IF ELSE FOR TOUCH OR MOUSE NEEDED FOR EVENTS MOUSE ONLY
		
		for(var optionItem in BATTLE_NAV.options)
		{
			if(run)
			{
				$(BATTLE_NAV.options[optionItem]).css("cursor", "pointer");
				
				$(BATTLE_NAV.options[optionItem])[0].addEventListener("mouseover", battleNav_controlEvent, false);	
				$(BATTLE_NAV.options[optionItem])[0].addEventListener("mouseout", battleNav_controlEvent, false);	
				$(BATTLE_NAV.options[optionItem])[0].addEventListener("click", battleNav_controlEvent, false);	
			}
			
			else
			{
				$(BATTLE_NAV.options[optionItem]).css("cursor", "default");
				
				$(BATTLE_NAV.options[optionItem])[0].removeEventListener("mouseover", battleNav_controlEvent, false);	
				$(BATTLE_NAV.options[optionItem])[0].removeEventListener("mouseout", battleNav_controlEvent, false);	
				$(BATTLE_NAV.options[optionItem])[0].removeEventListener("click", battleNav_controlEvent, false);				
			}
		}
	}
	
	function battleNav_controlEvent(event)
	{
		switch(event.type)
		{
			case "mouseover":
			{
				$(event.target).css("opacity", "0.5");
				
				break;
			}
			
			case "mouseout":
			{
				$(event.target).css("opacity", "1");
				
				break;
			}
			
			case "click":
			{
				$(event.target).css("opacity", "1");
				
				battleNav_selection(event.target.parentNode.id); //parentElement ?
				
				break;
			}
		}
	}
	
	function battleNav_selection(selected)
	{
		var selectionDelay;
		
		battleNav_control(false);
		
		$("#info-cloud").css("opacity", "0");
		
		if(selected === "battle-stone")
		{
			BATTLE_NAV.player_1.selection = "stone";
		}
		
		if(selected === "battle-paper")
		{
			BATTLE_NAV.player_1.selection = "paper";
		}
		
		if(selected === "battle-scissors")
		{
			BATTLE_NAV.player_1.selection = "scissors";
		}
		
		$("#" + selected + " .battleNavShock").css("opacity", 1);
		$("#" + selected + " div[class*='battleNavSprite-']").addClass("tween-battle-selected");
		
		// AFTER LOGIC DECIDED!!!
		battleNav_logicDisplay();
		// AFTER LOGIC DECIDED!!!
		
		selectionDelay = new AnimationTimer();
		
		timerList_add(selectionDelay);
		selectionDelay.time(1, battleNav_removeSelection);
	}
	
	function battleNav_logicDisplay()
	{
		switch(BATTLE_NAV.game.result)
		{
			case "WIN":
			{
				if(BATTLE_NAV.player_1.selection === "stone")
				{
					BATTLE_NAV.player_2.selection = "scissors";
				}
				
				if(BATTLE_NAV.player_1.selection === "paper")
				{
					BATTLE_NAV.player_2.selection = "stone";
				}
				
				if(BATTLE_NAV.player_1.selection === "scissors")
				{
					BATTLE_NAV.player_2.selection = "paper";
				}
								
				break;
			}
			
			case "DRAW":
			{
				BATTLE_NAV.player_2.selection = BATTLE_NAV.player_1.selection;
				
				break;
			}
			
			case "LOSE":
			{
				if(BATTLE_NAV.player_1.selection === "stone")
				{
					BATTLE_NAV.player_2.selection = "paper";
				}
				
				if(BATTLE_NAV.player_1.selection === "paper")
				{
					BATTLE_NAV.player_2.selection = "scissors";
				}
				
				if(BATTLE_NAV.player_1.selection === "scissors")
				{
					BATTLE_NAV.player_2.selection = "stone";
				}
				
				break;
			}
		}
	}
	
	function battleNav_removeSelection()
	{
		$("." + BATTLE_NAV.settings.options_tween)[0].addEventListener("webkitTransitionEnd", battleNav_removeSelectionEnd, false);
		$("." + BATTLE_NAV.settings.options_tween)[0].addEventListener("transitionend", battleNav_removeSelectionEnd, false);
		
		$("#battle-nav").removeClass(BATTLE_NAV.settings.options_show).addClass(BATTLE_NAV.settings.options_hide);		
	}
	
	function battleNav_removeSelectionEnd(event)
	{
		$("." + BATTLE_NAV.settings.options_tween)[0].removeEventListener("webkitTransitionEnd", battleNav_removeSelectionEnd, false);
		$("." + BATTLE_NAV.settings.options_tween)[0].removeEventListener("transitionend", battleNav_removeSelectionEnd, false);
		
		if(spaceSquidsUse)
		{
			spaceSquids_animationReturn();	
		}
		
		battleNav_populate();		
	}
	
	function battleNav_populate()
	{
		$("#battle-nav").html("");
		
		$(BATTLE_NAV.player_1.head).addClass("battleCute-warrior-head-" + BATTLE_NAV.player_1.headType);
		$("#battle-nav-player1 .battleCute-eyes-sprite").addClass("battleCute-eyes-look-R");
		$("#battle-nav-player1 .battleCute-speak-icon").addClass("battleCute-" + BATTLE_NAV.player_1.selection);
		
		$(BATTLE_NAV.player_2.head).addClass("battleCute-warrior-head-" + BATTLE_NAV.player_2.headType);
		$("#battle-nav-player2 .battleCute-eyes-sprite").addClass("battleCute-eyes-look-L");
		$("#battle-nav-player2 .battleCute-speak-icon").addClass("battleCute-" + BATTLE_NAV.player_2.selection);
		
		$("#battle-nav-fight").addClass("tween-battle-nav-fight");
		
		battleNav_showBattle();
	}
	
	function battleNav_showBattle()
	{
		$("#battle-nav-fight").css(BATTLE_NAV.settings.y_show);
		
		$(".tween-battle-nav-fight")[0].addEventListener("webkitTransitionEnd", battleNav_showBattleInPlace, false);
		$(".tween-battle-nav-fight")[0].addEventListener("transitionend", battleNav_showBattleInPlace, false);		
	}
	
	function battleNav_showBattleInPlace(event)
	{
		var intoCountDownDelay;
		
		$(".tween-battle-nav-fight")[0].removeEventListener("webkitTransitionEnd", battleNav_showBattleInPlace, false);
		$(".tween-battle-nav-fight")[0].removeEventListener("transitionend", battleNav_showBattleInPlace, false);
		
		intoCountDownDelay = new AnimationTimer();
		timerList_add(intoCountDownDelay);
		intoCountDownDelay.time(1, battleNav_startBattleCountDown);
	}
	
	function battleNav_startBattleCountDown()
	{
		$("#battle-nav-player1 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-look-R").addClass("battleCute-eyes-look-C");
		
		$("#battle-nav-player2 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-look-L").addClass("battleCute-eyes-look-C");
		
		
		
		
		$("#battle-nav-playerBird .battleCute-bird-board").addClass("tween-battleCute-bird-countDown");
		
	 	$("#battle-nav-playerBird .battleCute-bird-arm-left .battleCute-bird-board")[0].addEventListener("webkitAnimationEnd", battleNav_startBattleCountDownSequence, false);
	 	$("#battle-nav-playerBird .battleCute-bird-arm-left .battleCute-bird-board")[0].addEventListener("animationend", battleNav_startBattleCountDownSequence, false);		
	}
	
	function battleNav_startBattleCountDownSequence(event)
	{
	 	$("#battle-nav-playerBird .battleCute-bird-arm-left .battleCute-bird-board")[0].removeEventListener("webkitAnimationEnd", battleNav_startBattleCountDownSequence, false);
	 	$("#battle-nav-playerBird .battleCute-bird-arm-left .battleCute-bird-board")[0].removeEventListener("animationend", battleNav_startBattleCountDownSequence, false);
	 	
	 	$("#battle-nav-playerBird .battleCute-bird-arm-inner").addClass("tween-battleCute-bird-arm-main-fire");
	 			
	 	$("#battle-nav-playerBird .battleCute-eyes-sprite").removeClass("battleCute-eyes-norm").addClass("battleCute-eyes-happy");
	 	
	 	$("#battle-nav-playerBird .battleCute-bird-arm-main").addClass("tween-battleCute-bird-arm-main-intoFly");
	 			
	 	$("#battle-nav-playerBird .battleCute-bird-arm-main")[0].addEventListener("webkitAnimationEnd", battleNav_clearStageForFightInit, false);
	 	$("#battle-nav-playerBird .battleCute-bird-arm-main")[0].addEventListener("animationend", battleNav_clearStageForFightInit, false);
	 	
	 	$("#info-cloud").css("opacity", "1");		
	}
	
	function battleNav_clearStageForFightInit(event)
	{
	 	var clearStage;
	 	
	 	$("#battle-nav-playerBird .battleCute-bird-arm-main")[0].removeEventListener("webkitAnimationEnd", battleNav_clearStageForFightInit, false);
	 	$("#battle-nav-playerBird .battleCute-bird-arm-main")[0].removeEventListener("animationend", battleNav_clearStageForFightInit, false);
	 	
	 	clearStage = new AnimationTimer();
	 	timerList_add(clearStage);
	 	clearStage.time(1, battleNav_clearStageForFight);	
	}
	
	function battleNav_clearStageForFight()
	{
		$("#info-cloud").css("opacity", "0");
		
		$("#battle-nav-playerBird .battleCute-bird-arm-main").removeClass("tween-battleCute-bird-arm-main-intoFly").addClass("tween-battleCute-bird-arm-main");
	 			
	 	$("#battle-nav-playerBird").addClass("tween-bird-flapAway");	
	
	 	$("#battle-nav-playerBird")[0].addEventListener("webkitAnimationEnd", battleNav_clearedStage, false);
	 	$("#battle-nav-playerBird")[0].addEventListener("animationend", battleNav_clearedStage, false);		
	}
	
	function battleNav_clearedStage(event)
	{
		var winLoseDisplay;
		
		// ADD BACK IN WITH LOGIC
	 	// $("#info-cloud p").text(Logic.dat_ROM["_LOGIC"]["messages"]["txt_" + battleEndStatus]);
	 	// ADD BACK IN WITH LOGIC
	 	
	 	$("#battle-nav-playerBird")[0].removeEventListener("webkitAnimationEnd", battleNav_clearedStage, false);
	 	$("#battle-nav-playerBird")[0].removeEventListener("animationend", battleNav_clearedStage, false);		
	 	
		$("#battle-nav-player1 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-look-C").addClass("battleCute-eyes-look-R");
		$("#battle-nav-player2 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-look-C").addClass("battleCute-eyes-look-L");	 	
	 	
	 	
	 	$("#battle-nav-player1 .battleCute-speak-left").css("opacity", "1");
	 	$("#battle-nav-player2 .battleCute-speak-right").css("opacity", "1");
	 	
	 	winLoseDisplay = new AnimationTimer();
	 	timerList_add(winLoseDisplay);
	 	winLoseDisplay.time(2, battleNav_battleResults);		
	}
	
	function battleNav_battleResults()
	{
		var resultsEndDelay;
		
		$("#info-cloud").css("opacity", "1");
		
		$("#battle-nav-player1 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-look-R").addClass("battleCute-eyes-look-C");
		$("#battle-nav-player2 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-look-L").addClass("battleCute-eyes-look-C");
		
		switch(BATTLE_NAV.game.result)
		{
			case "LOSE":
			{
				$("#battle-nav-player1 .battleCute-cloud").css("opacity", "1").addClass("tween-battleCute-Cloud");	 			
	 			$("#battle-nav-player1 .battleCute-tears").css("opacity", "1");
	 			$("#battle-nav-player1 .battleCute-warrior-arm > div").removeClass("battleCute-warrior-armsDown").addClass("battleCute-warrior-armsUp");
	 			
	 			$("#battle-nav-player2 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-norm").addClass("battleCute-eyes-happy");
				
				break;
			}
			
			case "WIN":
			{
				$("#battle-nav-player2 .battleCute-cloud").css("opacity", "1").addClass("tween-battleCute-Cloud");	 			
	 			$("#battle-nav-player2 .battleCute-tears").css("opacity", "1");
	 			$("#battle-nav-player2 .battleCute-warrior-arm > div").removeClass("battleCute-warrior-armsDown").addClass("battleCute-warrior-armsUp");
	 			
	 			$("#battle-nav-player1 .battleCute-warrior-head .battleCute-eyes-sprite").removeClass("battleCute-eyes-norm").addClass("battleCute-eyes-happy");
	 							
				break;
			}
			
			case "DRAW":
			{
				$("#battle-nav-player1 .battleCute-warrior-arm > div").removeClass("battleCute-warrior-armsDown").addClass("battleCute-warrior-armsUp");
				$("#battle-nav-player2 .battleCute-warrior-arm > div").removeClass("battleCute-warrior-armsDown").addClass("battleCute-warrior-armsUp");				
				
				break;
			}
			
		}
		
		// ADD BACK IN
		// resultsEndDelay = new AnimationTimer();
		// timerList_add(resultsEndDelay);
		// resultsEndDelay.time(2, battleResultsEndInit);		
		// ADD BACK IN
	}
	
	
	
	
	
	
	function spaceSquids_setup()
	{
		// var spaceSquidsReplayDelay;
		
		if(DISPLAY._width < 480)
		{
			$("#spaceSquid0").remove();
			$("#spaceSquid1").remove();	
		
			spaceSquidsUse = false;
		}
		
		else
		{
			spaceSquidsUse = true;
			
			spaceSquids_animationInit();
			
			// spaceSquidsReplayDelay = new AnimationTimer();
			// timerList_add(spaceSquidsReplayDelay);			
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
	}
	
	
	
	
	
	
	
	