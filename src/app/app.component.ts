import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListpagenewsComponent } from "./listpagenews/listpagenews.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListpagenewsComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'news';
}
