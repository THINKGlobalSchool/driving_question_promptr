DrivingQuestionParts = {};
DrivingQuestionParts.framing_words = [
	"How can...",
	"How do...",
	"Should...",
	"Could..."
];
DrivingQuestionParts.entities = [
	"I/We",
	"We, as [role/occupation]",
	"Town / City / County",
	"State / Province / Country"
];
DrivingQuestionParts.actions = [
	"Build / Make / Create...",
	"Design / Plan...",
	"Solve...",
	"Write..."
];
DrivingQuestionParts.purposes = [
	"Real-world problem",
	"For a public audience",
	"For a school",
	"For a classroom"
];

function chooseRandom(arr) {
		return arr[Math.floor(Math.random()*arr.length)]; 
}

if (Meteor.isClient) {
	Template.q_generator.helpers({
		selected: function(session_var) {
			if (Session.get(session_var) == this) {
				return "selected";
			}
		},
		framing_options: function() {
			return DrivingQuestionParts.framing_words;
		},
		entity_options: function() {
			return DrivingQuestionParts.entities;
		},
		action_options: function() {
			return DrivingQuestionParts.actions;
		},
		purpose_options: function() {
			return DrivingQuestionParts.purposes;
		}
	});	

	Template.q_generator.events({
		'change select': function(e) {
			new_val = $(e.target).val();
			key = "selected_"+$(e.target).attr('name');
			Session.set(key,new_val);
		},
		'click #randomize': function(e) {
			Template.q_generator.randomize();
		}
	});

	Template.q_generator.randomize = function() {
		console.log('super awesome randomized goodness');

		framing_word = chooseRandom(DrivingQuestionParts.framing_words);
		Session.set('selected_framing_word',framing_word);
		
		entity = chooseRandom(DrivingQuestionParts.entities);
		Session.set('selected_entity',entity);
		
		action = chooseRandom(DrivingQuestionParts.actions);
		Session.set('selected_action',action);
		
		purpose = chooseRandom(DrivingQuestionParts.purposes);
		Session.set('selected_purpose',purpose);
	};
}

