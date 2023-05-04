import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap.model";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";

@Injectable({
providedIn: 'root'
})
export class FaceSnapsService {

    constructor(private http: HttpClient){

    }


getAllFaceSnaps(): Observable<FaceSnap[]> {
return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
}
getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
    }
// Notre serveur ne nous permet pas de récupérer un seul par son ID donc on va récupérer le facesnap correspondant au faceSnapId via une méthode GET, on va le transformer au format voulue puis on va le renvoyer au serveur via une méthode POST
snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
return this.getFaceSnapById(faceSnapId).pipe(
    map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
    })),
    switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
    );
}
addFaceSnap(formValue: {title: string, description: string, imageUrl: string, location?: string}): Observable<FaceSnap> {
return this.getAllFaceSnaps().pipe(
    map(facesnaps => [...facesnaps].sort((a:FaceSnap, b:FaceSnap) => a.id - b.id)),
    map(sortedFacesnaps => sortedFacesnaps [sortedFacesnaps.length -1]),
    map (previousFacesnap => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date (),
        id: previousFacesnap.id + 1
    })),
    switchMap(newFacesnap => this.http.post<FaceSnap>(`http://localhost:3000/facesnaps`, newFacesnap))
    );
}
}   