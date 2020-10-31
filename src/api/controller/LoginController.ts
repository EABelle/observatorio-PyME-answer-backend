import {LoginService} from '../../core/service/LoginService';
import {Request, Response} from 'express';

function login(req: Request, res: Response) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.sendStatus(400);
    }
    return LoginService
        .login(userName, password)
        .then(userToken => {
            return res.send(userToken);
        })
        .catch(error => {
            if (!error.name) {
                return res.status(500).send({message: 'Ocurrió un error'});
            }
            const { name, message } = error;
            res.status(401);
            return res.send({name, message});
        });
}

export default { login };
