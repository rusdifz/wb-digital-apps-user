import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { IUserProfile } from 'src/dto/response/user.interface';
import { Repository, Like } from "typeorm";

import { CreateProfile } from '../../dto/request/user.dto';
import { UserProfile } from '../../entities';
// import _, { map } from 'underscore'


@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserProfile) private user: Repository<UserProfile>
    ){}

    async CekUsername(username:string){
        const data = await this.user.findOne({
            where: {
                username: username
            }
        })
        // const data = {}

        if(data){
            return true
        }

        return false
    }

    async SaveProfile(props: CreateProfile){
        // return await this.user.save(props)
        return true
    }

    async GetUserProfile(query:any){
    
        const [data, count] = await Promise.all([
            this.user.find({
                where: [
                    {
                        username: Like(query.search)
                    },
                    {
                        fullname: Like(query.search)
                    }
                ],
                take: query.limit, 
                skip: query.page
            }),
            this.user.count({
                where: [ { username: Like(query.search) }, { fullname: Like(query.search) } ]
            })
        ])

        // const [data, count] = await Promise.all([
        //     [{
        //         user_id: 1,
        //         username: "rusdifz",
        //         fullname: "fauzan rusdi",
        //         email: "fauzanrusdi20@gmail.com",
        //         birth_of_date: "20122",
        //         created_at: "2022",
        //         updated_at: "string"
        //     }],
        //     1
        // ])

        return {data, count}

    }

}