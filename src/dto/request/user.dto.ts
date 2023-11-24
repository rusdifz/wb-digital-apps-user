import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsOptional} from "class-validator";

export class CreateProfile {
    @ApiProperty({
        type: 'string',
        example: 'rusdifz',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty({
        type: 'string',
        example: 'fauzan rusdi',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    fullname: string

    @ApiProperty({
        type: 'string',
        example: 'kembangkol',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty({
        type: 'string',
        example: '0dece321-0b61-4bd5-9a43-be004a6da3ef-wb-digital.jpeg',
        required: true
    })
    @IsOptional()
    @IsString()
    profile_picture?:any
}

export class UpdateProfile extends CreateProfile {
    user_id: number
    email?: string
    birth_of_date?: string
}

export class FilterProfile {
    @ApiProperty({
        type: 'string',
        example: 'fauzan rusdi',
        required: false
    })
    @IsOptional()
    search?:string
    @ApiProperty({
        type: 'integer',
        example: 1,
        required: false
    })
    @IsOptional()
    page?: any = 1
    @ApiProperty({
        type: 'integer',
        example: 10,
        required: false
    })
    @IsOptional()
    limit?: any = 10
}