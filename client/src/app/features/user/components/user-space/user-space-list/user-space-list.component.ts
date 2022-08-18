import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  dropdownForm: FormGroup;
  dropdown = [
    { id: 1, pageSize: 3 },
    { id: 2, pageSize: 5 },
    { id: 3, pageSize: 15 },
    { id: 4, pageSize: 25 },
  ];

  constructor(
    private spaceService: SpaceService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.spaceParams.pageSize = 8;
    this.initializeForm();
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
        this.pagination = response.pagination;
        console.log(this.pagination);
        console.log(this.spaces);
        if (this.dropdown.length <= 4) {
          this.dropdown.push({ id: 5, pageSize: this.pagination.totalItems });
        }
      },
    });
  }

  initializeForm() {
    this.dropdownForm = this.fb.group({
      pageSize: [this.spaceParams.pageSize, Validators.required],
    });
  }

  handleErrorDropDown = (controlName: string, errorName: string) => {
    return this.dropdownForm.controls[controlName].hasError(errorName);
  };

  changePageSize(event: any) {
    this.dropdownForm.get('pageSize').setValue(event.target.value, {
      onlySelf: true,
    });
    this.spaceParams.pageSize = this.dropdownForm.value.pageSize;
    this.loadSpaces();
    console.log(this.dropdownForm.value);
  }

  movetoreservation() {
    this.router.navigateByUrl('user/reserve');
  }

  refresh() {}
}
