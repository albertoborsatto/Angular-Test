import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../components/dialog/dialog';
import { Client } from '../models/client';
import { TableAction } from '../enums/table-action';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _dialog: MatDialog;

  constructor(dialog: MatDialog) {
    this._dialog = dialog;
  }

  open(id: string, actions: string[], tableAction: TableAction, client?: Client): MatDialogRef<Dialog> {
    return this._dialog.open(Dialog, {
      data: { id, client, actions, tableAction },
    });
  }
}
