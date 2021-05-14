import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IReportCategry } from '../model/ReportCategory.model';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    API = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    getReportCategories(){
        return this.http.get<IReportCategry[]>(`${this.API}/reportcategories`)
        .pipe(take(1));
    }
}
