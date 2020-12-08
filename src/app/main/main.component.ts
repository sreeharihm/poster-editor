import { Component, Input, OnInit, Output } from '@angular/core';
import { EditSettingsService } from '../shared/services/edit-settings.service';
import { GenerateImageService } from '../shared/services/generate-image.service';
import { ImageFilterService } from '../shared/services/image-filter.service';
import { AuthService } from "../shared/services/auth.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Output() sizes: any;
	@Output() selectedSize: any;

	@Output() filters: any;
	@Output() selectedFilter: any;

  @Output() imageSettings: any;
  @Output() canvasSettings: any;
  @Output() sizeSettings: any;
  @Output() filterSettings: any;
  @Output() textSettings: any;
  @Output() logoSettings: any;
  @Output() imageLayerSettings: any;

  constructor(private editSettingsService: EditSettingsService, 
              private generateImageService: GenerateImageService,
              private imageFilterService: ImageFilterService,
              public authService: AuthService) { }

  ngOnInit() { 

    //images
    this.imageSettings = {
        selectedImageUniqueId: 0,         
        selectedModelUniqueId: -1,
        selectedLayerUniqueId: -1,
        images: [{
                url: "../assets/img/birthdayTwo.png",
                name: "Flowers on Stand",
                author: "Julia Janeta",
                location: "Unknown",
                tags: "rose, gift, petal, flower, scent, drawer, white",
                uniqueId: 0,  
                isLogoRequired: false,
                isImageRequired: true,
                isTextRequired: true,        
                models:[
                    { uniqueId: 0, type: 'Name', text: "Name", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false },
                    { uniqueId: 1, type: 'Footer Copy', text: "Footer copy", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false },                 
                ],                
                layers:[
                    {layerId:0, isGraphicHidden: false,selectedFile: null,height: 120, width: 120},
                    {layerId:1, isGraphicHidden: false,selectedFile: null,height: 120, width: 120},
                ]
            }, {
                url: "../assets/img/justlistedfour.png",
                name: "Flowers on Stand",
                author: "Julia Janeta",
                location: "Unknown",
                tags: "rose, gift, petal, flower, scent, drawer, white",
                uniqueId: 1, 
                isLogoRequired: false,
                isImageRequired: true,
                isTextRequired: true,  
                models:[
                    { uniqueId: 0, type: 'Address', text: "Address", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false },
                    { uniqueId: 1, type: 'Phone Number', text: "Phone Number", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false },
                    { uniqueId: 2, type: 'Detail1', text: "Detail1", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false },
                    { uniqueId: 3, type: 'Detail2', text: "Detail2", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false },        
                    { uniqueId: 4, type: 'Detail3', text: "Detail3", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false },
                    { uniqueId: 5, type: 'Detail4', text: "Detail4", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false },        
                    { uniqueId: 6, type: 'Detail5', text: "Detail5", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false },
                    { uniqueId: 7, type: 'Detail6', text: "Detail6", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false },        
                    { uniqueId: 8, type: 'Name', text: "Name", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false },
                    { uniqueId: 9, type: 'Footer Copy', text: "Footer copy", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false },                 

                ],
                layers:[
                    {layerId:0, isGraphicHidden: false,selectedFile: null,height: 120, width: 120},
                    {layerId:1, isGraphicHidden: false,selectedFile: null,height: 120, width: 120},
                ]
            }, {
                url: "../assets/img/justsold.png",
                name: "Flowers on Stand",
                author: "Julia Janeta",
                location: "Unknown",
                tags: "rose, gift, petal, flower, scent, drawer, white",
                uniqueId: 2,
                isLogoRequired: false,
                isImageRequired: false,
                isTextRequired: false,
            }, {
                url: "../assets/img/welcome.png",
                name: "Flowers on Stand",
                author: "Julia Janeta",
                location: "Unknown",
                tags: "rose, gift, petal, flower, scent, drawer, white",
                uniqueId: 3,
                isLogoRequired: false,
                isImageRequired: false,
                isTextRequired: false,
            }, {
                url: "../assets/img/welcomenew.png",
                name: "Flowers on Stand",
                author: "Julia Janeta",
                location: "Unknown",
                tags: "rose, gift, petal, flower, scent, drawer, white",
                uniqueId: 4,
                isLogoRequired: false,
                isImageRequired: false,
                isTextRequired: false,
            }, {
                url: "../assets/img/welcome1New2.png",
                name: "Flowers on Stand",
                author: "Julia Janeta",
                location: "Unknown",
                tags: "rose, gift, petal, flower, scent, drawer, white",
                uniqueId: 5,
                isLogoRequired: false,
                isImageRequired: false,
                isTextRequired: false,
            }
        
        ],
            filterQuery: ''
    };

    //canvas
    this.canvasSettings = {
        downloadableImage: ''
    };

    //sizes
    this.sizeSettings = {
        selectedSizeIndex: 0,
        sizes: [
            {
                name: "Pinterest",
                width: 1125,
                height: 1125,
                zoom: '60%'
            },
            {
                name: "Instagram",
                width: 500,
                height: 500,
                zoom: '100%'
            },
            {
                name: "Twitter and Facebook",
                width: 500,
                height: 300,
                zoom: '100%'
            }
        ]
    };

      //filters
    this.filterSettings = {
        selectedFilterIndex: 0,
        filters: [
            {
                name: "None",
                method: "channels",
                args: [{
                    red: 0,
                    green: 0,
                    blue: 0
                }]
            }, {
                name: "Light Contrast",
                method: "contrast",
                args: [10]
            }, {
                name: "Heavy Contrast",
                method: "contrast",
                args: [20]
            }, {
                name: "Grayscale",
                method: "greyscale",
                args: null
            }, {
                name: "Red Tint",
                method: "channels",
                args: [{
                    red: 30,
                    green: 0,
                    blue: 0
                }]
            }, {
                name: "Green Tint",
                method: "channels",
                args: [{
                    red: 0,
                    green: 30,
                    blue: 0
                }]
            }, {
                name: "Blue Tint",
                method: "channels",
                args: [{
                    red: 0,
                    green: 0,
                    blue: 30
                  }]
            }
        ]
    }

    //text
    this.textSettings = {
        hasHeader: false,
        hasBody: true,
        hasCaption: false,
        selectedModelUniqueId: -1,
        models: [
            { uniqueId: 0, type: 'Name', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false },
            { uniqueId: 1, type: 'Footer Copy', text: "Double-click to Edit", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false },

        ],
        selectedQuoteIndex: 0,
            quotes: [{
                text: "So it goes."
            }, {
                text: "Whatever you are, be a good one."
            }, {
                text: "Try and fail, but never fail to try."
            }
        ],
        options: {
            align: ['align-left', 'align-center', 'align-right'],
            sizes: ['normal', 'large', 'largest'],
            fonts: [ 
                { name: 'Arial', family: 'Arial, Helvetica, sans-serif' },
                { name: 'Times', family: '"Times New Roman", Times, serif' }
            ],
            colors: ['Black', '#9C27B0', '#2196F3', '#009688', '#CDDC39', '#FF9800']
        }
    };

    //logo
    this.logoSettings = {
        isGraphicHidden: false,
        selectedFile: null,
        size: 50,
        radius: 0
    };
    //Image Layers
    this.imageLayerSettings = {
        isGraphicHidden: false,
        selectedFile: null,
        height: 120,
        width: 120
    };
  }

  /*onShuffleImages() {
      this.imageSettings.images = _.shuffle(this.imageSettings.images);
      this.imageSettings.selectedImageUniqueId = this.imageSettings.images[0].uniqueId;
      this.editSettingsService.updateCanvas();
  }*/

  onImageSettingsChange(payload) {
      this.editSettingsService.updateCanvas();
  }

  onCanvasReposition() {
      // console.log("canvas reposition");
  }

  onSizeSettingsChange(payload) {
      this.editSettingsService.updateCanvas();
      this.editSettingsService.updateOverlays();
  }

  onFilterReset() {
      this.filterSettings.selectedFilterIndex = 0;
      this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
  }

  onFilterSettingsChange(payload) {
      this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
  }

  onTextSettingsChange(payload) {
      this.editSettingsService.updateOverlays();
  }

  onLogoSettingsChange(payload) {
      this.editSettingsService.updateOverlays();
  }

  onDownload() {
      this.generateImageService.generateImage();
  }
  onImageLayerSettingsChange(payload) {
    this.editSettingsService.updateOverlays();
}
}
