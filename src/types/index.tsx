import {JWT} from 'next-auth/jwt';
import {User} from 'next-auth';

export enum TokenError {
  RefreshAccessTokenError = 'RefreshAccessTokenError'
}

export interface ExtendedToken extends JWT {
  accessToken: string,
  refreshToken: string,
  accessTokenExpiresAt: number,
  user: User,
  error?: TokenError
}