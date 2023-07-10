import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class CommonService {
    constructor(private dataSource: DataSource){}
    
    initTransaction(){
        return this.dataSource.createQueryRunner();
    }
    startTransaction(queryRunner : QueryRunner){
         queryRunner.connect();
         return queryRunner.startTransaction();
    }
    commitTransaction(queryRunner : QueryRunner){
        return queryRunner.commitTransaction();
   }
   rollbackTransaction(queryRunner : QueryRunner){
    return queryRunner.rollbackTransaction();
}

  
}
