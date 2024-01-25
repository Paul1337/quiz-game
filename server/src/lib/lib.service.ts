import { Injectable } from '@nestjs/common';

@Injectable()
export class LibService {
    mixArray(arr: any[]) {
        for (let i = 0; i < arr.length; i++) {
            const swpInd = Math.floor(Math.random() * arr.length);
            const tmp = arr[i];
            arr[i] = arr[swpInd];
            arr[swpInd] = tmp;
        }
    }
}
