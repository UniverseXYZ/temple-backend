import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CounterService } from 'counters/counter.service';

@Module({
  providers: [ProfileService, CounterService],
  exports: [ProfileService]
})
export class ProfileModule { }
