import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-partitura-dialog',
  templateUrl: './listar-partitura-dialog.component.html',
  styleUrls: ['./listar-partitura-dialog.component.scss']
})
export class ListarPartituraDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListarPartituraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();
  }

}
