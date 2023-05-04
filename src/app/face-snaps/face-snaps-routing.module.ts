import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SingleFaceSnapComponent } from "./single-face-snap/single-face-snap.component";
import { FaceSnapListComponent } from "./face-snap-list/face-snap-list.component";
import { NewFaceSnapComponent } from "./new-face-snap/new-face-snap.component";
import { AuthGuard } from "../auth/guards/auth.guards";

const routes: Routes = [
    { path: 'create', component: NewFaceSnapComponent, canActivate: [AuthGuard]},
    { path: ':id', component: SingleFaceSnapComponent, canActivate: [AuthGuard] },
    { path: '', component: FaceSnapListComponent, canActivate: [AuthGuard]}, 
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class FaceSnapsRoutingModule {}