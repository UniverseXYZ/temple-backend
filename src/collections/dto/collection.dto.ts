import { ChainId, Collection, CollectionAttributes, TokenStandard } from '@johnkcr/temple-lib/dist/types/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { CollectionMetaDataDto, PartialCollectionMetadataDto } from './collection-metadata.dto';
import { CollectionStateDto } from './collection-state.dto';

type CollectionType = Omit<Collection, 'tokenStandard'> & { tokenStandard: TokenStandard };

export class CollectionDto implements CollectionType {
  @ApiProperty({
    description: 'Collection token standard',
    enum: TokenStandard
  })
  tokenStandard!: TokenStandard;

  @ApiProperty({
    description: 'Collection chain id',
    enum: ChainId
  })
  chainId!: string;

  @ApiProperty({
    description: 'Collection address'
  })
  address!: string;

  @ApiProperty({
    description: 'Indicates whether the collection is verified'
  })
  hasBlueCheck!: boolean;

  @ApiProperty({
    description: 'Address that deployed the contract'
  })
  deployer!: string;

  @ApiProperty({
    description: 'Epoch timestamp (ms) that the contract was deployed at'
  })
  deployedAt!: number;

  @ApiProperty({
    description: 'Block that the contract was deployed at'
  })
  deployedAtBlock!: number;

  @ApiProperty({
    description: 'Owner of the contract'
  })
  owner!: string;

  @ApiProperty({
    description: 'Number of owners of nfts in the collection'
  })
  numOwners?: number;

  @ApiProperty({
    description: 'Epoch  timestamp (ms) that numOwners was updated at'
  })
  numOwnersUpdatedAt!: number;

  @ApiProperty({
    description: 'Metadata about the collection'
  })
  @IsObject()
  @ValidateNested()
  @Type(() => CollectionMetaDataDto)
  metadata!: CollectionMetaDataDto;

  @ApiProperty({
    description: 'Slug of the collection'
  })
  slug!: string;

  @ApiProperty({
    description: 'Total supply'
  })
  numNfts!: number;

  @ApiProperty({
    description: 'Attributes (i.e. traits) for the collection'
  })
  attributes!: CollectionAttributes;

  @ApiProperty({
    description: 'Total number of trait types'
  })
  numTraitTypes!: number;

  @ApiProperty({
    description: 'Address of the user that initiated indexing'
  })
  indexInitiator!: string;

  @ApiProperty({
    description: 'Current state of the collection indexing process'
  })
  @ValidateNested()
  @Type(() => CollectionStateDto)
  state!: CollectionStateDto;
}

export class UpdateCollectionDto {
  @ApiPropertyOptional({
    description: 'Whether to remove the current profile image'
  })
  deleteProfileImage?: boolean;

  @ApiPropertyOptional({
    name: 'profileImage',
    description: 'Profile picture',
    required: false,
    type: 'file'
  })
  profileImage?: string;

  @ApiPropertyOptional({
    description: 'Metadata about the collection'
  })
  @ValidateNested()
  @Type(() => CollectionMetaDataDto)
  metadata?: PartialCollectionMetadataDto;
}
