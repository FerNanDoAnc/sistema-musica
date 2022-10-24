import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-msg-dialog',
  templateUrl: './new-msg-dialog.component.html',
  styleUrls: ['./new-msg-dialog.component.scss']
})
export class NewMsgDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewMsgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();
  }
}
