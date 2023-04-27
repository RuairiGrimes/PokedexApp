import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PokemonDetailsComponent>) { }

  ngOnInit(): void {
    this.pokemon = this.data; // <-- make sure this is receiving the pokemon object
  }
  close(): void {
    this.dialogRef.close();
  }
}