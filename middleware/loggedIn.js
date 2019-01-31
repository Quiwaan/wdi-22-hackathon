module.exports = function(req, res, next){
	if(req.user){
		console.log('what about now though')
		next();
	}
	else {
		res.redirect('./login')
	}
}