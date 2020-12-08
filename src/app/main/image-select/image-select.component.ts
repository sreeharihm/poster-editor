import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditSettingsService } from '../../shared/services/edit-settings.service';
import { SelectableDirective } from '../../shared/directives/selectable.directive';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.css']
})
export class ImageSelectComponent {

  @Input() imageSettings: any;
	@Output() imageSettingsChange: EventEmitter<any> = new EventEmitter();

	constructor(private editSettingsService: EditSettingsService) { }

	onIsSelectedChange($uniqueId) {

		//update settings
		
		this.imageSettings.images[this.imageSettings.selectedImageUniqueId].models.forEach(e => {
			e.isSelected=false
		});
		this.imageSettings.images[this.imageSettings.selectedImageUniqueId].layers.forEach(e => {
			e.selectedFile =null,
			e.isGraphicHidden =false
		});
		
		this.imageSettings.selectedImageUniqueId = $uniqueId;
		this.imageSettings.selectedModelUniqueId =-1;

		//emit change
		this.imageSettingsChange.emit(this.imageSettings);
	}

	processImgUrl(url) {
		return this.editSettingsService.processImgUrl(url, 200, 100);
	}

	onSelectFileChange($event) {

		//cancel check
		let files = $event.srcElement.files;
		if (files.length > 0) {

			//base64 encode file (TODO extract to a service)
			let reader = new FileReader();
			reader.onload = (e) => {
				let url = (<FileReader>e.target).result;
				let uniqueId = this.imageSettings.images.length

				//add
				this.imageSettings.images.push({ url: url, name: 'Uploaded Image at ' + Date.now(), uniqueId: uniqueId });

				//update required to trigger change detection
				this.imageSettings.images = this.imageSettings.images.slice();

				//default to newly uploaded image
				this.imageSettings.selectedImageUniqueId = uniqueId;

				//notify
				this.imageSettingsChange.emit(this.imageSettings);
			};
			reader.readAsDataURL($event.srcElement.files[0]);
			
		}
	}

	onKeyUp($event) {
		this.imageSettings.filterQuery = $event.target.value;
	}
}
