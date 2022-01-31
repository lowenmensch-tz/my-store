const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port =  process.env.PORT || 3000;


//middleware -> recibir información de tipo JSON que envian por el método POST
app.use(express.json());

const whitlist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitlist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  },
}

//habilitar cualquier dominio
app.use(cors());

// GET method route
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});


// Modularización de rutas
routerApi(app);


// Middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);
