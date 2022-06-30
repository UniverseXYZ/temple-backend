import { trimLowerCase } from '@johnkcr/temple-lib/dist/utils';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { auth } from '../../constants';
import { ethers } from 'ethers';
import { Reflector } from '@nestjs/core';
import { toLower } from 'lodash';
import { metadataKey } from 'common/decorators/match-signer.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const paramName = this.reflector.get<string>(metadataKey, context.getHandler());
    const messageHeader = request.headers?.[auth.message];
    const signatureHeader = request.headers?.[auth.signature];


    if (!messageHeader || !signatureHeader) {
      return false;
    }

    try {
      return true;
    } catch (err: any) {
      return false;
    }
  }
}
