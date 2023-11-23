import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
  
@Catch(HttpException)
export class ResponseErrorGlobal implements ExceptionFilter {
    constructor() {}
  
    /**
     * Get Incomplete/error form validation message
     * @param exception
     */
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      
      let message:string;
      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        message = 'Internal server error';
      } else {
        if(exception.message.toLowerCase() === "bad request exception"){
          let field = ''
          if(exception['response']['message'].length > 0) field = exception['response']['message'].join(', ')
          
          message = field == '' ? `this field is required` : 'this field ' + field;
        }else{
          message = exception.message;
        }
      }
      
      response.status(status).json({
        meta: {
          code: status,
          msg: message,
        },
        error: message
      });
    }
}