import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EditSettingsService } from '../../shared/services/edit-settings.service';
import { MoveClampedToParentDirective } from '../../shared/directives/move-clamped-to-parent.directive';

@Component({
  selector: 'app-overlay-image-layer',
  templateUrl: './overlay-image-layer.component.html',
  styleUrls: ['./overlay-image-layer.component.css']
})
export class OverlayImageLayerComponent implements OnInit {

  @ViewChild(MoveClampedToParentDirective) layer: MoveClampedToParentDirective;

	@Input() sizeSettings: any;
	@Input() imageLayerSettings: any;

	private isSelected: boolean = false;

	constructor(private editSettingsService: EditSettingsService) { }

	ngOnInit() {

		//subscribe
		this.editSettingsService.storeOverlays.subscribe((isClear) => this.onUpdateOverlays(isClear));
	}

	onUpdateOverlays(isClear: boolean) {

		//update
		if(this.layer) {
			this.layer.update();
		}

		//clear currently selected controls
		if (isClear) {
			this.isSelected = false;
		}
	}

	onSelect() {

		//only one selected overlay at a time
		this.editSettingsService.updateOverlays(true);

		//update
		this.isSelected = true;
	}

}
