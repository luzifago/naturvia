import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors'
import clientes from "./src/routes/routeCliente.js"
import productos2 from "./src/routes/routeProductos.js"
import factura from "./src/routes/routeFacturas.js"
import facturaDet from "./src/routes/routeFacturaDe.js"
import proDetalles from "./src/routes/routerProduDe.js"
import proMasCinco from "./src/routes/routeProMasVen.js"
import promasporvendedores from "./src/routes/routerProVenPorV.js"
import authRouter from './src/routes/routeAutenticacion.js'; 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine','ejs')
app.set('views','./views')
app.use(express.static('public'));
app.use(cors());
app.use('/document',(req,res)=>{
    res.render('documentacion.ejs')
})
app.use('/clientes',clientes,);
app.use('/productos',productos2,);
app.use('/factura',factura);
app.use('/factuaDet',facturaDet)
app.use('/proDetalles',proDetalles)
app.use('/proMasCinco',proMasCinco)
app.use('/promasporvendedores',promasporvendedores)
app.use(authRouter)


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
});