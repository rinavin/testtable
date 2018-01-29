import {ElementRef, Input, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {TaskMagicService} from "../services/task.magics.service";
import {GuiCommand, CommandType} from "@magic/gui";
import {BaseTaskMagicComponent} from "./app.baseMagicComponent";
import {isNullOrUndefined} from "util";

// base class for magic directive
export class MagicDirectiveBase implements OnInit {
  @Input() rowId: string;
  @Input() events: any[] = [];

  protected htmlElement: HTMLElement;
  private component: BaseTaskMagicComponent;
  private eventHandlers: { [key: string]: () => void; } = {};
  protected id: string;

  // CTOR
  constructor(private element: ElementRef,
              private renderer: Renderer2,
              protected _task: TaskMagicService,
              private vcRef: ViewContainerRef,) {

    this.htmlElement = this.element.nativeElement;
    this.component = (<any>this.vcRef)._view.component as BaseTaskMagicComponent;
  }

  get task() {
    return this._task;
  }

  // event registering
  protected regEvents() {
    // Handle events for which event handler may be removed and restored
    this.eventHandlers['focus'] = this.OnFocus.bind(this);

    Object.keys(this.eventHandlers).forEach((key) => {
      this.htmlElement.addEventListener(key, this.eventHandlers[key]);
    });


    // Handle events with anonymous  event handlers
    let events: string[] = ['click', 'dblclick',];// 'mouseenter', 'mouseleave','resize', 'load', 'unload',
    events.forEach(event => {
      this.htmlElement.addEventListener(event, (e) => {
        this.task.insertEvent(event, this.id, this.rowId);
      });
    });
  }

  private OnFocus() {
    this.task.insertEvent('focus', this.id, this.rowId);
  }

  private IsSameElement(command) {
    return (command.CtrlName === this.id &&
      command.line == this.rowId ||
      (command.line === 0 && isNullOrUndefined(this.rowId)));
  }
  private regUpdatesUI() {
    this.task
      .refreshDom
      .filter(c => this.IsSameElement(c))
      .subscribe(a => {
          let command: GuiCommand = a;
          if (isNullOrUndefined(this.rowId))
            this.rowId = '0';
          try {
            this.handleCommand(command);
          }
          catch (ex) {
            console.dir(ex);
          }
        }
      );

  }

  ngOnInit(): void {
    this.regEvents();
    this.regUpdatesUI();
  }

  protected handleCommand(command: GuiCommand) {
    switch (command.CommandType) {

      case CommandType.SET_ATTRIBUTE:
        if (command.str != "true")
          this.renderer.removeAttribute(this.htmlElement, command.Operation);
        else
          this.renderer.setAttribute(this.htmlElement, command.Operation, command.str);

        break;

      case CommandType.CREATE_SUB_FORM:
        this.component.addSubformComp(command.CtrlName, command.userDropFormat.toString(), command.str, command.fileName);
        break;

      case CommandType.SET_FOCUS:
        this.htmlElement.removeEventListener('focus', this.eventHandlers['focus']);
        this.htmlElement.focus();
        this.htmlElement.addEventListener('focus', this.eventHandlers['focus']);
        break;
    }
  }
}
