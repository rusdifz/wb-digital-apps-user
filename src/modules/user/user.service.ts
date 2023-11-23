import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { existsSync } from 'fs';
import { IUserProfile } from 'src/dto/response/user.interface';

import { CreateProfile, FilterProfile, UpdateProfile } from '../../dto/request/user.dto';

import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}


    async GetUserProfile(props:FilterProfile): Promise<{data:IUserProfile[], count: number}>{

        const page = props.page ? parseInt(props.page) : 1
        const limit = props.limit ? parseInt(props.limit) : 10

        let users:any = await this.userRepository.GetUserProfile({page, limit, search: props.search})

        return users
    }

    async CreateUserProfile(props: CreateProfile): Promise<IUserProfile>{
        console.log('user', props);
        
        const cekUsername = await this.userRepository.CekUsername(props.username)

        if(cekUsername){
            throw new HttpException('username already exist', HttpStatus.BAD_REQUEST)
        }

        const saveData:any = await this.userRepository.SaveProfile(props)

        if(saveData) return saveData

        throw new HttpException('failed register new user', HttpStatus.BAD_REQUEST)

    }

    async UpdateUserProfile(props: UpdateProfile): Promise<IUserProfile>{
        return
    }

    async RetrievePhoto(name:string){
        const path = __dirname.toString().replace("modules/user","utils/helpers/image/"+name)

        if(existsSync(path)){
            return path
        }
    }

}
