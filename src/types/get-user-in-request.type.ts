import { Request } from 'express';

interface UserInRequest {
  sub: string;
  username: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: UserInRequest;
}
