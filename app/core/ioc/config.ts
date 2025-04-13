import 'reflect-metadata'
import UserService from "@/app/service/UserService";
import UserRepository from "@/app/repository/UserRepository";

import { container } from "tsyringe";
import User, { IUser } from "@/app/model/User";
import { Model } from 'mongoose';

class ModelInjector<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    getModel() {
        return this.model;
    }
}

const depContainer = container
// work around to get non class values essentially
depContainer.registerInstance('UserModel', new ModelInjector(User).getModel());
depContainer.register<UserRepository>('UserRepository', { useClass: UserRepository });
depContainer.register<UserService>('UserService', { useClass: UserService });


export default depContainer