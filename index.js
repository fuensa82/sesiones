
/**
 * Module dependencies.
 */
 
var express = require('express');
var http = require('http');
var path = require('path');
 
var app = express();
 
// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));//necesario para utilizar sesiones
app.use(express.session({cookie: {maxAge: 900000}}));//tiempo de expiración de la sesión
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
 
app.get("/hola/:id",function(req,res){
	if(req.session.conectado!=="S"){
		res.send("Debe logarse");
		return;
	}
	console.log("Entrando"+req.params.id);
	console.log("Sesiones: "+req);
	
	res.json({cosa:"que"});
});

app.post("/login",function(req,res){
	var user=req.param('nick');
	var password=req.param('password');
	if(user=='vPalomo' && password=='03885536'){
		console.log("Logado");
		res.send("Logado");
		req.session.conectado="S";
	}else{
		req.session.conectado="N";
		console.log("Error en user o password");
		res.send("Error en user o password");
	}
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});