import ParameterError from '../../infraestructure/sdk/error/parameter-error';
import ProcessError from '../../infraestructure/sdk/error/process-error';
import ReferenceError from '../../infraestructure/sdk/error/reference-error';
import UnauthorizedError from '../../infraestructure/sdk/error/unauthorized-error';
import ValidationError from '../../infraestructure/sdk/error/validation-error';


export default function useError (err, req, res, next) {
    if (err) {

        let statusCode;
        if (err instanceof ParameterError) {
            statusCode = 400;
        }
        else if (err instanceof ValidationError) {
            statusCode = 400;
        }
        else if (err instanceof ReferenceError) {
            statusCode = 404;
        }
        else if (err instanceof UnauthorizedError) {
            statusCode = 401;
        }
        else if (err instanceof ProcessError) {
            statusCode = 500;
            console.error(err.originError);
        }
        else {
            statusCode = err.statusCode ?? 500;
            console.error(err);
        }

        const httpError = {
            statusCode: statusCode,
            message: err.message
        }

        return res.status(httpError.statusCode).send(httpError);
    }

    next();
}
