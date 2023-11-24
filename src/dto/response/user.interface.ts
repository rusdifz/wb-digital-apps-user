import { ApiProperty } from "@nestjs/swagger";
import { IsArray} from "class-validator";
export class IUserProfile {
    @ApiProperty({ example: '1' })
    user_id: number
    @ApiProperty({ example: 'rusdifz' })
    username: string
    @ApiProperty({ example: 'Muhammad Fauzan Rusdi' })
    fullname: string
    @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
    email: string
    password?: string
    @ApiProperty({ example: '1998-10-20' })
    birth_of_date: string
    @ApiProperty({ example: '2023-11-24T00:00:00Z' })
    created_at: string
    @ApiProperty({ example: '2023-11-24T00:00:00Z' })
    updated_at: string
}
