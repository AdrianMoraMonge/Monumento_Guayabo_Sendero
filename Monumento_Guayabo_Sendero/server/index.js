var  Db = require('./database/dboperations');
var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors()); // {origin :'http://localhost:8090'}
app.use('/api', router);

router.use((request, response, next) => {
  next();
});

router.route('/addNewUser').post((request, response) => {
    Db.addNewUser(request.body).then((data) => {
      response.json(data);
    })
});

var  port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);