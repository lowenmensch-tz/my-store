const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;


//middleware -> recibir información de tipo JSON que envian por el método POST
app.use(express.json());

// GET method route
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});


// Modularización de rutas
routerApi(app);
