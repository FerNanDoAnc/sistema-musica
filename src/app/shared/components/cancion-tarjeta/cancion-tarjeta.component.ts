import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearCancionDialogComponent } from '../../../modules/canciones/crear-cancion-dialog/crear-cancion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { CancionService } from '../../services/cancion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cancion-tarjeta',
  templateUrl: './cancion-tarjeta.component.html',
  styleUrls: ['./cancion-tarjeta.component.scss']
})
export class CancionTarjetaComponent implements OnInit  {

  // cancionList: any= {
  //   nombre:'',
  //   link:'',
  // }

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cancionService: CancionService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  @Input() cancion!: any ;

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({_id})=>this.cancionService.getCancionPorId(_id))
    )
    .subscribe(cancion=>this.cancion=cancion);
    
  }

  // openDialog(): void {
  //   const dialogRef= this.dialog.open(CrearCancionDialogComponent,{
  //     width: '500px',
  //     height: '500px',
  //     data: {message: '¿Desea crear una nueva canción?'}

  //   });
  //   dialogRef.afterClosed().subscribe(resp=>{
  //     if(resp){
  //       console.log("resp",resp);
  //       this.guardar();
  //       // this.router.navigate(['/home/crear-cancion']);
  //     }
  //   });
  // }
  // guardar(){
  //   this.cancionService.agregarCancion(this.cancion).
  //     subscribe(repertorio=>{
  //       console.log("cancion creada",repertorio);
  //       // this.router.navigate(['/home/repertorios/editar',repertorio._id]);
  //       this.mostrarSnackBar("Cancion Creada");
  //       window.history.back();
  //       // this.router.navigate(['/home/repertorios']);
  //     })
  // }
  borrarCancion(){
    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data:{...this.cancion}
    })

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.cancionService.borrarCancion(this.cancion._id!)
            .subscribe(resp=>{
              this.mostrarSnackBar("Registro borrado");
              // window.history.back();
              // this.router.navigate(['/home/repertorios']);
            })
        }
      }
    );
  }

  //  =====================================================
  mostrarSnackBar( mensaje:string){
    this.snackBar.open(mensaje, '!Ok', {
      duration: 2000,
    });
  }

  onEditCancion(cancion: any){
    this.openDialog(cancion);
  }
  
  openDialog(cancion?: any): void {
    const config={
      data:{
        message:cancion? 'Editar canción':'Crear canción',
        content:cancion
      }
    };
    const dialogRef= this.dialog.open(CrearCancionDialogComponent,config);
    dialogRef.afterClosed().subscribe(resp=>{
      if(resp){
        console.log("resp",resp);
        // this.guardarCancion();
        // this.router.navigate(['/home/crear-cancion']);
      }
    });
  }
}
