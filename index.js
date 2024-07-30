import express from 'express';
import { homelettersRouter } from './src/routes/home_letters.route.js';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.send('자취레터 구독정보 저장하기 api');
});

// router setting
app.use('/home_letters', homelettersRouter);

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
