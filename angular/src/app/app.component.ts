import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  API = 'http://localhost:3000'
  people: any[] = [];

  constructor(private http: Http) {}

  ngOnInit() {
    this.getAll();
  }

  addNew(first_name, last_name, address, company) {
    this.http.post(`${this.API}/users`, {first_name, last_name, address, company})
      .map(res => res.json())
      .subscribe(() => {
        console.info(first_name, last_name, address, company)
        this.getAll();
      })
  }

  getAll() {
    this.http.get(`${this.API}/users`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.people = people
      })
  }
}
