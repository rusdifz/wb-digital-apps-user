import { FileTypeValidator, HttpException, HttpStatus, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common'
import * as multer from 'multer'
import { existsSync, mkdirSync } from "fs"
import { v4 as uuidv4 } from 'uuid';

export const FilterImage = (req:any, file:any, cb:any) => {
    const whitelist = [ 'image/jpeg', 'image/png']
    console.log('whitelist before');
    
    if (!whitelist.includes(file.mimetype)) {
        return cb(new HttpException("file is not allowed", HttpStatus.BAD_REQUEST), null)
    }

    console.log('after whitelist');
    
    return cb(null, true)
}

export const StorageImage = multer.diskStorage({
    destination: (req: any, file: any, callback: any) => {
        const dirname = __dirname.toString()+'/image'
        
        if (!existsSync(dirname)) {
            console.log("Directory Image Not Exist.")
            mkdirSync(dirname);
            callback(null, dirname)
        } 

        console.log("Directory Image Exists.");
        
        callback(null, dirname)
    },
    filename: (req: any, file: any, callback: any) => {
        
        const extension = file.mimetype.replace("image/",'.')
        const filename = CreateFilename(extension)

        callback(null, filename)
    }
})

function CreateFilename(extension: string){
    
    const uniqcode = uuidv4() 
    const filename = uniqcode+'-wb-digital'+extension
    
    const dirname = __dirname.toString()+'/image/'+filename

    if(existsSync(dirname)){
        console.log('file exist', dirname);
        return CreateFilename(extension)
    }else{
        console.log('file not exist', dirname);    
        return filename
    }

}