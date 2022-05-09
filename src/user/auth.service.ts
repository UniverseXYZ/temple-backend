import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from 'firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  async generateNewAuth() {
    const newToken = uuidv4();
    console.log({ newToken });
  }
}
