import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
  
@Injectable()
export class ResponseInput implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    return next.handle().pipe(
      map(async response => {

        let code = response ? true : false
        let meta:any = setCode(code, 'INPUT')

        context.switchToHttp().getResponse().status(meta.code)

        return {
          meta: meta,
          data: response
        }       

      })
    )
  }
}

export class ResponseList implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    
    const query = context.switchToHttp().getRequest().query
    
    return next.handle().pipe(
      map(async response => {
    
        // const meta = setCode(true, "GET")
        let data = response ? response : []
        let pagination:any = undefined

        if(response && response.data){
          
          data = response.data ? response.data : []
          
          const page = query.page ? parseInt(query.page) : 1
          const limit = query.limit ? parseInt(query.limit) : 10
          
          pagination = response.pagination ? response.pagination : {
            page: Math.ceil(page),
            total: response.count,
            total_page: Math.ceil(response.count/limit)
          }

        }

        context.switchToHttp().getResponse().status(200)

        return {
          meta: {
            code: 200, 
            msg: data.length > 0 ? "Success" : "Data Not Found"
          }, 
          data, 
          pagination
        }

      })
    )

  }
}

export class ResponseDetail implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> { 
    return next.handle().pipe(
      map(async response => {
        
        let code = response && Object.keys(response).length === 0 ? false : true
        let meta:any = setCode(code, 'GET')

        return {
          meta, 
          data: response ? response : null
        }

      })
    )
  }
}

export class ResponseNonPagination implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> { 
    return next.handle().pipe(
      map(async response => {
        
        let code = false

        if(response){
          let cekArray = Array.isArray(response)
          if(cekArray){
            code = response.length === 0 ? false : true
          }else{
            code = Object.keys(response).length === 0 ? false : true
          }
        }

        let meta:any = setCode(code, 'GET')
        context.switchToHttp().getResponse().status(meta.code)
        
        return {
          meta: meta,
          data: response ? response : null
        }
      })
    )
  }
}

function setCode(information: boolean, method: string) {
  if(method == "GET"){
    return {
      code: information ? 200 : 404,
      msg: information ? "Success" : "Data Not Found"
    }  
  }
  return {
    code: information ? 201 : 400,
    msg: information ? "Success" : "Bad Request"
  }
}