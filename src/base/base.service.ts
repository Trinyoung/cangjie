/*
 * @Author: your name
 * @Date: 2021-03-05 16:20:36
 * @LastEditTime: 2021-03-05 16:40:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\base\base.service.ts
 */

import { populateInterface } from './base.interface';
import { Model, UpdateQuery, FilterQuery, ModelUpdateOptions, QueryOptions } from 'mongoose';
import * as moment from 'moment';
import {BaseDocument} from './base.model'
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// @Injectable()
export class BaseService<T extends BaseDocument> {
    constructor(public model: Model<T>) {

    }
    public async createItem(body: T): Promise<T> {
        body.createdAt = moment().unix();
        const item = new this.model(body);
        return item.save();
    }

    public async updateItem(condition: UpdateQuery<T>, query: FilterQuery<T>, options?: ModelUpdateOptions) {
        condition = this._fullItem(condition);
        query = this._fullQuery(query);
        await this.model.updateOne(query, condition, options);
    };

    public async findOneAndUpdateItem(query: FilterQuery<T>, condition: UpdateQuery<T>, options?: QueryOptions): Promise<T> {
        condition = this._fullItem(condition);
        query = this._fullQuery(query);
        const result = await this.model.findOneAndUpdate(query, condition, options);
        return result;
    }


    public async getList(query: FilterQuery<T>, lean = false, projection?: string, populate?: string | populateInterface | [string] | populateInterface[]): Promise<T[]> {
        query = this._fullQuery(query);
        const result = this.model.find(query, projection).populate(populate);
        if (lean) {
            return await result.lean(true);
        }
        return await result;
    }

    public async getItem(query?: FilterQuery<T>, projection?: string, lean = true, populate?: string | populateInterface | [string] | populateInterface[]) {
        query = this._fullQuery(query);
        const result = await this.model.findOne(query, projection).populate(populate).lean(lean);
        return result;
    }

    public returnError(code: string, message?: string) {
        return {
            code,
            message
        };
    }

    public async updateItemWithoutUid(query: FilterQuery<T>, condition: UpdateQuery<T>, options?: ModelUpdateOptions): Promise<T> {
        const result = await this.model.findOneAndUpdate(query, condition, options);
        return result;
    }

    private _fullItem(body: UpdateQuery<T> = {}) {
        return Object.assign({
            updatedAt: moment().unix()
        }, body);
    }

    _fullQuery(query: FilterQuery<T>) {
        return Object.assign({
            is_deleted: 0
        }, query);
    }
}