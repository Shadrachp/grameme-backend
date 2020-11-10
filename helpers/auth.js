module.exports => { //for protecting routes
  ensureAuth: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    //not authenticated
    res.redirect('/posts');
  }
}
