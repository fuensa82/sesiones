
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
	console.log("Entrando"+req.params.id);
	console.log("Sesiones: "+req);
	if(req.session.nombre==undefined){
		console.log("Sin sesion");
		req.session.nombre=req.params.id;
	}else{
		console.log("Con sesion: "+req.session.nombre);
	}
	res.json({cosa:"que"});
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});