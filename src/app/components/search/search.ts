import { Component, OnInit } from '@angular/core';
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
export class Search implements OnInit {
  private _clientService: ClientService;
  private _clientsData: Client[] = [];

  constructor(clientService: ClientService) {
    this._clientService = clientService;
  }

  ngOnInit(): void {
    const clientes = this._clientService.getAllClients();
    this._clientsData = clientes;
  }

  get clientsData(): Client[] {
    return this._clientsData;
  }
}
