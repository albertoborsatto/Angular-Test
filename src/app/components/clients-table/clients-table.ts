import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../../models/client';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../services/dialog-service';
import { ClientService } from '../../services/client-service';
import { SnackbarService } from '../../services/snackbar-service';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Dialog } from '../dialog/dialog';
import { TableAction } from '../../enums/table-action';
import { formatDateBR } from '../../utils/formatDate';

@Component({
  selector: 'app-clients-table',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './clients-table.html',
  styleUrl: './clients-table.css',
})
export class ClientsTable implements OnInit {
  @Input() clientsData: Client[] = [];
  private _dialogService: DialogService;
  private _clientService: ClientService;
  private _snackBarService: SnackbarService;
  dataSource: MatTableDataSource<Client>;

  constructor(
    dialogService: DialogService,
    clientService: ClientService,
    snackbarService: SnackbarService
  ) {
    this._dialogService = dialogService;
    this._clientService = clientService;
    this._snackBarService = snackbarService;
    this.dataSource = new MatTableDataSource(this.clientsData);
  }

  ngOnInit(): void {
    this.clientsData.forEach((client) => (client.birthdate = formatDateBR(client.birthdate!)));
    this.dataSource.data = this.clientsData;
  }

  displayedColumns: string[] = ['name', 'email', 'cpf', 'birthdate', 'actions'];

  private async handleDialogAction(
    dialogRef: MatDialogRef<Dialog>,
    clientId: string,
    tableAction: TableAction
  ): Promise<void> {
    const result = await firstValueFrom(dialogRef.afterClosed());

    if (result === 'Confirm') {
      if (tableAction === TableAction.Delete) {
        this._clientService.deleteClient(clientId);
        this.clientsData = this._clientService.getAllClients();
        this.dataSource.data = this.clientsData;
        this._snackBarService.openSnackBar('Client deleted successfully');
      } else if (tableAction === TableAction.Update) {
        window.location.href = `/update/${clientId}`;
      }
    }
  }

  deleteClient(clientId: string): void {
    try {
      const client = this._clientService.getClientById(clientId);

      if (client) {
        client.birthdate = formatDateBR(client.birthdate!);
        const dialogRef = this._dialogService.open(
          clientId,
          ['Confirm', 'Cancel'],
          TableAction.Delete,
          client
        );
        this.handleDialogAction(dialogRef, clientId, TableAction.Delete);
      } else {
        this._snackBarService.openSnackBar('Client not found');
      }
    } catch (error) {
      this._snackBarService.openSnackBar('An error occurred while trying to delete the client');
      console.error('Error deleting client:', error);
    }
  }

  updateClient(clientId: string): void {
    try {
      const dialogRef = this._dialogService.open(
        clientId,
        ['Confirm', 'Cancel'],
        TableAction.Update
      );
      this.handleDialogAction(dialogRef, clientId, TableAction.Update);
    } catch (error) {
      this._snackBarService.openSnackBar('An error occurred while trying to update the client');
    }
  }
}
