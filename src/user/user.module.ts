import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { StatsModule } from 'stats/stats.module';
import { VotesModule } from 'votes/votes.module';
import { CollectionsModule } from 'collections/collections.module';
import { StorageModule } from 'storage/storage.module';
import { DiscordModule } from 'discord/discord.module';
import { TwitterModule } from 'twitter/twitter.module';
import { info } from 'console';
import { generate } from 'rxjs';
import { auth } from 'constants';

@Module({
  providers: [UserService, AuthService],
  imports: [StatsModule, VotesModule, CollectionsModule, StorageModule, DiscordModule, TwitterModule],
  controllers: [UserController]
})
export class UserModule {}
