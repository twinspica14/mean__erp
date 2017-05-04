var Client  = require("../models/blog");
var Invoice  = require("../models/invoice");

module.exports= function(router){




router.get('/clients', function(req, res){


		Client.find({}, function(err, clients) {
	return res.json(clients);
});




	});



router.get('/clients/name/:name', function(req, res){

	var name = req.params.name;
	Client.findOne({'name': new RegExp(name, "i")}, function(err, clients){
	return res.json(clients);
});
	});



















router.get('/invoices', function(req, res){
	
		Invoice.find({}, function(err, invoices) {
	return res.json(invoices);
});
	});

router.get('/invoices/:_id', function(req, res){
	console.log(req.params._id)
		var Getidinvoice = req.params._id;
		Invoice.findById(Getidinvoice, function(err, invoices) {
	return res.json(invoices);
});
	});

router.post('/clients', function(req, res){ //by making route in from server.js to here means, we can no longer use app.get, put, post, but router.get
      //  var token = req.body.token || req.headers['x-access-token']; // Check for token in body, URL, or headers
		//var user = jwt.decode(token, secret);

		var client = new Client();
		client.name = req.body.name;
		client.id = req.body.id;
		client.address = req.body.address;
		client.contact = req.body.contact;
		client.cst = req.body.cst;
		client.vat = req.body.vat;
		client.pan =  req.body.pan;
		client.email = req.body.email;
		
		client.save(function (err) {
			if(err) throw err;

			res.json({success: true, message:'awesomme'});
		});
  
  // saved!

});





 router.post('/invoices', function(req, res){ //by making route in from server.js to here means, we can no longer use app.get, put, post, but router.get
      //  var token = req.body.token || req.headers['x-access-token']; // Check for token in body, URL, or headers
		//var user = jwt.decode(token, secret);
		
		
		var invoice = new Invoice();
		invoice.name = req.body.name;
       invoice.price = req.body.price;
        invoice.payment = req.body.payment;
         invoice.check = req.body.check;

		   for (var i = 0; i < req.body.length; i++) {
    	  
     invoice.items.push({name:req.body.objects[i].fname, price:req.body.objects[i].price, qty: req.body.objects[i].quant});
} 
invoice.xxx = i; 
		//invoice.items.insertMany(items, function(error, next) {
			invoice.save(function (err) {
			if(err) throw err;

			res.json({success: true, message:'allahuakbar'});
		
		});

		
  
  // saved!

});

router.delete('/clients/:_id', function(req, res){
	var deleteClient = req.params._id;
	Client.findByIdAndRemove(deleteClient, function(err, client){
		if(err) throw err;

		res.json({success:true});

	});

});
router.delete('/invoices/:_id', function(req, res){
	var deleteInvoice = req.params._id;
	Invoice.findByIdAndRemove(deleteInvoice, function(err, invoice){
		if(err) throw err;

		res.json({success:true});

	});

});

router.put('/clients/:_id', function(req, res){

	var editClient = req.params._id;
	var update = {name:req.body.name,
		id:req.body.id, address: req.body.address,
		contact : req.body.contact,
		cst : req.body.cst,
		vat : req.body.vat,
		pan :  req.body.pan,
		email : req.body.email};
	Client.findByIdAndUpdate(editClient, update, function(err, client){
		if(err) throw err;

		res.json({success:true, message:"lol"});
	});

});


router.put('/invoices/:_id', function(req, res){

	var editInvoice = req.params._id;
	var update = {payment:req.body.payment};
	Invoice.findByIdAndUpdate(editInvoice, update, function(err, invoice){
		if(err) throw err;

		res.json({success:true, message:"lol"});
	});

});






















return router;
};
