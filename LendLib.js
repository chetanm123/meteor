function adminUser(userId){
	console.log("UserId "+userId);
	var adminUser = Meteor.users.findOne({username:"admin"});
	return (userId && adminUser && userId===adminUser._id);
}

lists.allow({
	insert:function(userId,doc){
		console.log("ADD --> "+userId);
		return (adminUser(userId) || (userId && doc.owner === userId));
	},
	update:function(userId,doc){
		console.log("Update --> "+userId);
			return adminUser(userId) || _.all(docs, function(doc) {
			return doc.owner === userId;
		});
	},
	remove:function(userId,doc){
		console.log("Remove --> "+userId);
		return adminUser(userId) || _.all(docs, function(doc) {
			return doc.owner === userId;
		});
	}
});