import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpaceCategory } from 'src/app/models/forms/SpaceCategory';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-admin-space-form',
  templateUrl: './admin-space-form.component.html',
  styleUrls: ['./admin-space-form.component.scss'],
})
export class AdminSpaceFormComponent implements OnInit {
  spaceForm: FormGroup;
  spaceCategories: SpaceCategory[];
  submitted: boolean = false;
  currentCategoryId = 0;

  constructor(
    private fb: FormBuilder,
    private spaceService: SpaceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.getSubTeams();
  }

  initializeForm() {
    this.spaceForm = this.fb.group({
      spaceName: ['', Validators.required],
      spaceCategoryName: ['', Validators.required],
      capacity: [0, Validators.required],
      image: ['', Validators.required],
      opensAt: ['9:00', Validators.required],
      closeAt: ['6:00', Validators.required],
      file: ['', Validators.required],
    });
    this.spaceForm.get('opensAt').disable();
    this.spaceForm.get('closeAt').disable();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.spaceForm.patchValue({
        image: file,
      });
    }
  }

  handleErrorDropDown = (controlName: string, errorName: string) => {
    return this.spaceForm.controls[controlName].hasError(errorName);
  };

  getSubTeams() {
    this.spaceService.getSpaceCategory().subscribe({
      next: (response: SpaceCategory[]) => {
        this.spaceCategories = response;
      },
    });
  }

  changeSubCategory(event: any) {
    this.spaceForm.get('spaceCategoryName').setValue(event.target.value, {
      onlySelf: true,
    });

    this.currentCategoryId = this.spaceCategories.find(
      (t) => t.spaceCategoryName == this.spaceForm.value.spaceCategoryName
    ).spaceCategoryId;
  }

  onSubmit() {
    this.submitted = true;
    let formData = new FormData();

    formData.append('spaceName', this.spaceForm.value.spaceName);
    formData.append('spaceCapacity', this.spaceForm.value.capacity);
    formData.append('spaceCategoryId', this.currentCategoryId.toString());
    formData.append('form', this.spaceForm.value.image);
    formData.append('opensAt', this.spaceForm.value.opensAt);
    formData.append('closeAt', this.spaceForm.value.closeAt);

    console.dir(formData);

    // post call
    this.spaceService.createSpaceCategory(formData).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.router.navigateByUrl('/admin/space');
      },
    });
  }
}
