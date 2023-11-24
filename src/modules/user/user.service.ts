import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { existsSync } from 'fs';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

import { IUserProfile } from '../../dto/response/user.interface';

import { CreateProfile, FilterProfile, UpdateProfile } from '../../dto/request/user.dto';

import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async GetUserProfile(username: string): Promise<IUserProfile>{

        const user:any = await this.userRepository.GetUserProfile(username)

        if(user){
            user.profile_picture = "http://localhost:3000/user/photo"+user.profile_picture
        }

        return user
       
    }

    async GetUserProfileList(props:FilterProfile): Promise<{data:IUserProfile[], count: number}>{

        const page = props.page ? parseInt(props.page) : 1
        const limit = props.limit ? parseInt(props.limit) : 10

        let users:any = await this.userRepository.GetUserProfileList({page, limit, search: props.search ? props.search : null})

        if(users.data.length > 0){
            users.data = users.data.map(dt=>{
                dt.profile_picture = "http://localhost:3000/user/photo"+dt.profile_picture
                return dt
            })
        }

        return users
    }

    async CreateUserProfile(props: CreateProfile): Promise<{user: IUserProfile, token: string}>{
        
        const cekUsername = await this.userRepository.CekUsername(props.username)

        if(cekUsername){
            throw new HttpException('username already exist', HttpStatus.BAD_REQUEST)
        }

        const payload:any = {
            ...props,
            password: await bcrypt.hash(props.password, 10)
        }

        const saveData = await this.userRepository.SaveProfile(payload)

        if(saveData){
            delete payload.password

            const token = jwt.sign(payload, process.env.JWT_KEY)

            return { user: payload, token: token }
        }
        
        throw new HttpException('failed register new user', HttpStatus.BAD_REQUEST)

    }

    async UpdateUserProfile(props: UpdateProfile): Promise<Partial<IUserProfile>>{

        const saveData = await this.userRepository.SaveProfile(props)

        if(saveData){
           return props
        }
        
        throw new HttpException('failed update user', HttpStatus.BAD_REQUEST)

    }

    async RetrievePhoto(name:string){
        const path = __dirname.toString().replace("modules/user","utils/helpers/image/"+name)

        if(existsSync(path)){
            return path
        }
    }

}
