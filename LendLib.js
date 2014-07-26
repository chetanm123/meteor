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
  
  Template.categories.new_cat=function(){
	  return Session.equals('adding_category',true);
  };

  Template.categories.list_status=function(){
	  if(Session.equals('current_list',this._id))
		  return "";
	  else
		  return "btn-inverse";
  };

  Template.categories.events({
	  'click #btnNewCat':function(e,t){
		  Session.set('adding_category',true);
		  Meteor.flush();
		  focusText(t.find("#add-category"));
	  },
		
	  'keyup #add-category':function(e,t){
		  if(e.which===13){
			  var catVal = String(e.target.value || "");
			  if(catVal){
				  lists.insert({Category:catVal});
				  Session.set('adding_category',false);
			  }
		  }
	  },
		
	  'focusout #add-category':function(e,t){
		  Session.set('adding_category',false);
	  },
	  'click .category':selectCategory
  });

  function focusText(i){
	  i.focus();
	  i.select();
  }

  function selectCategory(e,t){
	  console.log(this._id);
	  Session.set('current_list',this._id);
  }

  Template.list.items=function(){
	  if(Session.equals('current_list',null))
		  return null;
	  else{
		  var cats = lists.findOne({_id:Session.get('current_list')});
		  
		  if(cats && cats.items){
				
			  for(var i=0;i<cats.items.length;i++){
				  var d = cats.items[i];
				  d.Lendee=d.LentTo?d.LentTo:"free";
				  d.LendClass = d.LentTo?"label-important":"label-success";
			  }
			  return cats.items;
		  }
	  }
  }

  Template.list.list_selected=function(){
	  return ((Session.get('current_lists')!=null)&&(!Session.equals('current_list',null)));
  }

  Template.list.list_adding=function(){
	  return Session.equals('list_adding',true);
  };

  Template.list.lendee_editing=function(){
	  return Session.equals('lendee_input',this.Name);
  };

  Template.list.events({
	  'click #btnAddItem':function(e,t){
		Session.set('list_adding',true);
		Meteor.flush();
		focusText(t.find('#item_to_add'));
	  }
  });
}



if (Meteor.isServer) {
	lists = new Meteor.Collection("Lists");
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
