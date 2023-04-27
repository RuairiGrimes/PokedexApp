import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemon: any[] = [];
  page = 1;
  totalPokemon?: number;
  dialogOpen = false;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  // Get Pokemon
  getPokemon() {
    this.dataService.getPokemon(12, this.page + 0)
    .subscribe((response: any) => {
      this.totalPokemon = response.count;

      response.results.forEach((result: any) => {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqueResponse: any) => {
          this.pokemon.push(uniqueResponse);
        });
      });
    });
  }

  // Open dialog
  openDialog(pokemon: any) {
    this.dialogOpen = true;
    const dialogRef = this.dialog.open(PokemonDetailsComponent, {
      data: pokemon
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
    });
  }

}