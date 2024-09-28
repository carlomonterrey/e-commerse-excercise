import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  autenticationFormGroup!: FormGroup
  auth_service=inject(UserService)
  message=signal({severity:'',message:''})
  showSpiner=signal(false)
  constructor(private formBuilder: FormBuilder, private router: Router){}
  ngOnInit(): void {
    this.autenticationFormGroup = this.formBuilder.group({

      username: ['', [Validators.required, Validators.nullValidator,]],
      password: ['', [Validators.required, Validators.nullValidator]],
    })}

    onSubmit(): void {
      if (this.autenticationFormGroup.valid) {
        localStorage.clear();
this.showSpiner.set(true)
        this.auth_service.login(this.autenticationFormGroup.value).subscribe({

          next: data => {
            this.message.set({severity:'success',message:'Welcome'})
            console.log(data,'data de usuario');
  
            const { token } = data
            this.auth_service.saveToken(token)
            this.showSpiner.set(false)

         setTimeout(() => {
          this.router.navigateByUrl('/home'); 

         }, 1000);
          },
          error: err => {
            this.message.set({severity:'error',message:err.error})
            this.showSpiner.set(false)

            console.log( 'error',err.error);
  
        
          
  
          }
        });
  
      } else {
  
  
      }
  
  
  
  
    }
}
