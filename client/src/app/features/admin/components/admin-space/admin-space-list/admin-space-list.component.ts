import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

import { Pagination } from 'src/app/models/pagination/pagination';
import { SpaceParams } from 'src/app/models/pagination/spaceParams';
import { Space } from 'src/app/models/space/space';
import { SpaceService } from 'src/app/services/space.service';
import { StatisticsService } from 'src/app/services/statistics.service';

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
  cards: any;

  dropdownForm: FormGroup;
  dropdown = [
    { id: 1, pageSize: 3 },
    { id: 2, pageSize: 5 },
    { id: 3, pageSize: 15 },
    { id: 4, pageSize: 25 },
  ];

  constructor(
    private router: Router,
    private spaceService: SpaceService,
    private fb: FormBuilder,
    private statService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.loading = false;
    this.initializeForm();
    this.loadSpaces();
    this.getCardStats();
  }

  initializeForm() {
    this.dropdownForm = this.fb.group({
      pageSize: [this.spaceParams.pageSize, Validators.required],
    });
  }

  changePageSize(event: any) {
    this.dropdownForm.get('pageSize').setValue(event.target.value, {
      onlySelf: true,
    });
    this.spaceParams.pageSize = this.dropdownForm.value.pageSize;
    this.loadSpaces();
    console.log(this.dropdownForm.value);
  }

  handleErrorDropDown = (controlName: string, errorName: string) => {
    return this.dropdownForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    console.log('new page size', this.dropdownForm.value);
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
        if (this.dropdown.length <= 4) {
          this.dropdown.push({ id: 5, pageSize: this.pagination.totalItems });
        }
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

  getCardStats() {
    this.statService.getCardStats(false).subscribe({
      next: (response) => {
        this.cards = response;
        console.log('[card]', response);
      },
    });
  }
}
