import { Request, Response, NextFunction } from 'express';


function errorHandler(err, req: Request, res: Response, next: NextFunction){
    const status = err.number;
    // let message = '';
    // switch(status){
    //     case 547:
    //         message = 'Esse registro não pode ser deletado. Deve haver alguma restrição para esse registro.';
    //     default:
    //         message = 'Internal Server Error'; 
    // }
    res.send({ status });
    // console.error(err.number);
}

export { errorHandler };
