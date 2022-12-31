import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  user: User;

  constructor(private http: HttpClient) {
    this.loadUsers();
    if (localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user')) as User;

  }

  createUser(name: string, email: string, phone: string) {
    this.user = new User(name, email, phone);
  }

  updateUser(name: string, phone: string) {
    this.user.name = name;
    this.user.phone = phone;
  }

  setPlan(planId: string, period: string) {
    this.user.selectedPlanId = planId;
    this.user.period = period;
  }

  setAddOns(addOns: string[]) {
    this.user.selectedAddOns = [...addOns];
  }

  getAddOns() {
    return this.user?.selectedAddOns.slice() || [];
  }

  deleteUser() {
    this.user = null;
  }

  getUserByEmail(email: string): User {
    if (!this.users || (this.users && !this.users.length)) {
      if (localStorage.getItem('user'))
        localStorage.removeItem('user');
      return null;
    }

    const user = this.users.find(user => user.email === email);
    if (user) {
      localStorage.setItem('user', JSON.stringify('user'));
      this.user = user;
      return Object.assign({}, user);
    }
    return null;
  }

  getUser(): User {
    return this.user;
  }

  loadUsers() {
    this.http.get<User[]>('https://front-end-mentor-61687-default-rtdb.firebaseio.com/users.json').subscribe((users: User[]) => {
      for(let key in users)
        this.users.push(users[key] as User);
    })
  }

  addUser() {
    let user = this.users.find(user => user.email === this.user.email);
    if(user) {
      user = this.user;
    } else {
      this.users.push(this.user);
    }
    this.http.put<User[]>('https://front-end-mentor-61687-default-rtdb.firebaseio.com/users.json', this.users, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe((resp) => {
      console.log(resp);
    })
  }
}
