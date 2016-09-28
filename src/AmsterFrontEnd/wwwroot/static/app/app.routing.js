"use strict";
var router_1 = require('@angular/router');
var file_list_component_1 = require('./components/file-list.component');
var file_uploader_component_1 = require('./components/file-uploader.component');
var file_detail_component_1 = require('./components/file-detail.component');
var appRoutes = [
    {
        path: 'logfiles',
        component: file_list_component_1.FileListComponent
    },
    {
        path: 'upload',
        component: file_uploader_component_1.FileUploaderComponent
    },
    {
        path: 'file-detail/:id',
        component: file_detail_component_1.FileDetailComponent
    },
    {
        path: '',
        redirectTo: 'logfiles',
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map