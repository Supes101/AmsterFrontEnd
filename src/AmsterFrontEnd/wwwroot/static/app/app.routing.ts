import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileListComponent}      from './components/file-list.component';
import { FileUploaderComponent}      from './components/file-uploader.component';
import { FileDetailComponent}      from './components/file-detail.component';

const appRoutes: Routes = [
  {
    path: 'logfiles',
    component: FileListComponent
    },
    {
      path: 'upload',
      component: FileUploaderComponent
    },
    {
        path: 'file-detail/:id',
        component: FileDetailComponent
    },
    {
        path: '',
        redirectTo: 'logfiles',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash:true});