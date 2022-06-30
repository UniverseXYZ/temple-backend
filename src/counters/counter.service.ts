
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'firebase/firebase.service';

const DB_COLS = 'counters';

@Injectable()
export class CounterService {
    constructor(private firebaseService: FirebaseService) { }

    async getIncrement(tableName: string) {
        let result = 1;
        const counterRef = this.firebaseService.firestore.collection(DB_COLS).doc(tableName);
        const counterDoc = await counterRef.get();

        if (counterDoc.exists) {
            const data = counterDoc.data();
            if (data) {
                const { counterValue } = data;
                result = Number(counterValue) + 1;
                await counterRef.set({ counterValue: result });
            }
        } else {
            const counterValue = result;
            await counterRef.set({ counterValue });
        }

        return result;
    }

}
