import { FormGroup } from '@angular/forms'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminService {
    token: string = ""
    popOutMood: boolean = false
    popOutMessage: String = ""
    
    constructor(private http: HttpClient, private router: Router) {
        this.autoLogin()
    }
    popOutMoodTrigger() {
        this.popOutMood = false
    }
    adminLogin(loginForm: FormGroup) {
        console.log(loginForm)
        this.http.post('https://localhost:7096/api/Admins/login', { UserName: loginForm.value.userName, Password: loginForm.value.password, }).subscribe((responseData: any) => {
            sessionStorage.setItem('token', JSON.stringify(responseData.token));
            this.token = responseData.token
            this.router.navigate(["/admins/brief"])
            loginForm.reset()
            console.log(responseData)
        }, error => {
            console.log(error)
            this.popOutMood = true
            this.popOutMessage = error.error.message
        })
    }
    logout() {
        sessionStorage.clear()
        this.router.navigate([''])
        this.token = ""
    }
    autoLogin() {

        if (!JSON.parse(sessionStorage.getItem('token')!)) {
            return;
        } else {
            this.token = JSON.parse(sessionStorage.getItem('token')!);
        }
    }

}
