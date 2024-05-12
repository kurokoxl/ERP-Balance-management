import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IncomeComponent } from '../income/income.component';
import { SharedService } from '../shared.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import {  GoalsComponent } from '../goals/goals.component';
export interface Goal {
  name: string;
  description: string;
  targetAmount: number;
}
interface IncomeItem {
  amount: number;
  category: string;
  name: string;
}
interface ExpenseItem {
  name: string;
  category: string;
  price: number; // Make sure price is defined with the correct type
}

interface ExpenseData {
  [category: string]: {
    [id: string]: ExpenseItem;
  };
}
interface IncomeData {
  [category: string]: {
    [id: string]: IncomeItem;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId: string | null = null;
  userIdSubscription: Subscription | undefined;
  goals: Goal[] = [];

  incomeData: IncomeData = {}; // Initialize incomeData with empty object
  chartData: any;
  expenseData: ExpenseData = {}; // Initialize expenseData with empty object
  expenseChartData: any;
  constructor(private http: HttpClient,private sharedservice:SharedService,private afAuth: AngularFireAuth) { }
  balance: number | undefined;

  ngOnInit(): void {
    
    this.userIdSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
       this. getBalance()

      }
    });
  }
  getBalance() {
    const url = 'https://balance-management-c8120-default-rtdb.firebaseio.com/Q5Ahwz1DUzOW8faTQQqKHlQcSOB2/Balance.json';

    this.http.get<number>(url).subscribe(
      (data: number) => {
        this.balance = data;
        console.log('Balance:', this.balance);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
}

