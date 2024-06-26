import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobOfferRequestInterface } from '@app/core/interfaces/requests/job-offer-request.interface';
import { JobOffer } from '@app/core/models/job-offer';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  constructor(private _http: HttpClient) { }

  public readAll(page: number = 0, size: number = 8): Observable<JobOffer[]> {
    return this._http.get<JobOffer[]>(`${environment.API_URL}/joboffers?page=${page != 0 ? page - 1 : page}&size=${size}`);
  }

  public readOne(id: string): Observable<JobOffer> {
    return this._http.get<JobOffer>(`${environment.API_URL}/joboffers/${id}`);
  }

  public create(body: JobOfferRequestInterface): Observable<JobOffer> {
    return this._http.post<JobOffer>(`${environment.API_URL}/joboffers/create`, body);
  }
}
