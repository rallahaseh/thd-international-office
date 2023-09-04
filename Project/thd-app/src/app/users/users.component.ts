import { Component, OnInit } from '@angular/core';
import { APIService } from '../api-service';
import { ENDPOINTS } from '../api-service-endpoints';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Columns data
  displayedColumns: string[] = ['role', 'name', 'username', 'email', 'dob', 'actions'];
  // Table data
  dataSource: User[] = []

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.loadUsersData();
  }

  /**
   * loadNewsData Function calls <getNews> API to fetch data
   */
  loadUsersData(): void {
    this.apiService.get<User[]>(ENDPOINTS.getUsers)
      .subscribe(response => {
        let id = localStorage.getItem('id');
        this.dataSource = response.filter(user => user.id != id);
      });
  }

  /**
   * deleteUser Functions which used to call <removeUser/[user-id]> API to remove a article
   * @param user 
   */
  deleteUser(user: User) {
    // TODO: - localize question message
    if (confirm("Are you sure to delete " + user.username + "?")) {
      let url = ENDPOINTS.removeUser + user.id
      this.apiService.delete(url)
        .subscribe(response => {
          // TODO: - localize response message
          window.alert('Article has been removed')
          window.location.reload();
        });
    }
  }
}
