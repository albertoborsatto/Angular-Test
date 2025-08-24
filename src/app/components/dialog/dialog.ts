import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Client } from '../../models/client';
import { MatButtonModule } from '@angular/material/button';
import { TableAction } from '../../enums/table-action';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  TableAction = TableAction;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private _data: { id: string; client?: Client; actions: string[]; tableAction: TableAction }
  ) {}

  get id(): string {
    return this._data.id;
  }

  get client(): Client | undefined {
    return this._data.client;
  }

  get actions(): string[] {
    return this._data.actions;
  }

  get tableAction(): TableAction {
    return this._data.tableAction;
  }
}
