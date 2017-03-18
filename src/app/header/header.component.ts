import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    domElements = [{'menuSelect': null}]

    constructor() { 
    }

    ngOnInit() {
        var elm = this.domElements[0];
        elm.menuSelect = document.querySelector('header select');
        elm.menuSelect.onchange = function() {
            window.location.href = elm.menuSelect.options[elm.menuSelect.selectedIndex].value;
        };
    }

}
