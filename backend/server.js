import express from 'express';
import data from './data.js';
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express(); 
const port = process.env.PORT || 5000

app.use(express.json());

app.post('/api/create', function(req, res) { 
    var currentdate = new Date(); 
    var dateString = "" + currentdate.getDate() + "-"
    + (currentdate.getMonth()+1)  + "-" 
    + currentdate.getFullYear()

    fs.writeFile(`${__dirname}/../checkoutLogs/order-${req.body.orderId}-${dateString}.json`, JSON.stringify(req.body, null, "\t"), function(err, result) {
        if(err) console.log('error', err);
    });
    res.send("Good")
  });

app.get('/api/products',(req, res) =>{
    res.send(data.products);
});

app.get('/api/products/:id',(req, res) =>{
    const product = data.products.find(x => x._id === req.params.id);
    if(product){
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

app.get('/',(req, res) =>{
    res.send('Server is ready');
});

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
