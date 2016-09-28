import { NgModule,enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }   from './components/app.component';
import { FileListComponent }   from './components/file-list.component';
import { FileUploaderComponent }   from './components/file-uploader.component';
import { FileDetailComponent }   from './components/file-detail.component';
import { routing } from './app.routing';
import { FormsModule }   from '@angular/forms';

//enableProdMode();

@NgModule({
    imports: [BrowserModule, HttpModule,routing, FormsModule],
    declarations:[
        AppComponent,
        FileListComponent,
        FileUploaderComponent,
        FileDetailComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }