if (Meteor.isClient) {
	lists = new Meteor.Collection("Lists");
  Template.hello.greeting = function () {
    return "My List";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.categories.lists=function(){
	  return lists.find({},{sort:{Category:1}});
  }
  Session.set('adding_category',false);
  
  Template.categories.net_cat=function(){
	  return Session.equals('adding_category',true);
  };

  Template.categories.events({
	  'click #btnNewCat':function(e,t){
		  Session.set('adding_category',true);
		  Meteor.flush();
		  focusText(t.find("#add-category"));
	  }
  });
}

if (Meteor.isServer) {
	lists = new Meteor.Collection("Lists");
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
