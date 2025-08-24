import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-input',
  imports: [MatButtonModule, MatInputModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInput),
      multi: true,
    },
  ],
})
export class SearchInput implements ControlValueAccessor {
  private _searchValue: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this._searchValue = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChangeValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._searchValue = input.value;
    this.onChange(this._searchValue);
  }

  get search(): string {
    return this._searchValue;
  }
}
