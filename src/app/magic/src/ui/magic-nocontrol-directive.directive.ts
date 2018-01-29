import {Directive, ElementRef, Input, Renderer2, ViewContainerRef } from '@angular/core';
import {FormControl} from "@angular/forms";
import {GuiCommand, CommandType} from "@magic/gui";
import {ControlMetadata, HtmlProperties} from "../controls.metadata.model";
import {MagicDirectiveBase} from "./magic-directive-base.directive";
import {TaskMagicService} from "../services/task.magics.service";

@Directive({
  selector: '[magicnc]'
})

// magic directive for no-control
export class MagicNoControlDirective extends MagicDirectiveBase {

  @Input('magicnc') set magic(val) {this.id = val};

  // CTOR
  constructor(element: ElementRef,
              renderer: Renderer2,
              _task: TaskMagicService,
              vcRef: ViewContainerRef) {
    super(element, renderer, _task, vcRef);
  }

  regEvents() {
  super.regEvents()

    if (this.htmlElement instanceof HTMLSelectElement) {
      this.htmlElement.addEventListener('change', (e) => {
        this.task.insertEvent('selectionchanged', this.id, (<any>(event.target)).selectedIndex.toString());
      });
    }

    if (this.htmlElement instanceof HTMLDivElement) {
      this.htmlElement.addEventListener('change', (e) => {
        let result = this.task.getFormControl('0', this.id);
        this.task.insertEvent('selectionchanged', this.id, (<any>(e.target)).value);
      });
    }
  }


  handleCommand(command: GuiCommand) {
    super.handleCommand(command);

    switch (command.CommandType) {
      case CommandType.SET_CLASS:
        //remove the class which was replaced by this new one, as registered in the ControlMetadata
        const controlMetadata:ControlMetadata = this._task.Records.list[0].getControlMetadata(this.id);
        if(controlMetadata.removedClass != '') {
          this.htmlElement.classList.remove(controlMetadata.removedClass);
          controlMetadata.removedClass = '';
        }

        this.htmlElement.classList.add(command.str);
        break;

      case  CommandType.SET_VALUE:
        if (this.htmlElement instanceof HTMLLabelElement)
          (<HTMLLabelElement>this.htmlElement).innerText = command.str;

        if (this.htmlElement instanceof HTMLSelectElement)
          (<HTMLSelectElement>this.htmlElement).value = command.str;

        if (this.htmlElement instanceof HTMLAnchorElement) //hyper-text button
          (<HTMLAnchorElement>this.htmlElement).text = command.str;

        if (this.htmlElement instanceof HTMLInputElement)
        {
          if((<HTMLInputElement>this.htmlElement).type === "checkbox") {
            (<HTMLInputElement>this.htmlElement).checked = command.Bool1;
          }
          else {
            (<HTMLInputElement>this.htmlElement).value = command.str;
          }
        }

        break;

      case CommandType.SET_PROPERTY:
        this.handleSetProperty(command);
        break;

      case CommandType.SET_STYLE:
        this.htmlElement.setAttribute("style", command.Operation + ":" + command.obj1);
        break;
    }
  }


  // handle set-property commands
  handleSetProperty(command: GuiCommand) {
    switch (command.Operation) {
      case HtmlProperties.Text:
        if (this.htmlElement instanceof HTMLLabelElement)
          (<HTMLLabelElement>this.htmlElement).innerText = command.obj1;

        break;

      case HtmlProperties.Image:
        if (this.htmlElement instanceof HTMLImageElement)
          (<HTMLImageElement>this.htmlElement).src = command.obj1;
        else
          this.htmlElement.setAttribute("src", command.obj1);

        break;

      case HtmlProperties.ItemsList:
        if (this.htmlElement instanceof HTMLSelectElement) {
          for (let s of command.obj1) {
            let elem = document.createElement("option");
            elem.text = s.realString;
            elem.value = s.index;
            (<HTMLSelectElement>this.htmlElement).add(elem);
          }
        }
        break;

      case HtmlProperties.Visible:
        this.htmlElement.setAttribute('style', 'visibility:' + (command.obj1 ? 'visible' : 'hidden'));
        break;

      case HtmlProperties.Enabled:
        if (command.obj1 === "false")
          this.htmlElement.setAttribute("disabled", "true");
        else
          this.htmlElement.removeAttribute("disabled");
        break;

      case HtmlProperties.TabIndex:
        this.htmlElement.setAttribute(command.Operation, command.obj1);
        break;

      case HtmlProperties.SelectedValue:
        if (this.htmlElement instanceof HTMLSelectElement)
          (<HTMLSelectElement>this.htmlElement).value = command.obj1;
        break;

      case HtmlProperties.PlaceHolder:
        this.htmlElement.setAttribute("placeholder", command.obj1);
        break;

      case HtmlProperties.Tooltip:
        this.htmlElement.setAttribute("title", command.obj1);
        break;

      case HtmlProperties.Password:
        if (command.obj1 === "false")
          this.htmlElement.setAttribute("type", "text");
        else
          this.htmlElement.setAttribute("type", "password");
        break;
    }
  }
}
