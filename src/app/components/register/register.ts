import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client-service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private _useForm: FormGroup;
  private _clientService: ClientService;

  constructor(private fb: FormBuilder, clientService: ClientService) {
    this._useForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
    });
    this._clientService = clientService;
  }

  get useForm(): FormGroup {
    return this._useForm;
  }

  onSubmit(): void {
    if (this._useForm.valid) {
      const formData = this._useForm.value;

      const client = new Client(
        formData.name,
        formData.email,
        formData.cpf,
        new Date(formData.birthdate)
      );

      this._clientService.saveClient(client);
      
    } else {
      console.error('Form is invalid');
    }
  }
}
