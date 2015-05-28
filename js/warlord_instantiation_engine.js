/* War Chest 2015
   SCRIPT CLASS: WARLORD INSTANTIATION ENGINE


1) Warlord - Prototype Constructor returns
Warlord
	.ARMY
	.BUILDINGS	
	.Personal
	.POWERS
	.RESOURCES
	.SIMS
	.TYPE
	.Territory
	.WEAPONS


*/

/***** prototype constructor builder to generate Warlords *****/
/***** WARLORD GENERATOR ENGINE *****/
function Warlord(userName, gameName, warlordType) {

Warlord.Personal = {
'UserName' : userName,
'GameName' : gameName,
'Powers' : 0
	};
Warlord.TYPE = {
'Explorer' : false, 
'Resourceful' : false,
'Courage' : false,
'Empire' : false,
'Prosperity' : false,
'Expansionism' : false,
	};
Warlord.Powers = {
'Territory' : +2,
'ResourceGatheringSpeed' : + 0.10,
'BattleBonus' : + 0.07,
'WorkerBuildSpeed' : + 0.15,
'PopulationGrowthSpeedFast' : + 0.10,
'PopulationGrowthSpeedSlow' : + 0.02,
'Settler' : +1,
	};
Warlord.Territory  = 1;
Warlord.SIMS = {
	'Settlers' : 1,
	'Leaders' : 0,
	'Worker' : 3,	
	'Builder' : 0,
	'Gatherer' : 0,
	'Miner'	: 0,
	'Army' : 0,
	'Farmer' : 0
	};
Warlord.RESOURCES = {
	'Trees' : 0,
	'Water' : 0,
	'Stone' : 0,
	'Gold' : 0,
	'Iron' : 0,
	'Food' : 0
	};
Warlord.ARMY = {
	'Archer' : 0,
    'Swordsman' : 0,
    'Spearman' : 0,
	'Knight' : 0,
	'Pikeman' : 0
	};
Warlord.WEAPONS = {
	'Arrows' : 0,
	'Swords' : 0,
	'Spears' : 0,
	'Horses' : 0,
	'Armor' : 0,
	'Pikes' : 0,
	'Shields' : 0
	};
Warlord.BUILDINGS = {
	'Barracks' : 0,
	'Farm' : 0,
	'Repository' : 0
	};
	
 if(warlordType == "Explorer") {
   Warlord.TYPE = { 'Explorer' : true };
   Warlord.TYPE.Powers = { 'Territory' : +2 };     
   Warlord.Personal.Powers = 0;   
   Warlord.Territory+=2;
 }
  else if(warlordType == "Resourceful") {
   Warlord.TYPE = { 'Resourceful' : true };
   Warlord.TYPE.Powers = { 'ResourceGatheringSpeed' : + 0.10 };   
   Warlord.Personal.Powers = 1;      
 }
  else if(warlordType == "Courage") {
   Warlord.TYPE = { 'Courage' : true };
   Warlord.TYPE.Powers = { 'BattleBonus' : + 0.07 };
   Warlord.Personal.Powers = 1;      
 }
  else if(warlordType == "Empire") {
   Warlord.TYPE = { 'Empire' : true };
   Warlord.TYPE.Powers = { 'WorkerBuildSpeed' : + 0.15 };
   Warlord.Personal.Powers = 1;      
 }
  else if(warlordType == "Prosperity") {
   Warlord.TYPE = { 'Prosperity' : true };
   Warlord.TYPE.Powers = { 'PopulationGrowthSpeedFast' : + 0.10 };
   Warlord.Personal.Powers = 1;      
 }
  else if(warlordType == "Expansionism") {
   Warlord.TYPE = { 'Expansionism' : true };
   Warlord.TYPE.Powers = { 'PopulationGrowthSpeedSlow' : + 0.02, 'Settler' : +1,
   };
   Warlord.SIMS.Settlers +=1;
   Warlord.Personal.Powers = 1;      
 }	

	return Warlord; // returns the entire prototype object and its siblings
	}
	
	
		
