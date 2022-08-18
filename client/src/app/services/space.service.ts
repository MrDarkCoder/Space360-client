import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../models/pagination/pagination';
import { SpaceParams } from '../models/pagination/spaceParams';
import { Space } from '../models/space/space';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  baseUrl = environment.apiUrl;

  // spaces: Space[];

  constructor(private http: HttpClient) {}

  getSpaces(spaceParams: SpaceParams) {
    let params = this.getPaginationHeaders(
      spaceParams.pageNumber,
      spaceParams.pageSize
    );

    const url = this.baseUrl + 'space';
    return this.getPaginatedResult<Space[]>(url, params);
  }

  getAllSpaces() {
    return this.http.get(this.baseUrl + 'space/all').pipe(
      map((response) => {
        return response;
      })
    );
  }

  createSpace(space: any) {
    return this.http.post(this.baseUrl + 'space', space).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getSpaceCategory() {
    return this.http.get(this.baseUrl + 'spaceCategory').pipe(
      map((response) => {
        return response;
      })
    );
  }

  getSpaceByCategory(id: number) {
    return this.http.get(this.baseUrl + 'space/category/form/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  createSpaceCategory(spaceCategory: any) {
    return this.http.post(this.baseUrl + 'spaceCategory', spaceCategory).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getReservedTimings(spaceId: number, spaceName: string) {
    let params = new HttpParams();
    params = params.append('spaceId', spaceId);
    params = params.append('spaceName', spaceName);

    return this.http
      .get(this.baseUrl + 'reservation/reserved-timings', {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResults: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http
      .get<T>(url, {
        observe: 'response',
        params: params,
      })
      .pipe(
        map((response) => {
          paginatedResults.results = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResults.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResults;
        })
      );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }
}
