import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-admin-space-category-form',
  templateUrl: './admin-space-category-form.component.html',
})
export class AdminSpaceCategoryFormComponent implements OnInit {
  spaceCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spaceService: SpaceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.spaceCategoryForm = this.fb.group({
      spaceCategoryName: ['', Validators.required],
    });
  }

  onSubmit() {
    this.spaceService
      .createSpaceCategory(this.spaceCategoryForm.value)
      .subscribe({
        next: (response: any) => {
          this.toastr.success(response.message);
          this.router.navigateByUrl('/admin/space');
        },
      });
  }
}
