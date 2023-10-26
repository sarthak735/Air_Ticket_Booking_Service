const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const setupAndStartServer = () =>{

    const db = require('./models/index')

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/app', apiRoutes);

    app.listen(PORT, () =>{
        console.log(`Server started on port ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
    })
}

setupAndStartServer();