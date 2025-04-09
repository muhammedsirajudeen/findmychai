import CustomError from "@/app/utils/CustomError"
export interface IAccessToken {
    access_token: string
}

export class AccessToken {
    access_token: string
    constructor(data: IAccessToken) {
        if (!data.access_token) {
            throw new CustomError(400, "Access token is required")
        }
        this.access_token = data.access_token
    }

}

