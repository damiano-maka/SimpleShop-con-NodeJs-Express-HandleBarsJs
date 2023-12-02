import express, { NextFunction, Request, Response } from "express";
import data from "./data";

const port = 3000;
const app = express();

app.set("views", "./src/views");
app.set("view engine", "hbs"); 

app.use(express.static('public'));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url} - User Agent: ${req.get('User-Agent')}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.render('index', { products: data, homepagetittle: "Product Store" });
});

app.get('/prodotti/:id', (req: Request, res: Response) => {
  const id = req.params["id"];
  const productId = Number(id);


  const product = data.find(item => item.id === productId);
  res.render('product', { product, homepagetittle: product?.title });



});

app.get('/api/prodotti/all', (req: Request, res: Response) => {
  res.json(data);
});

app.get('/api/prodotti/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = data.find(item => item.id === productId);
  res.json(product);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('error', { errorStatus: 404, errorMessage: 'Pagina non trovata.' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render('error', { errorStatus: 500, errorMessage: 'Errore del server.' });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
