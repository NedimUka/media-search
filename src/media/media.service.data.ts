import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Media } from './media';

@Injectable()
export class MediaService {
    private _mediaurl = 'media/media.json';
    constructor(private _http: Http) { }

    getMedia(): Observable<Media[]> {
        return this._http.get(this._mediaurl)
            .map((response: Response) => <Media[]>response.json());
    }

}
