import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cancion-dialog',
  templateUrl: './crear-cancion-dialog.component.html',
  styleUrls: ['./crear-cancion-dialog.component.scss']
})
export class CrearCancionDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<CrearCancionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
  }

  onClickNo(): void {
    this.dialogRef.close();
  }

}
