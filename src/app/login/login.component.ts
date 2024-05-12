import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SharedService } from '../shared.service';
import { Observable, map, take } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  superAdmin=false;

  constructor( private afAuth: AngularFireAuth, private router: Router, private sharedService: SharedService) {

  }

  ngOnInit() {
    this.sharedService.logout();
  }
  async onLogin(form: NgForm) {
    if (form.invalid) {
      return; // Prevent login if form is invalid (optional validation check)
    }
  
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(form.value.email, form.value.password);
      console.log('Login successful!', result);
      
      // Update login state in SharedService (assuming you have a BehaviorSubject)
      this.sharedService.loggedInSubject.next(true);
  
      // Optional: Redirect to dashboard using a shared service or directly from the component
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    
    
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error - display a message to the user, etc.
  }

}

}