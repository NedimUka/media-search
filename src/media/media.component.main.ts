import { Component } from '@angular/core';
import { Media } from './media';
import { MediaService } from './media.service.data';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ResultsService } from './media.service.results';

@Component({
  templateUrl: './media.template.main.html',
  styleUrls: ['./media.style.main.css'],
  providers: [MediaService]
})
export class MediaComponent {
  public media: Media[];
  public filteredItems: Media[];
  public selectedItems: Media[];

  public genres: string[];
  public countries: string[];
  public filterValue: string;
  public selectedGenre: string;
  public selectedCountry: string;
  public sortOrder: boolean;
  public allSelected: boolean = false;
  constructor(private _mediaService: MediaService, private _resultsService: ResultsService, private _router: Router) { }

  ngOnInit(): void {
    this.selectedItems = [];
    this.genres = ['Pop', 'Rock', 'Jazz', 'Rap'];
    this.countries = ['Germany', 'USA', 'France'];
    this.sortOrder = true;
    this._mediaService.getMedia()
      .subscribe(media => {
      this.media = media;
        this.assignCopy();
      });
  }

  mouseEnter(test: string) {
    console.log('mouse enter : ' + test);
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.media);
  }

  onSelectGenre(selection: string) {
    this.selectedGenre = selection;
    this.filterItem(this.filterValue, true, !this.selectedCountry ? false : true, !this.sortOrder ? false : true);
  }

  onSelectCountry(selection: string) {
    this.selectedCountry = selection;
    this.filterItem(this.filterValue, !this.selectedGenre ? false : true, true, !this.sortOrder ? false : true);
  }

  onSelectSortOrder() {
    this.sortOrder = !this.sortOrder;
    this.filterItem(this.filterValue, !this.selectedGenre ? false : true, !this.selectedCountry ? false : true, this.sortOrder);
  }

  filterItem(value: string,
    filterByGenre: boolean,
    filterByCountry: boolean,
    sortByNewest: boolean) {

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
        item => item.genre === this.selectedGenre);
    }

    if (filterByCountry) {
      this.filteredItems = Object.assign([], this.filteredItems).filter(
        item => item.country === this.selectedCountry);
    }
    this.filteredItems.sort(function (a, b) {
      return sortByNewest ? b.created - a.created : a.created - b.created;
    });
  }

  itemSelected(event: any, media: Media) {
    this.filteredItems.find(item => item.id === media.id).selected = true;
    // this.selectedItems.push(this.media[media.id]);
  }

  selectAll() {
    this.allSelected = !this.allSelected;
    this.filteredItems.forEach(media => media.selected = this.allSelected);
  }

  publish() {
    this._resultsService.setResults(Object.assign([], this.filteredItems)
      .filter(media => media.selected));
    this._router.navigateByUrl('/results');
  }
}
