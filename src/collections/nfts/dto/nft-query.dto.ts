import { ChainId } from '@johnkcr/temple-lib/dist/types/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEthereumAddress, IsString } from 'class-validator';
import { IsSupportedChainId } from 'common/decorators/is-supported-chain-id.decorator';
import { normalizeAddressTransformer } from 'common/transformers/normalize-address.transformer';

export class NftQueryDto {
  @ApiPropertyOptional({
    description: 'Collection Address'
  })
  @IsEthereumAddress({
    message: 'Invalid address'
  })
  @Transform(normalizeAddressTransformer)
  readonly address!: string;

  @ApiProperty({
    description: 'Collection chain id',
    enum: ChainId
  })
  @IsSupportedChainId({
    message: 'Invalid chainId'
  })
  readonly chainId!: ChainId;

  @ApiProperty({
    description: 'Token id of the nft to get'
  })
  @IsString()
  tokenId!: string;
}
