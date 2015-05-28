/* War Chest 2015
   EPOCHS CLOCK
   Timed Sequences 
						*/
						

	function epochClock() { 
	  if (timerId) return	 
	  var timerId = setInterval(EpochClockUpdate, 1000) // each second fire the Epoch functions to add time
	}
	 
	function epochClockStop() {
	  clearInterval(timerId) // WHEN TO DEACTIVATE EPOCH CLOCK i.e. LOAD TO DATABASE / PAUSE
	  timerId = null
	}

	function EpochClockUpdate(GameSeconds) {
	  var date = new Date();
	 
	  var hours = date.getHours();
	  if (hours < 10) hours = '0'+hours;
	  document.getElementById('hour').innerHTML = hours;
	 
	  var minutes = date.getMinutes();
	  if (minutes < 10) minutes = '0'+minutes;
	  document.getElementById('min').innerHTML = minutes;
	 
	  var seconds = date.getSeconds();
	  if (seconds < 10) seconds = '0'+seconds;
	  document.getElementById('sec').innerHTML = seconds;

	  /***** EPOCH CLOCK *****/
	  World.Epoch.Seconds ++;	// add a second
	  World.Epoch.GameSeconds ++;	// add a Game Second
	  // 10 minutes = 600 game seconds
	  // 1 sandbox minute = 60 seconds
	  
	  /***** IF STATEMENTS TO DEAL WITH TIME FLOW *****/
	  if (World.Epoch.GameSeconds == 10) { dayPasses(Warlord.SIMS);calculateWarlordTileResources();}
	  if (World.Epoch.Seconds < 60) { 
	    document.getElementById('esec').innerHTML = World.Epoch.Seconds; 
		}
	  else if (World.Epoch.Seconds == 60) { 
		World.Epoch.Seconds = 0; // reset the seconds
		World.Epoch.Minutes ++; // add a minute
	  document.getElementById('esec').innerHTML = World.Epoch.Seconds; 
	  document.getElementById('emin').innerHTML = World.Epoch.Minutes;
         if (World.Epoch.Minutes == 60)  {
			World.Epoch.Seconds = 0; // reset the seconds
			World.Epoch.Minutes = 0; // reset the minutes
		    World.Epoch.Hours ++; // add an hour
	  document.getElementById('esec').innerHTML = World.Epoch.Seconds; 
	  document.getElementById('emin').innerHTML = World.Epoch.Minutes;
	  document.getElementById('ehour').innerHTML = World.Epoch.Hours; 
           if (World.Epoch.Hours == 24)  {
			  World.Epoch.Seconds = 0; // reset the seconds
			  World.Epoch.Minutes = 0; // reset the minutes
			  World.Epoch.Hours = 0; // reset the hours 
			  World.Epoch.Day ++; // add a day
	  document.getElementById('esec').innerHTML = World.Epoch.Seconds; 
	  document.getElementById('emin').innerHTML = World.Epoch.Minutes;
	  document.getElementById('ehour').innerHTML = World.Epoch.Hours; 
	  document.getElementById('eday').innerHTML = World.Epoch.Day;  			  
		    }	  
		  }	  
		  }
 
	//calculateYields(Warlord.SIMS); // each second fire the function that evaluates resource yields


	}
	// clearTimeout(epoch_clock) // WHEN TO DEACTIVATE EPOCH CLOCK i.e. LOAD TO DATABASE / PAUSE
	