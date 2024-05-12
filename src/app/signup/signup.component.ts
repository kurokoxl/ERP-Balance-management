import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UserType {
  name: string;
  code: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  userType: UserType[] | undefined;

  constructor(private router:Router,private sharedService:SharedService,private afAuth: AngularFireAuth,private http:HttpClient){}
 ngOnInit(): void {
  this.userType = [
    { name: 'Ahly Momken', code: '1' },
    { name: 'Bank', code: '2' },
];
 }
  async onSingup(form:NgForm){
    try {
      //ahlymomken@gmail.com Q5Ahwz1DUzOW8faTQQqKHlQcSOB2
      //bank@gmail.com  GOiCJbzWdkYSI7Ix75mZmYOQBgX2
      const result = await this.afAuth.createUserWithEmailAndPassword(form.value.email,form.value.password);
       // Redirect to dashboard
       this.sharedService.createNewUser(form.value.userType,result.user?.uid)

       console.log(form.value.userType)

      console.log('Sign up successful!', result);
      // Optionally, you can navigate to another page or display a success message.
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error - display a message to the user, etc.
    }
  }
}
