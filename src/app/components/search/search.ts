import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientsTable } from '../clients-table/clients-table';
import { ClientService } from '../../services/client-service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-search',
  imports: [MatFormFieldModule, MatInputModule, ClientsTable],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private _clientService: ClientService;
  private _clientsData: Client[] = [];

  constructor(clientService: ClientService) {
    this._clientService = clientService;
    this._clientsData = this._clientService.getAllClients();
  }

  get clientsData(): Client[] {
    return this._clientsData;
  }
}
