/**
 * Created by rinav on 05/07/2017.
 */
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {MagicBridge} from "@magic/engine";
import {UIBridge, GuiCommand} from "@magic/gui";


@Injectable()
export class MagicEngine {
  magic = MagicBridge;
  isStub  = false;
  //TODO - unregister
  refreshDom: Subject<GuiCommand> = new Subject();

  startMagic() {
    this.magic.registerExecuteCommands(data => {
      if (!this.isStub) {
        const list = data as GuiCommand[];
        for (let c of list) {
          this.refreshDom.next(c);
        }
      }
    });

    this.magic.StartMagic();
  }

  insertEvent(taskId, eventName, controlIdx, lineidx) {
    if (!this.isStub)
      this.magic.insertEvent(taskId, eventName, controlIdx, lineidx);

  }

  registerGetValueCallback(taskId, cb) {
    if (!this.isStub)
      this.magic.registerGetValueCallback(taskId, cb);
  }

  registerShowMessageBox(cb) {
    if (!this.isStub)
      this.magic.registerShowMessageBox(cb);
  }

  registerOpenFormCallback(cb) {
    if (!this.isStub) {
      try {
        this.magic.registerOpenFormCallback(cb);
      }
      catch (e) {
        console.log('magic engine not found');
        console.log('moving to stub mode');
        this.isStub = true;

      }
    }

  }
  saveData(data:string)
  {
    //this.magic.saveData(data);
  }

}
