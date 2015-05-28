/* War Chest 2015
   SCRIPT CLASS: TURN BASED RESOURCES YIELD ENGINE
   dayPasses() - determine tile ownership, has Workers, 
   calculateYields() - calculate owned tile's resource yield per day (i.e. food, water, gold etc)
   calculateWarlordTileResources() - Render all Warlord and Warlord Tile Resource information for each tile owned by Warlord / RENDER onto HTML
   placeTile() - function to RENDER the Tile Grid System to HTML
   
						*/	
	function dayPasses(sims)	{
		// 1. calculate tiles owned by landlord
		var ownedTile;
		var active_workers;
		var this_tiles_terrain;
		var precipitation;
		var prec_food_bonus;
		var prec_trees_bonus;
		var flood;
		
		for (i=0; i < (World.LANDSCAPE.length);i++) {
			// 3. calculate which tile terrain type this tile has so as to make the correct calculations
			this_tiles_terrain = World.LANDSCAPE.Terrain[i];
			current_precipitation = World.LANDSCAPE.CloudDensity[i];
			if (World.LANDSCAPE.Ownership[i]) 
				{			
				if (current_precipitation) {
				  if (current_precipitation >=18) { precipitation = 5;prec_food_bonus = 0;prec_trees_bonus = 0.25;flood = 0;}
				  else if (current_precipitation >=12) { precipitation = 3;prec_food_bonus = 1;prec_trees_bonus = 1;flood = 1}
				  else if (current_precipitation >=6) { precipitation = 2;prec_food_bonus = 0.5;prec_trees_bonus = 0.5;flood = 1}
				  else if (current_precipitation >=1) { precipitation = 1;prec_food_bonus = 0.25;prec_trees_bonus = 0.25;flood = 1}
				  else { precipitation = 0;prec_food_bonus = 0;prec_trees_bonus = 0;flood = 1;}
				}				
				//alert("You are within the loop" + this_tiles_terrain);
				if (sims.Worker && World.LANDSCAPE.Ownership.Worker[i] >= 1) // check to see if the Warlord Prototype has Workers > 0
					 {
							active_workers = World.LANDSCAPE.Ownership.Worker[i];
							calculateYields(active_workers, this_tiles_terrain, precipitation, prec_food_bonus, prec_trees_bonus, flood); // calculate based on active workers (not specialized)
					 }
				else { // execute base yield function
						calculateYields("base", this_tiles_terrain, precipitation, prec_food_bonus, prec_trees_bonus, flood);
					 }
					
				}
				
				
		// 2. calculate tile "on land" properties (i.e. sims)	

			console.log("Warlord Tile Active Workers: " + active_workers);	

			// 4. calculate tile "resource" properties (i.e. underground)

			// continue the for loop iteration	
				
			}

			
	/*	if(specialized) {
			// if this worker has been enabled to specialize on a service, loop through the available special services
			if(water) {}
			else if(food) {}
			else if(trees) {}
			else if(mine) {
				if(stone) {}
				else if(iron)  {}
				else if(gold)  {}
				}
			} */
			
			
}
		
	function calculateYields(weight, terrain, precipitation, food_bonus, trees_bonus, flood) { // day regeneration - perform actions 
		if (weight == "base") {
			if (terrain == "Mountains")
				{
				Warlord.RESOURCES.Food+=(food_bonus*flood);
				Warlord.RESOURCES.Water+=precipitation;
				Warlord.RESOURCES.Trees+=(1+trees_bonus);
				Warlord.RESOURCES.Gold+=2;	
				}
			else if (terrain == "Plains")
				{
				Warlord.RESOURCES.Water+=(1+precipitation);
				Warlord.RESOURCES.Food+=(1+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=(0.5+trees_bonus);
				Warlord.RESOURCES.Gold+=0.5;					
				}
			else if (terrain == "Hills")
				{
				Warlord.RESOURCES.Water+=(0.5+precipitation);
				Warlord.RESOURCES.Food+=(0.5+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=(2+trees_bonus);					
				}		
			else if (terrain == "Grasslands")
				{
				Warlord.RESOURCES.Water+=(0.5+precipitation);
				Warlord.RESOURCES.Food+=(2+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=trees_bonus;		
				Warlord.RESOURCES.Gold+=0.5;						
				}	
			else if (terrain == "Swamps")
				{
				Warlord.RESOURCES.Water+=(2+precipitation);
				Warlord.RESOURCES.Food+=(0.5+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=trees_bonus;					
				Warlord.RESOURCES.Gold+=0.5;					
				}				

		}
		else {
			if (terrain == "Mountains")
				{
				Warlord.RESOURCES.Water+=(1*weight)+precipitation;
				Warlord.RESOURCES.Food+=((1*weight)+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=(2*weight)+trees_bonus;
				Warlord.RESOURCES.Gold+=(3*weight);	
				}
			else if (terrain == "Plains")
				{
				Warlord.RESOURCES.Water+=(2*weight)+precipitation;
				Warlord.RESOURCES.Food+=((2*weight)+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=(1.5*weight)+trees_bonus;
				Warlord.RESOURCES.Gold+=(1.5*weight);					
				}
			else if (terrain == "Hills")
				{
				Warlord.RESOURCES.Water+=(1.5*weight)+precipitation;
				Warlord.RESOURCES.Food+=((1.5*weight)+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=(3*weight)+trees_bonus;
				Warlord.RESOURCES.Gold+=(1*weight);				
				}		
			else if (terrain == "Grasslands")
				{
				Warlord.RESOURCES.Water+=(1.5*weight)+precipitation;
				Warlord.RESOURCES.Food+=((3*weight)+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=(1*weight)+trees_bonus;
				Warlord.RESOURCES.Gold+=(1.5*weight);							
				}	
			else if (terrain == "Swamps")
				{
				Warlord.RESOURCES.Water+=(3*weight)+precipitation;
				Warlord.RESOURCES.Food+=((1.5*weight)+food_bonus)*flood;
				Warlord.RESOURCES.Trees+=(1*weight)+trees_bonus;
				Warlord.RESOURCES.Gold+=(1.5*weight);						
				}						
		}
	// variables
		// clouds (coverage)
		// terrain
		// tile size
		// sun and moon
		// seasons
		document.getElementById("w_res").innerHTML = Warlord.RESOURCES.Water; 
		document.getElementById("f_res").innerHTML = Warlord.RESOURCES.Food; 
		document.getElementById("t_res").innerHTML = Warlord.RESOURCES.Trees; 
		document.getElementById("s_res").innerHTML = Warlord.RESOURCES.Stone; 
		document.getElementById("i_res").innerHTML = Warlord.RESOURCES.Iron; 
		document.getElementById("g_res").innerHTML = Warlord.RESOURCES.Gold; 
		World.Epoch.GameSeconds = 0; // reset the day timer

	}

	
	/******* RENDER CANVAS ENGINE *******/
		var check_tile_ownership = function () {
		var check_tile;
		for(i=0;i < (Warlord.Territory);i++) { // Warlord owned tiles total	
				if (World.LANDSCAPE.Ownership[check_tile] == true) { // if this tile is already owned = true
					// do stuff
				}				
		}
	};
	check_tile_ownership();	

	
	function calculateWarlordTileResources() {
	    /****** RECAP PRINTOUT *******/ 

		document.getElementById("warlord_profile").innerHTML =
	     "<h3>Warlord Profile</h3> " +
		 "<ul>" +
		  "<li>Name : " +Warlord.Personal.UserName + "</li>" +
		  "<li>Powers : " +Warlord.Personal.Powers + "</li>" +
		  "<li>Territory Total : " +Warlord.Territory + "</li>" +
		  "<li>Workers Total : " +Warlord.SIMS.Worker + "</li>" +	
	  "<h4>Warlord Domain Possessions</h4>" +    
	      "<li>Water <span id='w_res'> : " +Warlord.RESOURCES.Water + "</span></li>" +
		  "<li>Food <span id='f_res'> : " +Warlord.RESOURCES.Food + "</span></li>" +
		  "<li>Trees <span id='t_res'> : " +Warlord.RESOURCES.Trees + "</span></li>" +
		  "<li>Stone <span id='s_res'> : " +Warlord.RESOURCES.Stone + "</span></li>" +
		  "<li>Iron <span id='i_res'> : " +Warlord.RESOURCES.Iron + "</span></li>" +
		  "<li>Gold <span id='g_res'> : " +Warlord.RESOURCES.Gold + "</span></li>" +
		"</ul>";
	  // begin conditional for loop to check each tile against its ownership value
	  document.getElementById("warlord_tiles").innerHTML = ""; // reset the DHTML block
	  for(i=0;i < (World.LANDSCAPE.length);i++) { // Warlord owned tiles total	
		if (World.LANDSCAPE.Ownership[i] == true) { // if this tile is already owned = true
		
		document.getElementById("warlord_tiles").innerHTML += // this will add one DHTML Info Box for each Territory Tile Owned
		 "<div class='info'> " +
	    "<h3>Tile Topography</h3>" +
	    "<ul>" +
		  "<li>Tile Number : Tile " + i + "</li>" +
		  "<li>Terrain Type : " + World.LANDSCAPE.Terrain[i] + "</li>" +
		  "<li>Cloud Density : " + World.LANDSCAPE.CloudDensity[i] + "</li>" +
		  "<li>Ownership : " + World.LANDSCAPE.Ownership[i] + "</li>" +
		"</ul>" +
	  "<h4>Landscape Objects</h4>" +	  		     
	    "<ul>" +
		  "<li>Water <span id=''></span></li>" +
		  "<li>Food <span id=''></span></li>" +
		  "<li>Trees <span id=''></span></li>" +
		  "<li>Stone <span id=''></span></li>" +
		  "<li>Iron <span id=''></span></li>" +
		  "<li>Gold <span id=''></span></li>" +
		"</ul>" +		
	  "<h4>Movable Warlord Objects</h4>" +	    
		"<ul>" +
		  "<li>Warlords</li>" +
		   "<ul>" +  
		    "<li>Leader  : " + World.LANDSCAPE.Ownership.Leader[i] + "</li>" +
		    "<li>Settlers  : " + World.LANDSCAPE.Ownership.Settlers[i] + "</li>" +
		    "<li>Worker  : " + World.LANDSCAPE.Ownership.Worker[i] + "</li>" +		  
		    "<li>Gatherer  : " + World.LANDSCAPE.Ownership.Gatherer[i] + "</li>" +
		    "<li>Farmer  : " + World.LANDSCAPE.Ownership.Farmer[i] + "</li>" +
		    "<li>Miner  : " + World.LANDSCAPE.Ownership.Miner[i] + "</li>" +
		    "<li>Builder  : " + World.LANDSCAPE.Ownership.Builder[i] + "</li>" +
		   "</ul>" +	
		  "<li>Army</li>" +		   
		   "<ul>" + 
		    "<li>Swordsman  : " + World.LANDSCAPE.Ownership.Swordsman[i] + "</li>" +
		    "<li>Spearman  : " + World.LANDSCAPE.Ownership.Spearman[i] + "</li>" +
		    "<li>Knight  : " + World.LANDSCAPE.Ownership.Knight[i] + "</li>" +
		    "<li>Pikeman  : " + World.LANDSCAPE.Ownership.Pikeman[i] + "</li>" +
		     "<ul>" +
		      "<li>Arrows</li>" +
		      "<li>Swords</li>" +
		      "<li>Spears</li>" +
		      "<li>Horses</li>" +
		      "<li>Armor</li>" +
		      "<li>Pikes</li>" +	
		      "<li>Shields</li>" +	
	         "</ul>" +			
		   "</ul>" +
	  "<h4>Immobile Warlord Objects</h4>" +	
		   "<ul>" +  
		     "<li>Barracks  : " + World.LANDSCAPE.Ownership.Barracks[i] + "</li>" +
		     "<li>Farm  : " + World.LANDSCAPE.Ownership.Farm[i] + "</li>" +
		     "<li>Repository  : " + World.LANDSCAPE.Ownership.Repository[i] + "</li>" +
		   "</ul>" +
	    "</ul>" +
		"</div>";	

		 } // end if statement				
	  } // end for loop
	  
	var tile_resources = "";
	var cloud_resources = "";
	tiles_with_clouds = 0;
	cloud_variety = "";
	cu_clouds = 0; st_clouds = 0; cb_clouds = 0;
	  
	  // iterate through all the landscape tiles to determine their "terrain" value and make a string
	  for(i=0;i < (World.LANDSCAPE.Terrain.length);i++) { 
	    if(World.LANDSCAPE.Terrain[i]) {
	  tile_resources+= "<br/>Tile Terrain" + i + ": " + World.LANDSCAPE.Terrain[i];
	  }}	

	  // iterate through all the landscape tiles to determine their "cloud density" value and make a string
	  for(t=0;t < (World.LANDSCAPE.CloudDensity.length);t++) {  
	    if(World.LANDSCAPE.CloudDensity[t]) {
	  cloud_resources+= "<br/>Tile" + t + " Cloud Density : " + World.LANDSCAPE.CloudDensity[t];
	  tiles_with_clouds++;
	  }}	

	  // iterate through all the clouds to determine their "type" value and make a string
	  for(u=0;u < (World.CLOUDS.Coverage.length);u++) { 
	    if(World.CLOUDS.Coverage[u]) {
		  if (World.CLOUDS.Coverage[u] == clouds_type[0]) { cu_clouds++ }
		  else if (World.CLOUDS.Coverage[u] == clouds_type[1]) { st_clouds++ }
		  else if (World.CLOUDS.Coverage[u] == clouds_type[2]) { cb_clouds++ }

	  }}
		cloud_variety= "<br/>Cloud Variety => " + "<br/>Cumulus: " + cu_clouds + "<br/>Stratus: " + st_clouds + "<br/>Cumulonimbus: " + cb_clouds;
	  
	  
	 /****** RECAP PRINTOUT *******/ 
	document.getElementById("world_resources").innerHTML =
	"WORLD: Size " + WorldSize +
	  "<br/>Epoch: " + World.Epoch.Epoch +
	  "<br/>Landscape Tiles: " + "<b>" + World.LANDSCAPE.length + "</b>" + 
	  "<br/>Tile Size: " + World.TILES.Size + " " + World.TILES.UnitOfMeasure +	 
	  "<br/>Clouds: <br/>Clouds Original Percentile: " + (World.TILES.Quantity*4/(World.TILES.Quantity*10 / 100)) +"%" +	  
	  "<br/>Cloud Coverage: " + World.CLOUDS.Coverage.length + " | " + (World.CLOUDS.Coverage.length/(World.TILES.Quantity*10 / 100)) +"%" +
	  "<br/>Tile with 1+ Cloud Density: <b>" + tiles_with_clouds + "</b>" + 
	  cloud_variety + 
	  "<br/>Moon: " + World.MOON +
	  "<br/>Sun: " + World.SUN;

	  
	  document.getElementById("world_resources_a").innerHTML = cloud_resources;
	  document.getElementById("world_resources_b").innerHTML = tile_resources;


	  
	  
	} // end function

	
		/****** INTERNAL FUNCTIONS END / OUTPUT FUNCTIONS BEGIN *******/		 
		 
		/***** WORLD MAP HTML GENERATOR *****/
	var placeTile = function () {
		for(i=0;i < (World.LANDSCAPE.length);i++) { // tiles length total	
		    if ((i % (World.TILES.Divisor))==0) { // did we arrive to the last tile in this column?
				var tile = document.createElement("div");                       // Create a <div> element
				tile.className = "tile " + World.LANDSCAPE.Terrain[i] + " column_end";
				tile.id = "tile"+i;
				var t = document.createTextNode("Tile"+i+ " :: " + coords[i]);      // Create a text node
				tile.appendChild(t);                                          // Append the text to <p>
				document.getElementById("world_canvas").appendChild(tile);           // Append <p> to the Canvas <div> 			
			   }
			else
			   {
				var tile = document.createElement("div");                       // Create a <div> element
				tile.className = "tile " + World.LANDSCAPE.Terrain[i];
				tile.id = "tile"+i;
				var t = document.createTextNode("Tile"+i+ " :: " + coords[i]);      // Create a text node
				tile.appendChild(t);                                          // Append the text to <p>
				document.getElementById("world_canvas").appendChild(tile);           // Append <p> to the Canvas <div> 
			   }

		   }
	}
	

	
	
		// populate the landscape tiles with an ownership value for the tiles that the Warlord will now possess
	/* Tile Topography 
	-> Powers *
	-> Territory *
	- Movable Warlord Objects
		Warlords	
		Leader (by promotion in Battles)	
		Worker	
		Settlers 
		Gatherer	
		Builder	
		Miner	
		Army	
		Farmer	
		Army	
		Archer	
		Swordsman	
		Spearman	
		Knight	
		Pikeman	
		Arrows	
		Swords	
		Spears	
		Horses	
		Armor	
		Pikes	
		Shields	

	
	- Immobile Warlord Objects (i.e. buildings)
		Barracks	Immovable / Changeable
		Farm	Immovable / Changeable
		Repository (store food)	Immovable / Changeable

		Water / Gatherer	
		Food / Farmer 	
		Trees / Gatherer
		Stone / Miner
		Iron / Miner
		Gold / Miner

	- Landscape
	 - Cloud Density
	 - Ownership
	 - Terrain
	 - Worker
	 
	 
	 	    

		
	  Warlord
	  - Territory Total
	  - Powers
	  
	  Tile
	   - Tile Number
	   - Tile Terrain Type
	   - Tile Resources
	    - Water
		- Food
		- Trees
		- Stone
		- Iron
		- Gold
	   - Warlord Movable Resources
	    - Leader (by promotion in Battles)	
		- Worker	
		- Settlers 
		- Gatherer	
		- Builder	
		- Miner	
		- Farmer	
		- Army	
		- Archer	
		- Swordsman	
		- Spearman	
		- Knight	
		- Pikeman	
		- Arrows	
		- Swords	
		- Spears	
		- Horses	
		- Armor	
		- Pikes	
		- Shields	
	   - Warlord Immovable Resources
		- Barracks
		- Farm
		- Repository

	
	*/
	
