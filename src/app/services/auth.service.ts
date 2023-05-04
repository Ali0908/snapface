import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private token = 'My FaceToken';

    getToken(): string {
        return this.token;
    }
}