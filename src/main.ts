import 'dotenv/config'
import express, {Request, Response} from 'express'
import cors from 'cors'
import { Weaviate } from './weaviate/client'

const port = 4000;
const app = express()
const weaviate = new Weaviate();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`🚀 App listening on the port ${port}`);
});

(async() => {
    try{
        await weaviate.init();
    }
    catch (e){
        console.log(e);
    }
})();
