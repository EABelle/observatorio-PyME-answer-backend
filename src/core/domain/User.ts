export interface User {
    readonly _id: string;
    readonly name: string;
    readonly email: string;
    readonly avatar: string;
    readonly password: string;
    readonly roles: string[];
    readonly confirmed: boolean;
    readonly company: {
        _id: string;
        name: string;
    };
}
