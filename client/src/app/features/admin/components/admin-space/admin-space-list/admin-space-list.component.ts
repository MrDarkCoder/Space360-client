import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

import { Pagination } from 'src/app/models/pagination/pagination';
import { SpaceParams } from 'src/app/models/pagination/spaceParams';
import { Space } from 'src/app/models/space/space';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-admin-space-list',
  templateUrl: './admin-space-list.component.html',
  styleUrls: ['./admin-space-list.component.scss'],
})
export class AdminSpaceListComponent implements OnInit {
  spaces: Space[] = [];
  pagination: Pagination;
  first = 0;
  spaceParams: SpaceParams = new SpaceParams();
  cnt = 0;
  ct = 0;
  loading: boolean;

  constructor(private router: Router, private spaceService: SpaceService) {}

  ngOnInit(): void {
    this.loading = false;
    this.loadSpaces();
  }

  sample(name: string) {
    return name.charAt(0) + name.charAt(1);
  }

  nextPage(event: any) {
    console.log('{load next page count}', ++this.cnt);
    console.log(event);
    this.spaceParams.pageNumber = event.page;
    // this.pagination.currentPage = event.first + 1;
    this.loadSpaces();
  }

  loadSpaces() {
    console.log('{load space count}', ++this.ct);
    this.spaceService.getSpaces(this.spaceParams).subscribe({
      next: (response) => {
        this.spaces = response.results;
        this.pagination = response.pagination;
        console.log(this.pagination);
        console.log(this.spaces);
        this.loading = false;
      },
    });
  }

  moveToSpaceCreate() {
    this.router.navigateByUrl('admin/space/create');
  }

  moveToSpaceCategoryCreate() {
    this.router.navigateByUrl('admin/space/create/space-category-form');
  }

  moveToSpaceDetail(spacename: any) {
    console.log(spacename);
  }
}
