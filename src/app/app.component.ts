import {Component} from '@angular/core';

declare class RegisteredModules{
  public modules: Array<any>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Thomas Schäfer';

  public modules: any = {};


  constructor(){
    this.loadModules();
  }

  loadModules() {

    import('../registered.modules').then(modules => {

      if(modules) {
        const regModules : RegisteredModules = new modules.RegisteredModules();
        if(regModules.constructor.name == "RegisteredModules") {
          for(let items of regModules.modules) {
            if(items.hasOwnProperty("name") && items.hasOwnProperty("path") && items.hasOwnProperty("local-name")){
              let path : string = items.path;
              this.modules[items.name] = () => {
                import (path+".ts").then(module => {
                  this[items.name] = items["callback"](module, this);
                })
              }

            } else if(items.hasOwnProperty("name") && items.hasOwnProperty("callback")) {
              this.modules[items.name] = items["callback"];
            }
          }
        }
      }
    });
  }

}
