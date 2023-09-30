import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders:
    'Content-Type, Authorization, XMLHttpRequest, X-Requested-With, Accept, Origin',
};

export const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(cors(corsOptions));
app.use(bodyParser({ limit: '50mb' }));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
