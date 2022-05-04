import { ChainId } from '@johnkcr/temple-lib/dist/types/core';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'User Name',
    enum: ChainId
  })
  token: string;
}
