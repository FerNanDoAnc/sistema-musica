import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list-integrantes-dialog',
  templateUrl: './add-list-integrantes-dialog.component.html',
  styleUrls: ['./add-list-integrantes-dialog.component.scss']
})
export class AddListIntegrantesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddListIntegrantesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();
  }
}
