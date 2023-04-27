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
  pokemonHover: boolean = false; // Add this property
  itemsPerPage: number = 20; // set items per page to 20
  visiblePokemon: any[] = [];

  constructor(
    private dataService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  uniqueNames = new Set();
  getPokemon() {
    this.dataService.getPokemon(151, 0)
      .subscribe((response: any) => {
        this.totalPokemon = response.count;
        response.results.forEach((result: any) => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqueResponse: any) => {
              this.pokemon.push(uniqueResponse);
              this.updateVisiblePokemon();
            });
        });
      });
  }
  updateVisiblePokemon() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visiblePokemon = this.pokemon.slice(startIndex, endIndex);
  }

  
  onPageChanged(event: any): void {
    console.log('Page changed:', event);
    this.page = event.page;
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log('Visible Pokemon:', this.pokemon.slice(startIndex, endIndex));
    this.visiblePokemon = this.pokemon.slice(startIndex, endIndex);
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