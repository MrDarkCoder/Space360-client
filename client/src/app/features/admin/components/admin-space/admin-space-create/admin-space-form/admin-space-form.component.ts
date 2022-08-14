import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpaceCategory } from 'src/app/models/forms/SpaceCategory';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-admin-space-form',
  templateUrl: './admin-space-form.component.html',
})
export class AdminSpaceFormComponent implements OnInit {
  spaceForm: FormGroup;
  spaceCategories: SpaceCategory[];
  submitted: boolean = false;
  currentCategoryId = 0;

  minTime: Date = new Date();
  maxTime: Date = new Date();
  opensAtDefault: Date = new Date();
  closeAtDefault: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private spaceService: SpaceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    //Setting default time for time picker
    this.opensAtDefault.setHours(9);
    this.opensAtDefault.setMinutes(0);

    this.closeAtDefault.setHours(18);
    this.closeAtDefault.setMinutes(0);

    //Setting Minimum and Maximum time for Time Picker component
    this.minTime.setHours(9);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(18);
    this.maxTime.setMinutes(0);

    this.getSpaceCategory();
  }

  initializeForm() {
    this.spaceForm = this.fb.group({
      spaceName: ['', Validators.required],
      spaceCategoryName: [''],
      capacity: [0, Validators.required],
      image: ['', Validators.required],
      opensAt: [this.opensAtDefault, Validators.required],
      closeAt: [this.closeAtDefault, Validators.required],
      file: ['', Validators.required],
    });
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

  getSpaceCategory() {
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

    let st = new Date(this.spaceForm.value.opensAt + 'UTC');
    let ct = new Date(this.spaceForm.value.closeAt + 'UTC');

    let formData = new FormData();

    formData.append('spaceName', this.spaceForm.value.spaceName);
    formData.append('spaceCapacity', this.spaceForm.value.capacity);
    formData.append('spaceCategoryId', this.currentCategoryId.toString());
    formData.append('form', this.spaceForm.value.image);
    formData.append('opensAt', st.toISOString());
    formData.append('closesAt', ct.toISOString());

    console.dir(formData);
    console.log('[st]', st.toISOString());
    console.log('[ct]', ct.toISOString());

    // post call
    this.spaceService.createSpace(formData).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.router.navigateByUrl('/admin/space');
      },
    });
  }
}
