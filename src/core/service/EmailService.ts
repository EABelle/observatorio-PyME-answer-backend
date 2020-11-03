import {User} from '../domain/User';

export class EmailService {

    static async sendInvitation(user: User): Promise<User> {
        // TODO: send invitation by email
        return user;
    }
}
