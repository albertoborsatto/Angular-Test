import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string = 'Close'): void {
    this._snackBar.open(message, action);
  }
}
