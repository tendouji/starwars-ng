import { Component, OnInit, ViewChild } from '@angular/core';
import { ShipPanelComponent } from './ship-panel/ship-panel.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    @ViewChild(ShipPanelComponent)
    private shipPanels:ShipPanelComponent;

    public domElements = [{
        'preloader'    : null
    }]

    public constants = [{
        'shipList'       : [5, 9, 10, 11, 15], 
        'swapiDomain'    : 'https://swapi.co/api/',
        'swapiUrl'       : 'starships/',
        'shipAttributes' : ['name', 'model', 'manufacturer', 'crew', 'edited'],
        'shipsInfo'      : [],
        'messageList'    : {
            'start'     : ['Getting content from ', '...'], 
            'noInternet': 'You seemed to be offline! Please check your Internet connection.'
        }
    }]

    constructor() { 
    }

    ngOnInit() {
        var elm = this.domElements[0],
            cons = this.constants[0];
        if(navigator.onLine) {
            elm.preloader = document.getElementById('preloader');
            
            this.shipPanels.showMessage( cons.messageList['start'][0] + cons.swapiDomain + cons.messageList['start'][1] );
            this.loadShipInfo(0);
        } else {
            this.shipPanels.showMessage( cons.messageList['noInternet'] );
            return;
        }
    }

    loadShipInfo(n) {
        var elm = this.domElements[0],
            cons = this.constants[0],
            _this = this;
        if(n < cons.shipList.length) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", cons.swapiDomain + cons.swapiUrl + cons.shipList[n] + '/', true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var dataObj = JSON.parse(this.responseText), 
                        tempObj = {};
                    for(var a in cons.shipAttributes) {
                        tempObj[cons.shipAttributes[a]] = cons.shipAttributes[a] == 'crew' ? parseInt(dataObj[cons.shipAttributes[a]], 10) : dataObj[cons.shipAttributes[a]];
                    }
                    cons.shipsInfo.push(tempObj);
                    _this.showPreloader( n+1, cons.shipList.length );
                    _this.loadShipInfo(n+1);
                }
            };
        } else {
            //loading complete
            cons.shipsInfo.sort(this.shipPanels.sortArray);
            this.shipPanels.generatePanels();
        }
    }

    showPreloader(curStep, totalSteps) {
        var elm = this.domElements[0],
            cons = this.constants[0],
            _this = this;
        var percent = Math.ceil( (curStep / totalSteps) * 100 ),
            percentText = percent + '%';
        elm.preloader.style.display = 'block';
        elm.preloader.style.width = percentText;
        elm.preloader.innerHTML = percentText;
        if(percent == 100) {
            setTimeout(function() {
                elm.preloader.style.display = 'none';
            }, 500);
        }
    }

}
