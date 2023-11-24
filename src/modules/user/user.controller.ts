import { Controller, Get, Post, Query, UseInterceptors, UseGuards, Headers, Body, UploadedFile, Param, Delete, HttpException, HttpStatus, Put, Res } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express'
import type { Response } from 'express';
import { ApiResponse, ApiOkResponse, ApiBody, ApiHeader } from "@nestjs/swagger";

import { HeaderGuard } from "../../utils/middleware/guard/header.guard";
import { CreateProfile, FilterProfile } from "../../dto/request/user.dto";
import { IUserProfile } from '../../dto/response/user.interface';
import { SchemaError, SchemaInput, SchemaNotFoundDetail, SchemaNotFoundList, SchemaSuccessDetail, SchemaSuccessList } from "src/dto/response/schema.dto";
import { FilterImage, StorageImage } from "../../utils/helpers/file-upload.helper";

import { ResponseList, ResponseInput, ResponseDetail } from "../../utils/middleware/interceptor/response/success";

import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService
    ){}
    
    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseDetail)
    @Get('/:username')
    @ApiHeader({
        name: 'api-key',
        description: 'Custom header',
        example: '2bff6094-e86a-474e-ae8c-4a5173538e31'
    })
    @ApiOkResponse({ type: SchemaSuccessDetail })
    @ApiResponse({ status: 404,  type: SchemaNotFoundDetail })
    @ApiResponse({ status: 400,  type: SchemaError })
    async GetUserProfile(@Param('username') username: string){
        return await this.service.GetUserProfile(username)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseList)
    @Get('')
    @ApiHeader({
        name: 'api-key',
        description: 'Custom header',
        example: '2bff6094-e86a-474e-ae8c-4a5173538e31'
      })
    @ApiOkResponse({ type: SchemaSuccessList })
    @ApiResponse({ status: 204,  type: SchemaNotFoundList })
    @ApiResponse({ status: 400,  type: SchemaError })
    async GetUserProfileList(@Query() query: FilterProfile, @Headers() headers:any){
        return await this.service.GetUserProfileList(query)
    }
    
    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseInput)
    @Post('register')
    @ApiHeader({
        name: 'api-key',
        description: 'Custom header',
        example: '2bff6094-e86a-474e-ae8c-4a5173538e31'
      })
    @ApiResponse({ status: 201,  type: SchemaInput })
    @ApiResponse({ status: 400,  type: SchemaError })
    async CreateUserProfile(@Body() body: CreateProfile, @Headers() headers:any){
        return await this.service.CreateUserProfile(body)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseInput)
    @Put('')
    @ApiHeader({
        name: 'api-key',
        description: 'Custom header',
        example: '2bff6094-e86a-474e-ae8c-4a5173538e31'
      })
    @ApiResponse({ status: 201,  type: SchemaInput })
    @ApiResponse({ status: 400,  type: SchemaError })
    async UpdateUserProfile(@Body() body:any, @Headers() headers:any){
        return await this.service.UpdateUserProfile(body)
    }   

    @UseGuards(HeaderGuard)
    @UseInterceptors(FileInterceptor('picture', { 
        storage: StorageImage,
        fileFilter: FilterImage,
        limits: { fileSize: 5 * 1024 * 1024 }}) ,ResponseInput)
    @Post('upload-photo')
    @ApiHeader({
        name: 'api-key',
        description: 'Custom header',
        example: '2bff6094-e86a-474e-ae8c-4a5173538e31'
      })
    @ApiBody({
        required: true,
        type: "multipart/form-data",
        schema: {
          type: "object",
          properties: {
            picture: {
              type: "string",
              format: "binary",
            },
          },
        },
      })
    async UploadPhoto(@UploadedFile() picture: any){
        return picture
    }

    @Get("/photo/:name")
    @ApiResponse({ status: 200, type: Buffer })
    async RetrievePhoto(@Res() res: Response, @Param('name') param){
        const path = await this.service.RetrievePhoto(param)
        res.sendFile(path)
    }

}
