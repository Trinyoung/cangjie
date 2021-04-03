/*
 * @Author: your name
 * @Date: 2021-03-05 16:20:29
 * @LastEditTime: 2021-03-05 16:20:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\base\base.controller.ts
 */
import { Controller, Get, Post, Body } from '@nestjs/common';
// import { BaseInterface } from './base.interface';
import {BaseDocument} from './base.model'
import { BaseService } from './base.service';
export class BaseController<T extends BaseService<BaseDocument>> {
    constructor(public service: T) {

    }

    async create() {

    }
    // @postMessage()
}