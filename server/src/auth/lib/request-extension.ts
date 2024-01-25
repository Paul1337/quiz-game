import { Request } from 'express';
import { Role } from '../role.enum';

export interface UserPayloadScheme {
    username: string;
    email: string;
    id: string;
    roles: Role[];
}

export interface RequestExtended extends Request {
    user?: UserPayloadScheme;
}
