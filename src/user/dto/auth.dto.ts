import { ChainId } from '@johnkcr/temple-lib/dist/types/core';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Auth Token'
  })
  token: string;

  @ApiProperty({
    description: 'User Id'
  })
  userId: string;
}
