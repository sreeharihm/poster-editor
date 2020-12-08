import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, QueryList, ViewChildren } from '@angular/core';

declare var _: any;

import { SelectableDirective } from '../../shared/directives/selectable.directive';

@Component({
  selector: 'app-text-select',
  templateUrl: './text-select.component.html',
  styleUrls: ['./text-select.component.css']
})
export class TextSelectComponent implements AfterViewInit {

	@Input() textSettings: any;
	@Input() settings: any;
	@Output() textSettingsChange: EventEmitter<any> = new EventEmitter();
	@ViewChildren(SelectableDirective) selectables: QueryList<SelectableDirective>;

	selectableHeader: SelectableDirective;
	selectableBody: SelectableDirective;
	selectableCaption: SelectableDirective;
	
	constructor(private changeDetectionRef: ChangeDetectorRef) { }

	ngAfterViewInit() {
		//recheck as this.canAddQuotes was checked prior to ngAfterViewInit being called
		this.changeDetectionRef.detectChanges();
	}

	onIsSelectedChange($event,index) {
		//update
		this.settings.images[this.settings.selectedImageUniqueId].models[index].isSelected = !this.settings.images[this.settings.selectedImageUniqueId].models[index].isSelected;
		//emit change
		this.textSettingsChange.emit(this.settings);
	}

	clamp(number, lower, upper) {
		if (upper === undefined) {
		upper = lower;
		lower = undefined;
		}
		if (upper !== undefined) {
		upper = parseFloat(upper);
		upper = upper === upper ? upper : 0;
		}
		if (lower !== undefined) {
		lower = parseFloat(lower);
		lower = lower === lower ? lower : 0;
		}
		return this.baseClamp(parseFloat(number), lower, upper);
	}
  
	baseClamp(number, lower, upper) {
		if (number === number) {
		if (upper !== undefined) {
			number = number <= upper ? number : upper;
		}
		if (lower !== undefined) {
			number = number >= lower ? number : lower;
		}
		}
		return number;
	}

}

