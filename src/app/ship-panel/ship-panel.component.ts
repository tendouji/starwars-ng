import { Component, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
	selector: 'app-ship-panel',
	templateUrl: './ship-panel.component.html',
	styleUrls: ['./ship-panel.component.css']
})

export class ShipPanelComponent implements OnInit {
    @Input() constants: AppComponent;

    public domElements = [{
        'messagePanelHolder' : null,
        'messagePanel' : null,
        'spaceshipList': null, 
        'editLinks'    : null, 
        'submitButtons': null, 
        'cancelButtons': null
    }]
    public shipList
    public shipsInfo

    listenFunc: Function

	constructor(elementRef: ElementRef, renderer: Renderer) { 
        var elm = this.domElements[0],
            _this = this;

		this.listenFunc = renderer.listen(elementRef.nativeElement, 'click', function(e) {
			var _target = e.target,
				_class = _target.getAttribute('class');
			switch( _class ) {
				case 'edit-link':
	                e.preventDefault();
	                var id = (_target.getAttribute('id')).replace('editLink', ''),
	                    shipPanel = document.getElementById('ship' + id),
	                    previewPanel = <HTMLElement>shipPanel.querySelector('.preview-panel'),
	                    editPanel = <HTMLElement>shipPanel.querySelector('.edit-panel'),
	                    editLink = <HTMLElement>shipPanel.querySelector('.edit-link');
	                previewPanel.style.display = 'none';
	                editPanel.style.display = 'block';
	                editLink.style.display = 'none';
					break;
				case 'button':
	                e.preventDefault();
	                if( _target.getAttribute('value') == 'Cancel' ) {
		                var id = (_target.getAttribute('id')).replace('cancelButton', ''),
		                    shipPanel = document.getElementById('ship' + id),
		                    previewPanel = <HTMLElement>shipPanel.querySelector('.preview-panel'),
		                    editPanel = <HTMLElement>shipPanel.querySelector('.edit-panel'),
		                    editLink = <HTMLElement>shipPanel.querySelector('.edit-link');
		                previewPanel.style.display = 'block';
		                editPanel.style.display = 'none';
		                editLink.style.display = 'block';
	                } 
	                if( _target.getAttribute('value') == 'Submit' ) {
		                var id = (_target.getAttribute('id')).replace('submitButton', ''),
		                    shipPanel = document.getElementById('ship' + id),
		                    previewPanel = <HTMLElement>shipPanel.querySelector('.preview-panel'),
		                    editPanel = <HTMLElement>shipPanel.querySelector('.edit-panel'),
		                    editLink = <HTMLElement>shipPanel.querySelector('.edit-link'),
		                    crewValue = (<HTMLInputElement>shipPanel.querySelector('.input')).value;

	                    if(crewValue == '') {
	                        alert('Please enter a value');
	                    } else {
				            previewPanel.style.display = 'block';
				            editPanel.style.display = 'none';
				            editLink.style.display = 'block';

	                        _this.shipsInfo[id].crew = parseInt(crewValue, 10);
	                        _this.shipsInfo.sort(_this.sortArray);
	                        _this.generatePanels();
	                    }
	                } 
	                break;
			}
		});
	}

	ngOnInit() {
		var elm = this.domElements[0];
        elm.messagePanel = document.getElementById('messagePanel');
        elm.messagePanelHolder = document.getElementById('messagePanelHolder');
        elm.spaceshipList = document.getElementById('spaceshipList');
	}

	ngOnDestroy() {
		this.listenFunc();
	}	

	showMessage(msg) {
		var elm = this.domElements[0];
        elm.messagePanel = document.getElementById('messagePanel');
        elm.messagePanel.innerHTML = msg;
	}

	generatePanels() {
		var elm = this.domElements[0];
        elm.messagePanelHolder.style.display = 'none';
		
		elm.spaceshipList.style.display = 'none';
		this.shipList = this.constants[0].shipList;
		this.shipsInfo = this.constants[0].shipsInfo;

        this.fadeIn(elm.spaceshipList, null);
	}

	createRange(number) {
		var targetNum = (parseInt(number, 10) > 10 ? 10 : parseInt(number, 10));
		var items: number[] = [];
		for(var i = 1; i <= targetNum; i++) {
			items.push(i);
		}
		return items;
	}

	toInt(number) {
		return parseInt(number, 10);
	}

    fadeIn(elm, display) {
        elm.style.opacity = 0;
        elm.style.display = display || "block";

        (function fade() {
            var val = parseFloat(elm.style.opacity);
            if (!((val += .1) > 1)) {
                elm.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }

    sortArray(a, b) {
        return (a.crew < b.crew) ? 1 : ((b.crew < a.crew) ? -1 : 0);
    }

}
