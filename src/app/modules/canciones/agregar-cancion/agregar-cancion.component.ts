import { Component, OnInit, Inject } from '@angular/core';
import { CrearCancionDialogComponent } from '../crear-cancion-dialog/crear-cancion-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../../shared/components/confirmar/confirmar.component';
import { CancionService } from '../../../shared/services/cancion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { RepertorioService } from '../../../shared/services/repertorio.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.scss']
})
export class AgregarCancionComponent implements OnInit {
  idLocal:any=localStorage.getItem('_id');
  idRepPorId:any=localStorage.getItem('repertorioPorId');

  cancion: any= {
    nombre:'',
    link:'',
    repertorio:this.idRepPorId,
    usuario: this.idLocal
  }

  constructor(
    public dialogRef: MatDialogRef<CrearCancionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog,

    private cancionesService:CancionService,
    private snackBar: MatSnackBar,
    private router:Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // obtener id desde el dialog de tarjeta
    if(this.data?.content?.hasOwnProperty('_id')){
      this.cancion=this.data.content;
    }
    
  }

  onClickNo(): void {
    this.dialogRef.close();
  }

  guardar(){
    
    if(this.cancion._id){
      // Actualizar
      this.cancionesService.actualizarCancion(this.cancion)
        .subscribe(resp=>{
          this.mostrarSnackBar("Cancion actualizada")
          this.dialogRef.close();
        });
    }
    else{ 
      // Crear
      this.cancionesService.agregarCancion(this.cancion).
      subscribe(cancion=>{
        this.mostrarSnackBar("Cancion Creada");
        // this.router.navigate(['/home/repertorios/',this.idRepPorId]);
        this.dialogRef.close();
        window.location.reload();
      })
    }
  }

  // //En caso se desee borrar desde el dialog
  // borrarCancion(){
  //   const dialog=this.dialog.open(ConfirmarComponent,{
  //     width:'250px',
  //     data:{...this.cancion}
  //   })

  //   dialog.afterClosed().subscribe(
  //     (result)=>{
  //       if(result){
  //         this.cancionesService.borrarCancion(this.cancion._id!)
  //           .subscribe(cancion=>{
  //             this.mostrarSnackBar("cancion borrada");
  //             // this.router.navigate(['/home/repertorios']);
  //           })
  //       }
  //     }
  //   );
    
  // }

  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }
  volver(){
    this.router.navigate(['/home/repertorios']);
  }

}
