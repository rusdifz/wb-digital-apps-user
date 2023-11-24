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
    @ApiProperty({ example: '0dece321-0b61-4bd5-9a43-be004a6da3ef-wb-digital.jpeg' })
    profile_picture: string
    password?: string
    @ApiProperty({ example: '1998-10-20' })
    birth_of_date: string
    @ApiProperty({ example: '2023-11-24T00:00:00Z' })
    created_at: string
    @ApiProperty({ example: '2023-11-24T00:00:00Z' })
    updated_at: string
}
