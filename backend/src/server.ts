import express from 'express';
import { routes } from './routes';

const PORT = 9090;
const app = express();

app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
    console.log("Server UP on " + PORT);
});
