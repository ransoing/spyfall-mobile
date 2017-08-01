
// the keys are locations, and the arrays are roles at each location
var locations = {
	'Airplane': 	['1st-class passenger', 'Air marshal', 'Mechanic', 'Coach passenger', 'Flight attendant', 'Co-pilot', 'Pilot'],
	'Bank':			['Armored car driver', 'Bank manager', 'Loan consultant', 'Bank robber', 'Customer', 'Security guard', 'Bank teller'],
	'Beach':		['Bartender', 'Surfer', 'Lifeguard', 'Thief', 'Beachgoer', 'Photographer', 'Ice cream man'],
	'Casino':		['Bartender', 'Head of security', 'Bouncer', 'Pit boss', 'Hustler', 'Dealer', 'Gambler'],
	'Cathedral':	['Priest', 'Beggar', 'Sinner', 'Parishioner', 'Tourist', 'Deacon', 'Choir singer'],
	'Circus Tent':	['Acrobat', 'Animal tamer', 'Magician', 'Audience mmber', 'Fire eater', 'Clown', 'Juggler'],
	'Corporate Party': ['Entertainer', 'Manager', 'Party crasher', 'Owner/CEO', 'Admin assistant', 'Accountant', 'Delivery boy'],
	'Crusader Army':['Monk', 'Imprisoned arab', 'Servant', 'Bishop', 'Squire', 'Archer', 'Knight'],
	'Day Spa':		['Customer', 'Stylist', 'Massage tech', 'Manicurist', 'Makeup artist', 'Dermatologist', 'Beautician'],
	'Embassy':		['Security guard', 'Admin assistant', 'Ambassadors', 'Government official', 'Tourist', 'Refugee', 'Diplomat'],
	'Hospital':		['Nurse', 'Doctor', 'Anesthesiologist', 'Intern', 'Patient', 'Therapist', 'Surgeon'],
	'Hotel':		['Doorman', 'Security guard', 'Hotel manager', 'Housekeeper', 'Hotel guest', 'Bartender', 'Valet'],
	'Military Base':['Deserter', 'General', 'Medic', 'Soldier', 'Sniper', 'Exec . officer', 'Tank commander'],
	'Movie Studio':	['Stuntman', 'Sound engineer', 'Cameraman', 'Director', 'Costume artist', 'Actor', 'Producer'],
	'Ocean Liner':	['Rich passenger', 'Cook', 'Captain', 'Bartender', 'Musician', 'Waiter', 'Ship\'s mechanic'],
	'Passenger Train':['Mechanic', 'Border patrol', 'Chef', 'Engineer', 'Steward', 'Ticket taker', 'Passenger'],
	'Pirate Ship':	['Cook', 'Sailor', 'Slave', 'Cannoneer', 'Bound prisoner', 'Cabin boy', 'Pirate captain'],
	'Polar Station':['Medic', 'Geologist', 'Expedition leader', 'Biologist', 'Radioman', 'Hydrologist', 'Meteorologist'],
	'Police Station':['Detective', 'Lawyer', 'Journalist', 'Forensic scientist', 'Evidence archivist', 'Patrol officer', 'Criminal'],
	'Restaurant':	['Musician', 'Customer', 'Table busser', 'Host', 'Head chef', 'Food critic', 'Server'],
	'School':		['Gym teacher', 'Student', 'Principal', 'Gecurity guard', 'Janitor', 'Lunch lady', 'Maintenance man'],
	'Service Station':['Manager', 'Tire specialist', 'Motorcyclist', 'Car owner', 'Car washer', 'Diagnostic tech', 'Auto mechanic'],
	'Space Station':['Engineer', 'Alien', 'Tourist', 'Pilot', 'Mission commander', 'Scientist', 'Doctor'],
	'Submarine':	['Cook', 'Captian', 'Sonar operator', 'Weapons technician', 'Sailor', 'Radioman', 'Navigator'],
	'Supermarket':	['Customer', 'Cashier', 'Butcher', 'Janitor', 'Produce manager', 'Food sample demoer', 'Shelf stocker'],
	'Theater':		['Coat check', 'Cue card prompter', 'Ticket office cashier', 'Theater visitor', 'Director', 'Actor', 'Crewman'],
	'University':	['Graduate student', 'Professor', 'Dean', 'Psychologist', 'Maintenance man', 'Student', 'Advisor']
};


var players = [];
var names = []
var playernum = 0;
var spyIndex;

