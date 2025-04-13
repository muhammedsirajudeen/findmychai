import { BaseRepository } from './BaseRepository';
import { Document } from 'mongoose';

export class BaseService<T extends Document> {
    private repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }

    async create(data: Partial<T>): Promise<T> {
        return this.repository.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return this.repository.findById(id);
    }

    async findOne(filter: any): Promise<T | null> {
        return this.repository.findOne(filter);
    }

    async findAll(filter: any = {}): Promise<T[]> {
        return this.repository.findAll(filter);
    }

    async updateById(id: string, update: Partial<T>): Promise<T | null> {
        return this.repository.updateById(id, update);
    }

    async deleteById(id: string): Promise<T | null> {
        return this.repository.deleteById(id);
    }

    async count(filter: any = {}): Promise<number> {
        return this.repository.count(filter);
    }
}
