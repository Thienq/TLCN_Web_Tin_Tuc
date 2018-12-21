import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../_entity/item';
import { Cat } from 'src/app/_entity/cat';

@Injectable({
  providedIn: 'root'
})
export class ModServiceService {
  context = environment.base_mod_url
  constructor(private http: HttpClient) { }

  createItem(item: Item): Observable<any>{
    return this.http.post(`${this.context}/api/v1/mod/items/create`, item);
  }

  getListItem() : Observable<any>{
    return this.http.get(`${this.context}/api/v1/mod/items`);
  }

  findItemById(id) : Observable<any>{
    return this.http.get(`${this.context}/api/v1/mod/items/search?id=${id}`);
  }

  createCat(cat : Cat): Observable<any>{    
    return this.http.post(`${this.context}/api/v1/mod/cat/createcat`, cat);
  }

  updateCat(cat : Cat): Observable<any>{    
    return this.http.post(`${this.context}/api/v1/mod//cat/update`, cat);
  }

  getAllCat() :Observable<any>{
    return this.http.get(`${this.context}/api/v1/mod/cat`);
  }

  updateStatusCat(id, userUpdate): Observable<any>{    
    return this.http.put(`${this.context}/api/v1/mod/cat/updatestatus/${id}/${userUpdate}`,"");
  }
}
