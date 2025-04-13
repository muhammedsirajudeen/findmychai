import { injectable, inject } from 'tsyringe';
import { Model } from 'mongoose';
import { BaseRepository } from '../core/abstract/BaseRepository';
import { IUser } from '../model/User';

@injectable()
export default class UserRepository extends BaseRepository<IUser> {
    constructor(
        @inject('UserModel') userModel: Model<IUser>
    ) {
        super(userModel);
    }
}
