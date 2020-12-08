import { Component , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-image-layer',
  templateUrl: './image-layer.component.html',
  styleUrls: ['./image-layer.component.css']
})
export class ImageLayerComponent {

  constructor() { }

  ngOnInit(): void {
  }
  	@Input() imageLayerSettings: any;
	@Output() imageLayerSettingsChange: EventEmitter<any> = new EventEmitter();
	@Input() settings: any;

	onVisibilityToggle(index) {
		
		this.settings.images[this.settings.selectedImageUniqueId].layers[index].isGraphicHidden = !this.settings.images[this.settings.selectedImageUniqueId].layers[index].isGraphicHidden ;
		this.imageLayerSettings.isGraphicHidden = !this.imageLayerSettings.isGraphicHidden;
		this.imageLayerSettingsChange.emit(this.imageLayerSettings);
	}
	onRemove(index) {
		this.imageLayerSettings.selectedFile = null;
		this.imageLayerSettings.isGraphicHidden = false;
		
		this.settings.images[this.settings.selectedImageUniqueId].layers[index].isGraphicHidden = false;		
		this.settings.images[this.settings.selectedImageUniqueId].layers[index].selectedFile = null;
		this.imageLayerSettingsChange.emit(this.imageLayerSettings);
	}
	onSelectFileChange($event, index) {		
		//cancel check
		let files = $event.srcElement.files;
		if(files.length > 0) {
			//base64 encode file (TODO extract to a service)
			let reader = new FileReader();
			reader.onload = (e) => {
				let url = (<FileReader>e.target).result;
				let file = { url: url, name: 'Uploaded Image' };
				const img= new Image();
				img.src = e.target.result as string;
				img.onload = (e: any) => {
					this.imageLayerSettings.height =e.path[0].height;
					this.imageLayerSettings.width = e.path[0].width;					
					this.settings.images[this.settings.selectedImageUniqueId].layers[index].height =e.path[0].height;
					this.settings.images[this.settings.selectedImageUniqueId].layers[index].height =e.path[0].height;
				}
				this.imageLayerSettings.selectedFile = file;
				this.settings.images[this.settings.selectedImageUniqueId].layers[index].selectedFile = file;
				this.settings.selectedLayerUniqueId = index;
				this.imageLayerSettingsChange.emit(this.imageLayerSettings);
			};
			reader.readAsDataURL($event.srcElement.files[0]);
		}
	}
}
