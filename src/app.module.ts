import { StorageModule } from './storage/storage.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { StatsModule } from './stats/stats.module';
import { join } from 'path';
import { TwitterModule } from './twitter/twitter.module';
import { DiscordModule } from './discord/discord.module';
import { UserModule } from './user/user.module';
import { CollectionsModule } from 'collections/collections.module';
import { VotesModule } from './votes/votes.module';

// TODO adi update this for prod
import * as serviceAccount from './creds/firebase-dev.json';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../.env'),
      isGlobal: true
    }),
    FirebaseModule.forRoot({
      cert: serviceAccount
    }),
    CollectionsModule,
    TwitterModule,
    DiscordModule,
    StatsModule,
    UserModule,
    VotesModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
