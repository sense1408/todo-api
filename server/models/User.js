const mongoose = require('mongoose');
let User = mongoose.model('User', {
    email:{
      type: String,
      minlength: 1,
      trim: true
    }
});


module.exports = {User};
