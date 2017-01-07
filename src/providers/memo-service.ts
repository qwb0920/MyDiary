import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class MemoService {
  memoList: FirebaseListObservable<any>;
  memoDetail: FirebaseObjectObservable<any>;
  userId: string;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.memoList = af.database.list(`/userProfile/${auth.uid}/memoList`);
        this.userId = auth.uid;
      }
    });
  }

  // Get the full list of memos
  getMemoList() {
    return this.memoList;
  }

  // Get a specific memo from the list
  getMemo(memoId: string) {
    return this.memoDetail = 
      this.af.database.object(`/userProfile/${this.userId}/memoList/${memoId}`);
  }

  // Create a new memo
  createMemo(title: string, detail: string[]) {
    return this.memoList.push({
      title: title,
      detail: detail
    });
  }

  // Update an existing memo
  updateMemo(memoId: string, title: string, detail: string[]) {
    return this.memoList.update(memoId, {
      title: title,
      detail: detail
    });
  }

  // Delete an existing memo
  deleteMemo(memoId: string) {
    return this.memoList.remove(memoId);
  }
}