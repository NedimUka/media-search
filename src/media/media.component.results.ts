import { Component } from '@angular/core';
import { Media } from './media';
import { ResultsService } from './media.service.results';

@Component({
    templateUrl: './media.template.results.html'
})
export class ResultsComponent {
    public results: Media[];
    constructor(private resultsService: ResultsService) { }

    ngOnInit(): void {
        this.results = this.resultsService.getResults();
    }
}
