import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { IUserProfile } from 'src/dto/response/user.interface';
import { Repository, Like } from "typeorm";

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

    async SaveProfile(props: any){
        return await this.user.save(props)
    }

    async GetUserProfile(username: string){
        
        return await this.user.findOne({
            select: {
                user_id: true, 
                username: true, 
                fullname: true, 
                email: true, 
                birth_of_date: true,
                profile_picture: true,
                created_at: true, 
                updated_at: true
            },
            where: {
                username: username
            }
        })

    }

    async GetUserProfileList(query:any){
        
        let data:any, count:any

        if(query.search){
            [data, count] = await Promise.all([
                this.user.find({
                    select: {
                        user_id: true, 
                        username: true, 
                        fullname: true, 
                        email: true, 
                        birth_of_date: true,
                        profile_picture: true,
                        created_at: true, 
                        updated_at: true
                    },
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
        }else{
            [data, count] = await Promise.all([
                this.user.find({
                    select: {
                        user_id: true, 
                        username: true, 
                        fullname: true, 
                        email: true, 
                        birth_of_date: true,
                        profile_picture: true,
                        created_at: true, 
                        updated_at: true
                    },
                    take: query.limit, 
                    skip: query.page
                }),
                this.user.count()
            ])
        }

        return {data, count}

    }

}