import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css',
})
export class NewsDetailsComponent implements OnInit {
  newsItem: any;
  errorMessage: any;

  newsData: any;

  constructor(private router: Router) {
    // Access the passed data via router's state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.newsData = navigation.extras.state['newsData'];
      console.log('DATTTA', this.newsData);
    }
  }

  ngOnInit(): void {
    // Use this.newsData to display the news details
  }
  NewsList() {
    this.router.navigate(['/List']);
  }
}
