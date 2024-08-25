import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiKey='1f8ffd3131d2458caf415fc0c4962f62';

  topNewsUrl=' https://newsapi.org/v2/everything?q=apple&from=2024-08-22&to=2024-08-22&sortBy=popularity&apiKey=1f8ffd3131d2458caf415fc0c4962f62';

  constructor(private http: HttpClient) { }
 
  getTopHeadlines(): Observable<any> {
    return this.http.get<any>(this.topNewsUrl);
  }

 

 
}

  

