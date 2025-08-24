import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../services/client-service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../services/snackbar-service';

@Component({
  selector: 'app-update',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update implements OnInit {
  private _useForm: FormGroup;
  private _clientService: ClientService;
  private _route: ActivatedRoute;
  private _clientId = '';
  private _snackbarService: SnackbarService;

  constructor(
    private fb: FormBuilder,
    clientService: ClientService,
    route: ActivatedRoute,
    snackbarService: SnackbarService
  ) {
    this._useForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      cpf: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
      birthdate: [{ value: '', disabled: true }, Validators.required],
    });
    this._clientService = clientService;
    this._route = route;
    this._snackbarService = snackbarService;
  }

  ngOnInit(): void {
    const clientId = this._route.snapshot.paramMap.get('id');

    if (clientId) {
      this.populateForm(clientId);
      this._clientId = clientId;
    }
  }

  private populateForm(clientId: string): void {
    try {
      const client = this._clientService.getClientById(clientId);

      if (client) {
        this._useForm.patchValue({
          name: client.name,
          email: client.email,
          cpf: client.cpf,
          birthdate: client.birthdate!,
        });
      }
    } catch (error) {
      this._snackbarService.openSnackBar('An error occurred while fetching the client data');
      console.error('Error fetching client data', error);
    }
  }

  private toggleButtons(): void {
    const editButton = document.getElementById('editButton');
    const updateButton = document.getElementById('updateButton');

    if (editButton && updateButton) {
      editButton.style.display = 'none';
      updateButton.style.display = 'flex';
    }
  }

  enableInputs(): void {
    this._useForm.get('name')?.enable();
    this._useForm.get('email')?.enable();
    this._useForm.get('cpf')?.enable();
    this._useForm.get('birthdate')?.enable();
    this.toggleButtons();
  }

  get useForm(): FormGroup {
    return this._useForm;
  }

  updateClient(): void {
    try {
      const client = this._useForm.value;
      this._clientService.updateClient(client, this._clientId);
      this._snackbarService.openSnackBar('Client updated successfully!');
      window.location.href = '/search';
    } catch (error) {
      this._snackbarService.openSnackBar('It was not possible to update the client.');
    }
  }
}
