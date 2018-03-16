var Model = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = function(req, res){
    res.render('register');
}

exports.login = function(req, res){
    res.render('login');
}

exports.create = function(req, res,next){
  console.log(req.email);
  Model.user.create({ 
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds)
  })
  .then(function(item){
    req.flash('success_msg', 'You are registered and can now login');
    res.render('index', { item: item, blog:"Sandy's blog"});
  }).catch(function(error){
    next(error);
  })
}

exports.validate = function(req,res,next){
  Model.user.findOne({ where:{email:req.body.email }})
  .then(function(item){
    if(!item){
      res.send("Unknown user");
    }
    bcrypt.compare(req.body.password, item.password).then(function(result) {
      if(result){
        res.send("User validated successfully");
      }
       res.send("Wrong password");
    }).catch(function(error){
      console.log(error);
    });
  }).catch(function(error){
    console.log(error);
  })
}


exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	Model.user.findOne({
    where: { email: email }
  })
  .then(function (result){
    callback(result)
  }).catch(function (error){
    return error;
  })    
}

exports.getUserById = function(id, callback){
	Model.user.findById(id, callback);
}

exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash).then(function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}

	