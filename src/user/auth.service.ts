import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  async generateNewAuth() {}
}
