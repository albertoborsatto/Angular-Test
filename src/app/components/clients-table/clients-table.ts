import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients-table',
  imports: [MatTableModule],
  templateUrl: './clients-table.html',
  styleUrl: './clients-table.css'
})
export class ClientsTable {
  @Input() clientsData: Client[] = [];

  displayedColumns: string[] = ['name', 'email', 'cpf', 'birthdate'];
}
