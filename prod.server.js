let express = require('express')
let config = require('./config/index')
let app = express();
let apiRoutes = express.Router()

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port;

module.exports = app.listen(port,function (err) {
  if(err){
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '/n');
})