import { TempleTweet } from '@johnkcr/temple-lib/dist/types/services/twitter';
import { ApiProperty } from '@nestjs/swagger';
import { TwitterAccountDto } from './twitter-account.dto';

export class TweetDto implements TempleTweet {
  @ApiProperty({
    description: 'Author of the tweet'
  })
  author!: TwitterAccountDto;

  @ApiProperty({
    description: 'Epoch timestamp (ms) of when the tweet was created'
  })
  createdAt!: number;

  @ApiProperty({
    description: 'Unique identifier of the tweet'
  })
  tweetId!: string;

  @ApiProperty({
    description: 'Content of the tweet'
  })
  text!: string;

  @ApiProperty({
    description: 'Link to the tweet'
  })
  url!: string;
}
