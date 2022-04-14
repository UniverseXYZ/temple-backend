import { ChainId } from '@johnkcr/temple-lib/dist/types/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsEthereumAddress, IsNumber, IsOptional, IsString } from 'class-validator';
import { ActivityType } from '../nft-activity.types';

export class NftActivity {
  @ApiProperty({
    description: 'Collection address'
  })
  address!: string;

  @ApiProperty({
    description: 'Token id of the nft'
  })
  tokenId!: string;

  @ApiProperty({
    description: 'Chain id for the collection'
  })
  chainId!: ChainId;

  @ApiProperty({
    description: 'Activity type',
    enum: ActivityType
  })
  @IsEnum(ActivityType)
  type!: ActivityType;

  @ApiProperty({
    description: 'Seller address'
  })
  @IsEthereumAddress()
  from!: string;

  @ApiPropertyOptional({
    description: 'Seller display name'
  })
  @IsOptional()
  fromDisplayName?: string;

  @ApiPropertyOptional({
    description: 'Buyer address'
  })
  @IsEthereumAddress()
  @IsOptional()
  to?: string;

  @ApiPropertyOptional({
    description: 'Buyer display name'
  })
  @IsString()
  @IsOptional()
  toDisplayName?: string;

  @ApiPropertyOptional({
    description: 'Sale amount'
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Sale token'
  })
  paymentToken!: string;

  @ApiPropertyOptional({
    description: 'Link to the nft'
  })
  @IsString()
  @IsOptional()
  internalUrl?: string;

  @ApiPropertyOptional({
    description: 'Link to transaction on etherscan'
  })
  @IsString()
  @IsOptional()
  externalUrl?: string;

  @ApiProperty({
    description: 'Epoch timestamp (ms) of the activity'
  })
  @IsNumber()
  timestamp!: number;
}
