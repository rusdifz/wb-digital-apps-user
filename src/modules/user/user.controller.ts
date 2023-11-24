import { Controller, Get, Post, Query, UseInterceptors, UseGuards, Headers, Body, UploadedFile, Param, Delete, HttpException, HttpStatus, Put, Res } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express'
import type { Response } from 'express';
import { ApiResponse, ApiOkResponse } from "@nestjs/swagger";

import { HeaderGuard } from "../../utils/middleware/guard/header.guard";
import { CreateProfile, FilterProfile } from "../../dto/request/user.dto";
import { IUserProfile } from '../../dto/response/user.interface';
import { SchemaNotFoundDetail, SchemaNotFoundList, SchemaSuccessDetail, SchemaSuccessList } from "src/dto/response/schema.dto";
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
    @ApiOkResponse({ type: SchemaSuccessDetail })
    @ApiResponse({ status: 404,  type: SchemaNotFoundDetail })
    async GetUserProfile(@Param('username') username: string){
        return await this.service.GetUserProfile(username)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseList)
    @Get('')
    @ApiOkResponse({ type: SchemaSuccessList })
    @ApiResponse({ status: 204,  type: SchemaNotFoundList })
    async GetUserProfileList(@Query() query: FilterProfile, @Headers() headers:any){
        return await this.service.GetUserProfileList(query)
    }
    
    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseInput)
    @Post('register')
    async CreateUserProfile(@Body() body: CreateProfile, @Headers() headers:any){
        return await this.service.CreateUserProfile(body)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseInput)
    @Put('')
    async UpdateUserProfile(@Body() body:any, @Headers() headers:any){
        return await this.service.UpdateUserProfile(body)
    }   

    @UseGuards(HeaderGuard)
    @UseInterceptors(FileInterceptor('picture', { 
        storage: StorageImage,
        fileFilter: FilterImage,
        limits: { fileSize: 5 * 1024 * 1024 }}) ,ResponseInput)
    @Post('upload-photo')
    async UploadPhoto(@UploadedFile() picture: any){
        return picture
    }

    @Get("/photo/:name")
    async RetrievePhoto(@Res() res: Response, @Param('name') param){
        const path = await this.service.RetrievePhoto(param)
        res.sendFile(path)
    }

}
