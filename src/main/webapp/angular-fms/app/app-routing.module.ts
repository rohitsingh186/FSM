import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanvasComponent} from "./canvas/canvas.component";
import {UploadComponent} from "./upload/upload.component";
import {ExplorerComponent} from "./explorer/explorer.component";


const routes: Routes = [
    { path: 'upload',  component: UploadComponent },
    { path: 'explorer',  component: ExplorerComponent },
       {path: '', component:UploadComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

