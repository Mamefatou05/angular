import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[] };
  withCredentials?: boolean;
}
