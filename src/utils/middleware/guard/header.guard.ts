import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class HeaderGuard implements CanActivate {
  constructor(){}

  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    
    const authorization = request.headers['authorization'];
    const apikey = request.headers['api-key']
    
    if(authorization){
      const auth = await this.validateHeader(authorization, apikey)
      request.headers["user"] = auth
    }else{
      await this.validateHeader(undefined, apikey)
    }

    return true 
  }

  private async validateHeader(authorization: string, apikey: string){

    if (!apikey || apikey != "2bff6094-e86a-474e-ae8c-4a5173538e31") {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if(authorization){
      const auth = await jwt.verify(authorization, process.env.JWT_KEY)
      return auth
    }
    
    return true
    
  }

}
