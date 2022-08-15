import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/pagination/pagination';
import { SpaceParams } from 'src/app/models/pagination/spaceParams';
import { Space } from 'src/app/models/space/space';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-user-space-list',
  templateUrl: './user-space-list.component.html',
  styleUrls: ['./user-space-list.component.scss'],
})
export class UserSpaceListComponent implements OnInit {
  spaces: Space[] = [];

  pagination: Pagination;
  first = 0;
  spaceParams: SpaceParams = new SpaceParams();

  constructor(private spaceService: SpaceService, private router: Router) {}

  ngOnInit(): void {
    this.spaceParams.pageSize = 8;
    this.loadSpaces();
  }

  nextPage(event: any) {
    // console.log('{load next page count}', ++this.cnt);
    console.log(event);
    this.spaceParams.pageNumber = event.page;
    // this.pagination.currentPage = event.first + 1;
    this.loadSpaces();
  }

  loadSpaces() {
    this.spaceService.getSpaces(this.spaceParams).subscribe({
      next: (response: any) => {
        this.spaces = response.results;
        this.spaces.push(...response.results);
        this.pagination = response.pagination;
        console.log(this.pagination);
        console.log(this.spaces);
      },
    });
  }

  movetoreservation() {
    this.router.navigateByUrl('user/reserve');
  }
}
