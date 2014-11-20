app=require('../app')



app.get('/session',function(req,res){
	sess=req.session;
	if(sess.username){
		console.log(sess.username);
		res.json({username:sess.username});
	}
	else{
		console.log("not found");
	}
	res.end();
})


app.post('/session',function(req,res){
	sess=req.session;
	sess.username=req.body.username;
	res.end("done")
})

app.get('/cookies',function(req,res){
	cookie=req.cookies
	console.log("cookies:",cookie.user)
	res.json(cookie)
})

app.post('/cookies',function(req,res){
	cookies=req.cookies.user
	if(!cookies){
		var user=new Object();
		user.username="test";
		user.role="admin";
		res.cookie('user',JSON.stringify(user),{ maxAge: 900000, httpOnly: false });
	}


	res.end()
})