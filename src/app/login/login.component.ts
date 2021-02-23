import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModalModel } from '../shared/modal/models/modal';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.createFormGroup();
   }

  private createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit(): void {
    if(this.formGroup.invalid) {
      this.showErrorForm();
      return;
    }

    const dialogData = new ModalModel('Czy napewno chcesz się zalogować?');
    const dialogRef = this.dialog.open(ModalComponent, {
      maxWidth: '600px',
      data: dialogData
    });
 
    dialogRef.afterClosed().pipe(filter(x => x === true)).subscribe(result => {
      this.onDialogConfirm(result);
    });
  }

  private onDialogConfirm(result: boolean): void {
    this.snackBar.open('Poprawnie zalogowano!');
  }
  
  private showErrorForm(): void {
    this.snackBar.open('Formularz zawiera błędy!');
  }
}
