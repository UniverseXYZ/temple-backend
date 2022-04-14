import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiSignatureAuth } from 'api-signature.decorator';
import { MatchSigner } from 'common/decorators/match-signer.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
