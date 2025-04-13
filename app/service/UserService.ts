import { BaseService } from "@/app/core/abstract/BaseService";
import UserRepository from "../repository/UserRepository";
import { IUser } from "../model/User";
import { AccessToken } from "../dto/auth/AccessTokenDto";
import axios from "axios";
import { inject, injectable } from "tsyringe";

export interface IGoogleUserInfo {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
}
@injectable()
export default class UserService extends BaseService<IUser> {
    userRepository: UserRepository;
    constructor(@inject('UserRepository') userRepository: UserRepository) {
        super(userRepository);
        this.userRepository = userRepository;

    }
    async createUserGivenAccessToken(accessTokenDto: AccessToken): Promise<IUser> {
        const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessTokenDto.access_token}`,
            },
        });
        const googleUser: IGoogleUserInfo = googleResponse.data;
        const checkUser = await this.userRepository.findOne({ email: googleUser.email });
        if (checkUser) {
            return checkUser;
        }
        // If user does not exist, create a new user
        const user = await this.userRepository.create(
            {
                name: googleUser.name,
                email: googleUser.email,
                password: googleUser.id,
                avatar: googleUser.picture,
            }
        )
        return user
    }
}