//Setup up a reactive computation that monitors when clients' states
Meteor.startup(function(){
    Meteor.defer(function(){
        Tracker.autorun(function(){
            //Just use TS's default lobby and let the Assigner handle matching
            //If in experiment add to players db and send to instructions
            if(TurkServer.inLobby()){
                var batch = TurkServer.batch();
                Meteor.subscribe('lobby', batch && batch._id);
                Router.go('lobbyUG');
            }
            else if (TurkServer.inExperiment()){
                Router.go('instructionsInteractive');
            } 
            //If in the experiment has ended take them to the exit survey
            else if (TurkServer.inExitSurvey()){
                Router.go('endSurvey');
            }
        });
    });
});

//Reactively subscribe to the partitioned databases
Tracker.autorun(function(){
    var group = TurkServer.group();
    if (group == null){
        return;
    }
    Meteor.subscribe('Players');
    Meteor.subscribe('Games',group);
});


//Keep tabs on the other user being played with
/*
Tracker.autorun(function(){
    var group = Turkserver.group();
});
*/

//New Spacebars function that should work on all templates
Template.registerHelper("equals", function(a,b){
    return (a==b);
});

// Login validation
$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
});

/*
//Registration handler
Template.register.onRendered(function(){
    var validator = $('.register').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
                if(error){
                    if(error.reason == "Email already exists."){
                        validator.showErrors({
                            email: "That email already belongs to a registered user."   
                        });
                    }
                } else {
                     Meteor.call('addPlayer', {}, function(){
                        Router.go('lobby');
                });
                }   
            });
        }
    });
});

*/
//Login handler
/*
Template.login.onRendered(function(){
    var validator = $('.login').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error){
              if(error){
                  if(error.reason == "User not found"){
                      validator.showErrors({
                        email: "That email doesn't belong to a registered user."   
                      });
                  }
                  if(error.reason == "Incorrect password"){
                      validator.showErrors({
                        password: "You entered an incorrect password."    
                      });
                  }
              } else {
                Meteor.call('addPlayer', {}, function(){
                    Router.go('lobby');
                });
              }
            });
        }
    });
}); */
/*
Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    }
});
*/