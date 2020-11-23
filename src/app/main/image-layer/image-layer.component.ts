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

	onVisibilityToggle() {
		this.imageLayerSettings.isGraphicHidden = !this.imageLayerSettings.isGraphicHidden;
		this.imageLayerSettingsChange.emit(this.imageLayerSettings);
	}
	onRemove() {
		this.imageLayerSettings.selectedFile = null;
		this.imageLayerSettings.isGraphicHidden = false;
		this.imageLayerSettingsChange.emit(this.imageLayerSettings);
	}
	onSelectFileChange($event) {		
		//cancel check
		let files = $event.srcElement.files;
		if(files.length > 0) {
			debugger;
			//base64 encode file (TODO extract to a service)
			let reader = new FileReader();
			reader.onload = (e) => {
				let url = (<FileReader>e.target).result;
				let file = { url: url, name: 'Uploaded Image' };
				debugger;

				let img= new Image();
				//img.src = url;
				img.onload = (e: any) => {
					this.imageLayerSettings.height =e.path[0].height;
					this.imageLayerSettings.width = e.path[0].width;
				}
				this.imageLayerSettings.selectedFile = file;
				this.imageLayerSettingsChange.emit(this.imageLayerSettings);
			};
			reader.readAsDataURL($event.srcElement.files[0]);
		}
	}
}
