import { Component, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { EditSettingsService } from '../../shared/services/edit-settings.service';
import { GenerateImageService } from '../../shared/services/generate-image.service';
import { ImageFilterService } from '../../shared/services/image-filter.service';
import jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-canvas-select',
  templateUrl: './canvas-select.component.html',
  styleUrls: ['./canvas-select.component.css']
})
export class CanvasSelectComponent implements AfterViewInit {

  @ViewChild('photoCanvas') canvasArtboard: ElementRef;
	@Input() canvasSettings: any;
	@Input() imageSettings: any;
	@Input() sizeSettings: any;
	@Input() textSettings: any;
	@Input() logoSettings: any;
	@Input() imageLayerSettings: any;

	private ctx: CanvasRenderingContext2D;

	constructor(private editSettingsService: EditSettingsService,
				private generateImageService: GenerateImageService,
				private imageFilterService: ImageFilterService ) {}

	ngAfterViewInit() {

		//canvas context
		this.ctx = this.canvasArtboard.nativeElement.getContext('2d');

		//subscribe
		this.editSettingsService.storeCanvas.subscribe(() => this.onUpdateCanvas());
		this.imageFilterService.store.subscribe(() => this.onUpdateFilter());
		this.generateImageService.store.subscribe(() => this.onGenerateDownloadableImage());
	}

	// load image into canvas
	onUpdateCanvas() {
		//new image
		let image = new Image();
		let sizeData = this.sizeSettings.sizes[this.sizeSettings.selectedSizeIndex];
    	let modelMatch = this.imageSettings.images.filter(x=>x.uniqueId == this.imageSettings.selectedImageUniqueId)
		image.src = this.editSettingsService.processImgUrl(modelMatch[0].url, sizeData.width, sizeData.height);
    	image.crossOrigin = "Anonymous";

		//clean canvas
		this.ctx.clearRect(0, 0, sizeData.width, sizeData.height);

		//provide imageFilterService with a new canvas
		this.imageFilterService.updateCanvasReference(this.canvasArtboard.nativeElement);

		//update canvas
		image.onload = () => this.ctx.drawImage(image, 0, 0,sizeData.width, sizeData.height);
	}

	onGenerateDownloadableImage() {
		let image = new Image();
        image.src = this.canvasArtboard.nativeElement.toDataURL("image/png");
        image.crossOrigin = "Anonymous";
        this.canvasSettings.downloadableImage = image;
        var data = document.getElementById('poster');  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 210;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
                   
          const contentDataURL = canvas.toDataURL('image/png')  
          var a = document.createElement("a");
          a.href= contentDataURL;
          a.download="poster.png"
          a.click();
          let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
          var position = 0;  
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
          pdf.save('Poster.pdf'); // Generated PDF   
        });
	}

	onUpdateFilter() {
		// console.log('update filter: likely use the imageFilterService canvas ref');
	}

	onClearOverlaysSelection() {
		this.editSettingsService.updateOverlays(true);
	}

}
