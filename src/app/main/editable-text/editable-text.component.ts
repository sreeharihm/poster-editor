import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { EditTextComponent } from '../edit-text/edit-text.component';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css']
})
export class EditableTextComponent  {

	@ViewChild('textInput', { read: ElementRef }) textInput;

	@Input() model: any;
	@Input() options: any;

	isEditing: boolean;

	constructor(private renderer: Renderer2, private el: ElementRef) {
		this.el = el.nativeElement;
	}

	public reset() {

		//update edit flag
		this.isEditing = false;
	}

	public addEditTextControls(editTextComponent: EditTextComponent) {
    //this.renderer.invokeElementMethod(this.el, 'appendChild', [editTextComponent.el]);
    this.renderer.appendChild(this.el,editTextComponent.el);
	}

	onDoubleClick($event) {

		//update edit flag
		this.isEditing = true;

		//update textInput
    //this.renderer.invokeElementMethod(this.textInput.nativeElement, 'focus', []);
    this.renderer.selectRootElement(this.textInput.nativeElement).focus();//['focus'].apply(this.textInput.nativeElement);
    //this.renderer.invokeElementMethod(this.textInput.nativeElement, 'select', []);
	//this.renderer['select'].apply(this.textInput.nativeElement);
	this.renderer.selectRootElement(this.textInput.nativeElement).select();
	}
}
