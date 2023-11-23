import { Controller, Get, Post, Query, UseInterceptors, UseGuards, Headers, Body, UploadedFile, Param, Delete, HttpException, HttpStatus, Put, Res } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express'
import type { Response } from 'express';
import { ApiResponse } from "@nestjs/swagger";

import { HeaderGuard } from "../../utils/middleware/guard/header.guard";
import { CreateProfile, FilterProfile } from "../../dto/request/user.dto";
import { FilterImage, StorageImage } from "../../utils/helpers/file-upload.helper";

import { ResponseList, ResponseInput } from "../../utils/middleware/interceptor/response/success";

import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService
    ){}
    
    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseList)
    @Get('')
    // @ApiResponse({ status: 200, description: "result success"})
    async GetUserProfile(@Query() query: FilterProfile, @Headers() headers:any){
        return await this.service.GetUserProfile(query)
    }
    
    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseInput)
    @Post('')
    async CreateUserProfile(@Body() body: CreateProfile, @Headers() headers:any){
        return await this.service.CreateUserProfile(body)
    }

    @UseGuards(HeaderGuard)
    @UseInterceptors(ResponseInput)
    @Put('')
    async UpdateUserProfile(@Body() body:any, @Headers() headers:any){

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