$( function() {
	Object.keys(locations).forEach( function(loc) {
		$('#locationlist').append(loc+'<br />');
	});

	// buttons for role adding screen
	$('.btn-minus, .btn-plus').click( function() {
		onPlusMinusClick( this );
	});
	
	$('#btn-start').click( function() {
		if ( totalPlayers() == 0 ) {
			alert("You cannot play the game with zero players.");
			return;
		}
		
		
		if ( confirm("Total players: " + totalPlayers() + "\n\nOK to start the game?") ) {
			players = [];
			
			// create a list of selected roles
			var players_ordered = [];
			
			var locationKeys = Object.keys(locations);
			var locationKey = locationKeys[ Math.floor( Math.random()*locationKeys.length ) ];
			for ( i = 0; i < totalPlayers(); i++ ) {
				players_ordered[i] = "Location: " + locationKey + "<br />"+
					"Role: " + locations[locationKey][ Math.floor( Math.random()*locations[locationKey].length ) ];
			}

      spyIndex = Math.floor( Math.random() * players_ordered.length );
			// select one player at random to be a spy
			players_ordered[ spyIndex ] = "Location: Unknown<br />Role: Spy";
			
			// only show the "Your role is..." information
			$('#btn-start, #btn-newgame, #btn-roles, #game-tr, #controls-tr, #total-tr').toggle();
			$('#game').html('');
			
			$('#showrole').html('<h3>Pass the device to the first player.</h3><br />' + $('#samplecode #getrole').html() );
			names = []; // empty the array
			
			while ( players_ordered.length > 0 ) players.push( players_ordered.shift() );
			playernum = 0;
		
		}
	});
	
});

function onPlusMinusClick( btn ) {
	var rolecount = $(btn).parent().parent().find('.rolecount');
	var change = ( $(btn).hasClass('btn-minus') ) ? -1 : 1;
	if ( Number(rolecount.text()) > 0 || change > 0 ) {
		rolecount.text( Number( Number(rolecount.text()) + change) );
		$('#totalcount').text( Number( totalPlayers() + change) );
	}
}

function totalPlayers() {
	return Number($('#totalcount').text());
}

function showRole() {
	var role = { name: players[ playernum ] };
	if ( playernum == spyIndex ) role.rules = "Try to figure out what the location is, and don't get caught!";
	else role.rules = "Try to figure out who the spy is, and don't be too obvious about the location!";
	var passto = ( playernum == totalPlayers() - 1 ) ? 'set the device down' : 'pass the device to the next player';
	$('#showrole').html(
		'<h3>Memorize your role below.</h3><br />'
		+'<div style="width:80%; border: 1px solid #888; padding: 2em; margin: 0 auto"><h1>'+role.name+'</h1>'
		//+'<img src="images/'+(role.images[Math.floor(Math.random()*role.images.length)][0])+'" />'
		+role.rules
		+'</div><br /><h3>Now <button type="button" class="btn btn-primary btn-lg" onclick="hideRole()">Hide my role</button> and '+passto+'.</h3>'
	);
	playernum++;
}

function hideRole() {
	if ( playernum == players.length ) $('#showrole').html('<h3>Begin the game!<br /><br />When the game is over, <button type="button" class="btn btn-primary btn-lg" onclick="revealSpy()">Reveal the spy</button>');
	else $('#showrole').html( $('#samplecode #getrole').html() );
}

function revealSpy() {
	var spy = 0;
	for ( i=0; i<players.length; i++ ) {
		if ( players[i] == 'Spy' ) {
			spy = i+1;
			break;
		}
	}
	$('#showrole').html('<h3>The spy is...<br /><br />Player #' + (spyIndex+1) + '<br /><br /><button type="button" class="btn btn-primary btn-lg" onclick="startOver()">Start a new game</button></h3>' );
}

function startOver() {
	$('#total-tr, #game, #showrole').toggle();
	$('#showrole, #game').html('');
	$('#game, #game-tr, #btn-newgame, #btn-roles').toggle(false);
	$('#showrole, #btn-start, #controls-tr').toggle(true);
}

function startGame() {
	$('#total-tr, #game, #showrole').toggle();
	$('#showrole').html('');
	$('#game').html('<div class="main-title"><h3>Use this screen to keep track of player status and nighttime actions</h3></div>'
		+ '<div id="playerlist"><h1>Players</h1></div><div id="nightlist"><h1>Actions at night</h1></div>');
		
}