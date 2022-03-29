import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ListarPartituraDialogComponent } from '../listar-partitura-dialog/listar-partitura-dialog.component';
import { CrearPartituraDialogComponent } from '../crear-partitura-dialog/crear-partitura-dialog.component';

@Component({
  selector: 'app-listar-partitura',
  templateUrl: './listar-partitura.component.html',
  styleUrls: ['./listar-partitura.component.scss']
})
export class ListarPartituraComponent implements OnInit {

  @Input() cancion!: any ;

  constructor(
    public dialogRef: MatDialogRef<ListarPartituraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    if(this.data?.content?.hasOwnProperty('_id')){
      this.cancion=this.data.content;
    }
  }

  editPartitura(){
    this.dialogRef.close(this.cancion);
    this.openDialog(this.cancion);
  }
  openDialog(cancion?: any): void {
    const config={
      data:{
        content:this.cancion
      }
    };
    const dialogRef= this.dialog.open(CrearPartituraDialogComponent,config);
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        console.log("onEditCancion",resp);
      }
    });
  }
}
