import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientsTable } from '../clients-table/clients-table';
import { ClientService } from '../../services/client-service';
import { Client } from '../../models/client';
import { SearchInput } from '../search-input/search-input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [MatFormFieldModule, MatInputModule, ClientsTable, SearchInput, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  private _clientService: ClientService;
  private _clientsData: Client[] = [];
  private _searchForm: FormGroup;

  constructor(clientService: ClientService, private fb: FormBuilder) {
    this._searchForm = this.fb.group({
      search: ['', Validators.required],
    });
    this._clientService = clientService;
  }

  ngOnInit(): void {
    const clientes = this._clientService.getAllClients();
    this._clientsData = clientes;
  }

  get clientsData(): Client[] {
    return this._clientsData;
  }

  get searchForm(): FormGroup {
    return this._searchForm;
  }

  private filterClients(searchString: string): void {
    const filteredClients = this._clientService.filterClientsByName(searchString);
    this._clientsData = filteredClients;
  }

  onSubmit(): void {
    if (this._searchForm.valid) {
      this.filterClients(this._searchForm.value.search);
    }
  }
}
