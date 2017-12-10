import { Component } from '@angular/core';
import { Media } from './media';
import { MediaService } from './media.service.data';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ResultsService } from './media.service.results';

@Component({
  templateUrl: './media.template.main.html',
  providers: [MediaService]
})
export class MediaComponent {
  public media: Media[];
  public filteredItems: Media[];
  public selectedItems: Media[];

  public genres: string[];
  public countries: string[];
  public sortOrders: string[];
  public filterValue: string;
  public selectedGenre: string;
  public selectedCountry: string;
  public sortOrder: string;
  constructor(private _mediaService: MediaService, private _resultsService: ResultsService, private _router: Router) { }

  ngOnInit(): void {
    this.selectedItems = [];
    this.genres = ['Pop', 'Rock', 'Jazz'];
    this.countries = ['Germany', 'USA'];
    this.sortOrders = ['Newest', 'Oldest'];
    this._mediaService.getMedia()
      .subscribe(media => this.media = media);
    this.assignCopy();
  }
  mouseEnter(test: string) {
    console.log('mouse enter : ' + test);
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.media);
  }

  itemSelected(event: any, media: Media) {
    this.filteredItems[media.id].selected = true;
    this.selectedItems.push(this.media[media.id]);
  }

  onSelectGenre(selection: string) {
    this.selectedGenre = selection;
    this.filterItem(this.filterValue, true, !this.selectedCountry ? false : true, !this.sortOrder ? false : true);
  }

  onSelectCountry(selection: string) {
    this.selectedCountry = selection;
    this.filterItem(this.filterValue, !this.selectedCountry ? false : true, true, !this.sortOrder ? false : true);
  }

  onSelectSortOrder(selection: string) {
    this.sortOrder = selection;
    this.filterItem(this.filterValue, !this.selectedGenre ? false : true, true, !this.sortOrder ? false : true);
  }

  filterItem(value: string,
    filterByGenre: boolean,
    filterByCountry: boolean,
    sortByCreater: boolean) {

    if (!value) {
      this.assignCopy();
      this.filterValue = null;
    } else {
    this.filterValue = value;
      this.filteredItems = Object.assign([], this.media).filter(
        item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    }

    if (filterByGenre) {
      this.filteredItems = Object.assign([], this.filteredItems).filter(
        item => item.genre.toLowerCase().indexOf(this.selectedGenre.toLowerCase()) > -1
      );
    }

    if (filterByCountry) {
      this.filteredItems = Object.assign([], this.filteredItems).filter(
        item => item.country.toLowerCase().indexOf(this.selectedCountry.toLowerCase()) > -1
      );
    }
    this.filteredItems.sort(function(a, b){return a.created - b.created; });
  }

  publish() {
    this._resultsService.setResults(this.selectedItems);
    this._router.navigateByUrl('/results');
  }
}
