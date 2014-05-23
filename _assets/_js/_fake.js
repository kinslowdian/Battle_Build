

	var deviceTest;
	
	var CONTROL_SIGNAL;
	
	function fakeControlObject()
	{
		deviceTest = deviceTouchTest();
		
		controlSignal_init();
	}
	
	function deviceTouchTest()
	{
		return typeof window.ontouchstart;
	}
	
	function controlSignal_init()
	{
		CONTROL_SIGNAL = {};
		
		if(deviceTest.toString() === "object")
		{
			CONTROL_SIGNAL.enableTouch = true;
		}
		
		else
		{
			CONTROL_SIGNAL.enableTouch = false;
		}
		
		trace("CONTROL_SIGNAL check :");
		trace(CONTROL_SIGNAL);
	}