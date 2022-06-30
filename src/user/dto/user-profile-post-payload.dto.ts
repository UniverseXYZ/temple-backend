import { PickType } from '@nestjs/swagger';
import { UserProfileDto } from './user-profile.dto';

export class UserProfilePostPayloadDto extends PickType(UserProfileDto, [
    'address',
    'displayName'
] as const) { }
