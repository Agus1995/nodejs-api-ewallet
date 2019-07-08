import Express from 'express';
import bodyParser from 'body-parser';
import AuthRoute from './routes/auth';
import AccountRoute from './routes/account';
import TransactionRoute from './routes/transaction';
import WalletRoute from './routes/wallet'
const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(AuthRoute);
app.use(AccountRoute);
app.use(TransactionRoute);
app.use(WalletRoute);

app.listen(3200, () => console.log('Application started on port 3200'));