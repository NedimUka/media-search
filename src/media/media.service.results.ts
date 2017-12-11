import { Injectable } from '@angular/core';
import { Media } from './media';

@Injectable()
export class ResultsService {

    public results: Media[];

    getResults() {
        return this.results;
    }

    setResults(results: Media[]) {
        this.results = results;
    }
}
