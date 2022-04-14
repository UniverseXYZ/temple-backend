/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCode } from '@johnkcr/temple-lib/dist/types/core';
import { error, log } from '@johnkcr/temple-lib/dist/utils';
import { NextFunction, Request, Response } from 'express';
import { getRequestLogPrefix } from './logger';

/**
 * Express middleware error handler
 *
 * must have all 4 argements listed so express can
 * identify it as an error handler
 *
 */
export function requestErrorHandler(err: Error, req: Request, res: Response, _: NextFunction) {
  const prefix = getRequestLogPrefix(req);
  const status = StatusCode.InternalServerError;
  log(`${prefix} Status Code: ${status}`);
  error(err);
  res.sendStatus(status);
}
