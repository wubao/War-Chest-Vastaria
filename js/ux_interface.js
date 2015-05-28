	  /* index.html user interface scripts for Forms */
	  function Select(x, y) {
	  var sel = document.getElementById('user_selection');
		   if(x=="Explorer"){return sel.innerHTML = "Warlord Powers: " + y;}
      else if(x=="Resourceful"){return sel.innerHTML = "Warlord Powers: " + y;}
	  else if(x=="Commercial"){return sel.innerHTML = "Warlord Powers: " + y;}
	  else if(x=="Empire"){return sel.innerHTML = "Warlord Powers: " + y;}
	  else if(x=="Prosperity"){return sel.innerHTML = "Warlord Powers: " + y;}
	  else if(x=="Expansionism"){return sel.innerHTML = "Warlord Powers: " + y;}
	  };
	  
	  function SelectWorld(x) {
	  var sel = document.getElementById('world_selection');
		   if(x=="1"){return sel.innerHTML = "World Size 1";}
      else if(x=="2"){return sel.innerHTML = "World Size 2";}
	  else if(x=="3"){return sel.innerHTML = "World Size 3";}
	  else if(x=="4"){return sel.innerHTML = "World Size 4";}
	  else if(x=="5"){return sel.innerHTML = "World Size 5";}
	  else if(x=="6"){return sel.innerHTML = "World Size 6";}
	  };
	  
	  	// Open directly via API ZAPTOS CODE
    function ZaptosOpenPopup(element) {
	$.magnificPopup.open({
	  items: {
		src: element, // can be a HTML string, jQuery object, or CSS selector
		type: 'inline',
		closeOnContentClick: true
	  }
	});
	}
	
	// From an element with ID #world_canvas
	$('button').magnificPopup({
	  items: {
		  src: '#world_canvas',
		  type: 'inline',
		  closeOnContentClick: true
	  }
	});
	  
	  