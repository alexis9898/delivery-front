import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, take, tap } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = `${environment.baseApiUrl}/api/comment`;
  comments$ = new BehaviorSubject<Comment[]>([]);
  constructor(private http: HttpClient,) { }

  getComments() {
    return this.http.get<Comment[]>(`${this.url}`).pipe(tap(comments => {
      this.comments$.next(comments)
    }))
  }
}
