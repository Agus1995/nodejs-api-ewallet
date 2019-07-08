import express from 'express';
import Auth from '../service/auth'
import CommonResponse from "../dto/CommonResponse";


const AuthRoute = express.Router();

AuthRoute.post('/customer', (req, res, next) => {
    Auth.create(req.body, function (error, result) {
        if (error){
            console.log(error);
            res.json(new CommonResponse('02',error))
        }
        else {
            res.json(new CommonResponse('','',result));
            console.log(result);
        }
    });
});

AuthRoute.post('/customer/login', (req, res, next) => {
    Auth.login(req.body, function (error, result) {
        if (error){
            res.json(new CommonResponse('02',error))
        }else if (result == null){
            res.json(new CommonResponse('03', `Id ${req.body} Not Found`, null))
        }
        else {
            res.json(new CommonResponse('','',result))
        }
    });
});



export default AuthRoute;