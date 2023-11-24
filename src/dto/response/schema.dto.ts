import { IUserProfile } from "./user.interface"
import { ApiProperty } from "@nestjs/swagger";

class MetaCode {
    code: number
    msg: string
}

class Pagination {
    @ApiProperty({ example: 1 })
    page: number
    @ApiProperty({ example: 5 })
    total: number
    @ApiProperty({ example: 5 })
    total_page: number
}

export class SchemaSuccessDetail {
    @ApiProperty({ example: { code: 200, msg: "success" } })
    meta: MetaCode

    @ApiProperty({ example: IUserProfile })
    data: IUserProfile
}

export class SchemaSuccessList {
    @ApiProperty({ example: { code: 200, msg: "success" } })
    meta: MetaCode

    @ApiProperty({ example: [IUserProfile] })
    data: IUserProfile[]

    @ApiProperty({ example: Pagination })
    pagination: Pagination
}

export class SchemaNotFoundDetail {
    @ApiProperty({ example: { code: 404, msg: "Data Not Found" } })
    meta: MetaCode

    @ApiProperty({ example: null })
    data: any
}

export class SchemaNotFoundList{
    @ApiProperty({ example: { code: 204, msg: "Data Not Found" } })
    meta: MetaCode

    @ApiProperty({ example: [] })
    data: []

    @ApiProperty({ example: Pagination })
    pagination: Pagination

}

export class SchemaError {
    @ApiProperty({ example: { code: 400, msg: "Bad Request" } })
    meta: MetaCode
}

