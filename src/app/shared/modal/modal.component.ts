import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModel } from './models/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  message: string;
 
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalModel) {
    this.message = data.message;
  }
  
  onConfirm(): void {
    this.dialogRef.close(true);
  }
 
  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
