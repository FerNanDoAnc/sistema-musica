import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepertorioList } from '../../../core/interfaces/repertorio.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss']
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<ConfirmarComponent>,
    // material- para poder injectar la data del padre agregarccomponent
    @Inject(MAT_DIALOG_DATA) public data: RepertorioList
  ) { }

  ngOnInit(): void {
  }
  borrar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close(false);
  }
}
