/* War Chest 2015
   SCRIPT CLASS: WORLD INSTANTIATION ENGINE
   
	2) World() FUNCTION - Populates World
	2A) initializeWorld() - Generates In-Game World with user-inputs
	2A) landscape_coords(); landscape_adder(); ownership_populator(); clouds_adder(); clouds_populator(); terra_populator(); terrain_totalizer() - adds/meshes generated random world variables

		// Isometric Tiles
		// World Sizes
		// 1: 4x4 = 16
		// 2: 5x5 = 25
		// 3: 6x6 = 36
		// 4: 7*7 = 49
		// 5: 8*8 = 64
		// 6: 9*9 = 81
	
		World.LANDSCAPE :: 
		  - Tile Number
		  - Tile Coordinate X
		  - Tile Coordinate Y
		  - Clouds (extensible)
		  - Terrain Type (only one)
		  - Ownership (only one)
		  
		  - Cloud Density
		  - Terrain
		  - Terra
		  - Ownership
		
*/


		
	/***** WORLD/TERRAIN/CLOUDS/TILE RESOURCE GENERATOR ENGINE *****/	
	// Create a World Full of CONSTANTS - the world becomes a Static World Map
	function World(ts, tq, td, es, ct, st, mt) { // t = type, s = size, q = quantity
	World.TILES = {
	'Size' : ts, //cubic kilometers
	'Quantity' : tq,
	'Divisor' : td,
	'UnitOfMeasure' : "KM",
	};
	World.LANDSCAPE = [];
	World.LANDSCAPE.CloudDensity = [];
	World.LANDSCAPE.Terrain = [];
	World.LANDSCAPE.Ownership = [];
	World.LANDSCAPE.Ownership.Worker = [];
	World.LANDSCAPE.Ownership.Leader = [];	
	World.LANDSCAPE.Ownership.Settlers = [];		
	World.LANDSCAPE.Ownership.Gatherer = [];	
	World.LANDSCAPE.Ownership.Farmer = [];	
	World.LANDSCAPE.Ownership.Miner = [];	
	World.LANDSCAPE.Ownership.Builder = [];	
	World.LANDSCAPE.Ownership.Swordsman = [];	
	World.LANDSCAPE.Ownership.Spearman = [];	
	World.LANDSCAPE.Ownership.Knight = [];	
	World.LANDSCAPE.Ownership.Pikeman = [];		
	World.LANDSCAPE.Ownership.Barracks = [];	
	World.LANDSCAPE.Ownership.Farm = [];
	World.LANDSCAPE.Ownership.Repository = [];

	World.LANDSCAPE.Terra = {
	0 : 'Mountains',
    1 : 'Plains',
	2 :'Hills',
	3 : 'Grasslands',
	4 : 'Swamps'
	};
	World.Epoch = {
	'Epoch' : es,
	'Day' : 0,
	'Hours' : 0,
	'Minutes' : 0,
	'Seconds' : 0,
	'GameSeconds' : 0
	};
	World.CLOUDS = {
	'Type' : ct,
	'Coverage' :  [],
	};
	World.SUN = true;
	World.MOON = true;
	};
	

	function initializeWorld() {
	/***** WORLD/TERRAIN/CLOUDS GENERATOR ENGINE INITIALIZE *****/	
	// Generate In-Game World

		var e = document.getElementById("world_type");
		WorldSize = parseInt(e.options[e.selectedIndex].value);
		console.log("World Size: " + WorldSize);
		//parseInt(prompt("Enter A World Size.  1, 2, 3, 4, 5, 6"));
		if (WorldSize === 1) {
		    var GameWorld = new World(60, 16, 4, 1, "cumulonimbus", true, true);
			}
		else if (WorldSize === 2) {
			var GameWorld = new World(60, 25, 5, 1, "cumulus", true, true);
			}
		else if (WorldSize === 3) {
			var GameWorld = new World(60, 36, 6, 2, "stratus", true, true);
			}
		else if (WorldSize === 4) {
			var GameWorld = new World(60, 49, 7, 2, "cumulonimbus", true, true);
			}
		else if (WorldSize === 5) {
			var GameWorld = new World(60, 64, 8, 3, "cumulus", true, true);
			}
		else if (WorldSize === 6) {
			var GameWorld = new World(60, 81, 9, 3, "stratus", true, true);
			}	
		else { // begin with the smallest world
		    var GameWorld = new World(60, 16, 4, 1, "cumulonimbus", true, true);
		}

	if (World.SUN || World.Moon) {console.log("This new world has \nTILES: " + World.TILES.Quantity + "\nTILE SIZE: " + World.TILES.Size + "\nEPOCH: " + World.Epoch.Epoch + "\nCLOUDS: " + World.CLOUDS.Type + "\nSUNS: 1" + "\nMOONS: 1")};
	console.log(World.prototype.valueOf(World.SUN));
	
	
	/***** TILE ATTACH VARIABLES INITIALIZE *****/	
	coords = new Array();	
	var landscape_coords = function () {	
		for(i=0;i < World.TILES.Divisor;i++) { // loop through the entire quantity of tiles
		 for (j=0;j < World.TILES.Divisor;j++) {
		 coords.push("," + i + "," + j ); // place the coordinates into an Array Object		 
		    }
		}
	}; 
	landscape_coords();	
	
	
	// create a loop across all tiles to add x Tiles to the Tiles Prototype
	var landscape_adder = function () {
		for(i=0;i < World.TILES.Quantity;i++) { // Tiles Generated.  Now we can generate equal tiles for other child attributes
		World.LANDSCAPE.push("Tile"+i+coords[i]); // instantiate LANDSCAPE	+ add the x, y coordinates on the map 
		World.LANDSCAPE.CloudDensity.push(""); // instantiate LANDSCAPE Cloud Density
		World.LANDSCAPE.Terrain.push(""); // instantiate LANDSCAPE Terrain 
		World.LANDSCAPE.Ownership.push(false); // instantiate LANDSCAPE Ownership 			
		World.LANDSCAPE.Ownership.Worker.push(""); // instantiate LANDSCAPE Workers 	
		World.LANDSCAPE.Ownership.Leader.push("");	
		World.LANDSCAPE.Ownership.Settlers.push("");		
		World.LANDSCAPE.Ownership.Gatherer.push("");	
		World.LANDSCAPE.Ownership.Farmer.push("");
		World.LANDSCAPE.Ownership.Miner.push("");
		World.LANDSCAPE.Ownership.Builder.push("");
		World.LANDSCAPE.Ownership.Swordsman.push("");	
		World.LANDSCAPE.Ownership.Spearman.push("");	
		World.LANDSCAPE.Ownership.Knight.push("");
		World.LANDSCAPE.Ownership.Pikeman.push("");
		World.LANDSCAPE.Ownership.Barracks.push("");
		World.LANDSCAPE.Ownership.Farm.push("");
		World.LANDSCAPE.Ownership.Repository.push("");
		}
	}; 
	landscape_adder();		
	
	// create a loop across all tiles to add x Clouds Coverage to Clouds Prototype	
	var clouds_adder = function () {
	var percental_coverage = (World.TILES.Quantity*4); // Converting percentage to a decimal: 
	var coverage = Math.floor((Math.random() * percental_coverage) + 1); 
	console.log("\nCoverage: "+coverage + " = tiles*Xdensity*random"); // define % of World Cloud Cover where *1 = 10% coverage and *10 is a possible 100% coverage : 16 Tiles x 10 (as 100%) = 160 (as 100%) possible coverage, reduced by a random number from 1% to 100% coverage
		for(i=1;i <= (coverage);i++) { // coverage=tiles*Xdensity*random
			World.CLOUDS.Coverage.push([World.CLOUDS.Type]); // populate Clouds Coverage
			
			
		}
	};	
	
	clouds_adder();
	
	// create a loop across all clouds in the world to change the cloud types to random cloud types
	//"can the cloud rain - can the cloud affect fertility or productivity, frequency of rain can be calculated by cloud type"
	clouds_type = ['cumulus', 'stratus', 'cumulonimbus'];
	var clouds_type_populator = function() {
		for(i=0;i < (World.CLOUDS.Coverage.length);i++) { // calculate total cloud coverage over world
			var rndm_cloud = Math.floor((Math.random() * (clouds_type.length))); // random tile chosen from population
			World.CLOUDS.Coverage[i] = clouds_type[rndm_cloud]; // push new cloud types randomly into tiles 
			console.log("\nCloud Coverage is now randomly: "+rndm_cloud + "\nThis Cloud: " + World.CLOUDS.Coverage[i]);
		}
	}
	
	clouds_type_populator();	

		// landscape.length (total tiles) - CLOUDS.Coverage (total clouds) / push clouds randomly into tiles on each loop iteration
	var clouds_populator = function () {
		console.log("\nClouds Coverage: "+World.CLOUDS.Coverage.length);
		for(i=0;i < (World.CLOUDS.Coverage.length);i++) { // coverage=tiles*10density*random
			var rndm_tile = Math.floor((Math.random() * (World.TILES.Quantity))); // random tile chosen from population
			console.log("\nRandom Tile: "+rndm_tile + "\nThis Cloud: " + World.CLOUDS.Coverage[i]);
			World.LANDSCAPE[rndm_tile]+=(","+World.CLOUDS.Coverage[i]); // push clouds randomly into tiles 

		}
	};
	clouds_populator();
	
	
	// populate the landscape tiles with a random terrain terraform
	var terra_populator = function () {
		console.log("\nInitiate Terra-Forming\nLandscape Tiles Total: "+World.LANDSCAPE.length);
		for(i=0;i < (World.LANDSCAPE.length);i++) { // tiles length total
			var rndm_terraform = Math.floor((Math.random() * 5)); // random terrafirm selected
			console.log("\nRandom Terraform : "+World.LANDSCAPE.Terra[rndm_terraform]);
			World.LANDSCAPE[i]+=(","+World.LANDSCAPE.Terra[rndm_terraform]); // push terraform randomly into tiles 

		}
	};
	terra_populator();	
	
	// TOTALIZER - Calculate Terrain Total Mass
	var terrain_totalizer = function () {
		console.log("\nInitiate Terrain Totalizer\nLandscape Tiles Total: "+World.LANDSCAPE.length);
		for(i=0;i < (World.LANDSCAPE.length);i++) { // tiles length total
		
			var tiles_composition = World.LANDSCAPE[i].split(",");
			var tile_density = 0;
			var tile_terrain;
			console.log("\nClouds Density on Tile: "+tiles_composition);
			  for(k=0;k < (5);k++) { // search Terra for Type Match
			   for(l=0;l <= (tiles_composition.length);l++) {
			    if(tiles_composition[l]===World.LANDSCAPE.Terra[k]) { // if this looped tile's terrain matches the stored terrain type
			    tile_terrain = tiles_composition[l];
				World.LANDSCAPE.Terrain[i] = tile_terrain;
					} // if we find this terrain type matches the CONSTANT add value to Terrain
				}
			  }
			  for(j=0;j < tiles_composition.length;j++) {
			    if(tiles_composition[j] in {'cumulus' : 'cumulus', 'stratus' : 'stratus', 'cumulonimbus' : 'cumulonimbus'}) { tile_density++;} // if we find this cloud in this array add to density
			  }
			  World.LANDSCAPE.CloudDensity[i] = tile_density;
		}
	};
	terrain_totalizer();	
	

	/***** WARLORD ENGINE INITIALIZE *****/			
	var f = document.getElementById("ruler_type");
	var warlordType = f.options[f.selectedIndex].value;
	
	var Warlord1 = new Warlord(document.getElementById("warlordName").value, "UserWarlord", warlordType); // set the user chosen value of the Warlord Power to true in the Prototype

	document.getElementById('username').innerHTML = Warlord1.Personal.UserName.toUpperCase();

	//ZaptosOpenPopup('#world_variables'); // access Zaptos API Library
	
	/***** WARLORD OWNERSHIP TILE POPULATE *****/	
	var ownership_populator = function () {
		var rndm_tile;
		var populated_once = 0;
		// 1. check Warlord tiles values 2. check landscape tile length 3. random match up to landscape length 4. change ownership of this random tile to Warlord 5. repeat loop
		for(i=0;i < (Warlord.Territory);i++) { // Warlord owned tiles total
			function randomTile() {
					var landscape_length = World.LANDSCAPE.length;
					rndm_tile = Math.floor((Math.random() * landscape_length)); // random tile selected
			}		
				randomTile();
				while (World.LANDSCAPE.Ownership[rndm_tile] == true) { // if this tile is already owned = true
					console.log("This tile " +World.LANDSCAPE.Ownership[rndm_tile] + " is already owned by the Warlord");
					randomTile(); // repeat the random tile loop 
				}				
				if (World.LANDSCAPE.Ownership[rndm_tile] == false) { // if this tile is vacant = false
					World.LANDSCAPE.Ownership[rndm_tile] = true; // change ownership of the tile to Warlord
					// now populate the tile with the entire catalogue of Warlord Objects
				if (populated_once <1) 
					{
					World.LANDSCAPE.Ownership.Leader[rndm_tile] 		= Warlord.SIMS.Leaders;
					World.LANDSCAPE.Ownership.Settlers[rndm_tile] 		= Warlord.SIMS.Settlers;
					World.LANDSCAPE.Ownership.Worker[rndm_tile]		    = Warlord.SIMS.Worker;
					World.LANDSCAPE.Ownership.Gatherer[rndm_tile]		= Warlord.SIMS.Gatherer;
					World.LANDSCAPE.Ownership.Farmer[rndm_tile]			= Warlord.SIMS.Farmer;
					World.LANDSCAPE.Ownership.Miner[rndm_tile]			= Warlord.SIMS.Miner;
					World.LANDSCAPE.Ownership.Builder[rndm_tile]		= Warlord.SIMS.Builder;
					World.LANDSCAPE.Ownership.Swordsman[rndm_tile]		= Warlord.ARMY.Swordsman;
					World.LANDSCAPE.Ownership.Spearman[rndm_tile]		= Warlord.ARMY.Spearman;
					World.LANDSCAPE.Ownership.Knight[rndm_tile]			= Warlord.ARMY.Knight;
					World.LANDSCAPE.Ownership.Pikeman[rndm_tile]		= Warlord.ARMY.Pikeman;
					World.LANDSCAPE.Ownership.Barracks[rndm_tile]		= Warlord.BUILDINGS.Barracks;
					World.LANDSCAPE.Ownership.Farm[rndm_tile]			= Warlord.BUILDINGS.Farm;
					World.LANDSCAPE.Ownership.Repository[rndm_tile]		= Warlord.BUILDINGS.Repository;
					populated_once++;
					}
			
					console.log("\nWarlord Owns Tile : "+World.LANDSCAPE.Ownership[rndm_tile]);		
				}
				
		}
	};
	ownership_populator();	

	epochClock(true); // instantiate the Epoch Clock
	

		/****** INTERNAL FUNCTIONS END / OUTPUT FUNCTIONS BEGIN *******/	
	

	placeTile();

	
			 
}