import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from 'config';
import ApiRoutes from './routes/api';

let app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit : config.bodyLimit
}));


// api routes v1
app.use('/v1', ApiRoutes);

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + config.port + '/api');
});

app.listen(config.port);

console.log('SurveyGrill RESTfull API started on: '+ config.port);
module.exports=app;