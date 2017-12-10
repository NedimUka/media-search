import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'media-component',
    templateUrl: './media.template.app.html'
})
export class AppComponent {

    constructor(private _router: Router) { }
    ngOnInit(): void {
        this._router.navigateByUrl('/main');
    }
}
