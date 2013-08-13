
/*
 * GET home page
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
 * GET Hellow World page
 */
exports.helloworld = function(req, res){
  res.render('helloworld', { title: 'Hello, World!' });
};

/*
 * GET DB Output page
 */
exports.dboutput = function(db) {
	return function(req, res) {
		var collection = db.get('nodetest1');
		collection.find({},{},function(e,docs){
			res.render('dboutput', {
				"userlist" : docs
			});
		});
	};
};

/*
 * GET DB Input page
 */
exports.dbinput = function(req, res){
  res.render('dbinput', { title: 'Add User' });
};

/*
 * POST form
 */
exports.postform = function(db) {
	return function(req, res) {

		// Get our form values. These rely on the "name" attributes
		var userName = req.body.username;
		var userEmail = req.body.useremail;

		// Set our collection
		var collection = db.get('nodetest1');

		// Submit to the DB
		collection.insert({
			"username" : userName,
			"email" : userEmail
		}, function (err, doc) {
			if (err) {
				// If it failed, return error
				res.send("There was a problem adding the information to the database.");
			}
			else {
				// If it worked, forward to success page 
				res.redirect("dboutput");
				// And set the header so the address bar doesn't still say /postform
				res.location("dboutput");
			}
		});

	}
}