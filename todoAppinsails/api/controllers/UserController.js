/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    User.findOne({
      email:req.param('email'),
      password:req.param('password')
    }).exec(function(err,user){
      if(err){
        return res.serverError(err)
      }
      if(!user){
        return res.badRequest('email or pwd is wrong')
      }
      req.session.me = user.id;
      req.session.userName = user.name;

      console.log(user.id,">>>userid")
      res.redirect('/')
    })

  /*  return res.json({
      todo: 'login() is not implemented yet!'
    });*/
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    res.session.me = null;
    res.ok();

    /*return res.json({
      todo: 'logout() is not implemented yet!'
    });*/
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    User.create({
      name:req.param('name'),
      email:req.param('email'),
      password:req.param('password')
    }).exec(function(err,user){
      if(err){
        res.serverError(err)
      }
      req.session.me = user.id;
      res.redirect('/')
    })
  }
};

