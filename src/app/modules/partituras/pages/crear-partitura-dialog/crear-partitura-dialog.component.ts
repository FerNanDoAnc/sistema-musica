import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-partitura-dialog',
  templateUrl: './crear-partitura-dialog.component.html',
  styleUrls: ['./crear-partitura-dialog.component.scss']
})
export class CrearPartituraDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CrearPartituraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();
  }
}
