import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent   {

  get usuario(){
    return this.authService.usuario;
  }

  miFormulario: FormGroup=this.fb.group({
    nombre: ['',[Validators.required,Validators.maxLength(50)]],
    correo: ['',[
      Validators.required,
      Validators.maxLength(80),
      Validators.pattern(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
    ]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService

  ) { }

  get formValidate(){
    return this.miFormulario.controls;
  }

  registro(){
    
    const {nombre,correo,password}=this.miFormulario.value;

    this.authService.registro(nombre, correo,password)
      .subscribe( ok=>{

        if(ok===true){
          this.router.navigateByUrl('/dashboard');
          Swal.fire({
            title: this.usuario.msg,
            html: 'Bienvenido: '+this.usuario.nombre,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            width: 350
          });

        }else{
          Swal.fire({
            title: '!Error!',
            text: ''+ok+'!',
            icon: 'error',
            timer: 2500,
            confirmButtonText: 'Ok',
            width: 350
          });
        }

      });

  }

}
