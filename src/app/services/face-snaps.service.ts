import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap.model";

@Injectable({
providedIn: 'root'
})
export class FaceSnapsService {
faceSnaps: FaceSnap[] = [
    {
    id:1,
    title:'Archibald',
    description:'Mon meilleur ami depuis tout petit',
    imageUrl:'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
    createdDate: new Date,
    snaps: 0,
    location: 'Paris'
    },
    {
    id:2,
    title:'Three Rock Mountain',
    description:'Un endroit magnifique pour les randonnées',
    imageUrl:'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
    createdDate: new Date,
    snaps: 0
    },
    {
    id:3,
    title:'Un bon repas',
    description:'Mmh que c\'est bon',
    imageUrl:'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
    createdDate: new Date,
    snaps: 0,
    location: 'Madrid'
    }
];

getAllFaceSnaps(): FaceSnap[] {
return this.faceSnaps;
}
getFaceSnapById(faceSnapId: number): FaceSnap {
    const faceSnap = this.faceSnaps.find (faceSnap => faceSnap.id === faceSnapId);
    if(!faceSnap) {
        throw new Error ('FaceSnap not found');
    } else {
            return faceSnap;
        }
    }

snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
    const faceSnap = this.getFaceSnapById(faceSnapId);
    snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
}

addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string}): void {
    const faceSnap: FaceSnap = {
        ...formValue,
        createdDate: new Date (),
        snaps: 0,
        id: this.faceSnaps [this.faceSnaps.length-1].id+1
    };
    this.faceSnaps.push(faceSnap);
}
}