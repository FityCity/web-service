app=require('../app')



app.get('/getLocation',function(req,res){
	var latitude=req.param('la');
	var longtitude=req.param('lo')
	var responseText="Latitude:"+latitude+" Longtitude:"+longtitude
	res.send(responseText)

})