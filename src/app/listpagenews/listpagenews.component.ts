import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NewsService } from '../news.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../search.pipe';
import { News } from '../model/interface/news.model';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-listpagenews',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchPipe, RouterLink, RouterOutlet,NgxSpinnerModule
    
  ],
  templateUrl: './listpagenews.component.html',
  styleUrl: './listpagenews.component.css',
})
export class ListpagenewsComponent implements OnInit {
  countries = [
    'India',
    'USA',
    'UK',
    'France',
    'Germany',
    'Italy',
    'Spain',
    'Portugal',
  ];

  selectedCountry: string = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  topHeadlinesData: News[] = [];
  filteredHeadlinesData: News[] = [];
  errorMessage: string = '';

  searchText: string = '';
  constructor(private newsService: NewsService, private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.Getdata();
    this.applyFilters();
  
  }

  Getdata(): void {
    this.spinner.show(); // Show loader when data is being fetched
    this.newsService.getTopHeadlines().subscribe({
      next: (data) => {
        this.topHeadlinesData = data.articles;
        this.assignCountriesToData();
        this.applyFilters();
        this.spinner.hide(); // Hide loader when data is fetched
      },
      error: (error) => {
        console.error('Error occurred:', error);
        this.errorMessage = 'Failed to load news. Please try again later.';
        this.spinner.hide(); // Hide loader on error
      }
    });
  }
  // FilterCountry(): void {
  //   if (this.selectedCountry) {
  //     this.filteredHeadlinesData = this.topHeadlinesData.filter(
  //       (item) =>
  //         item.country?.toLowerCase() === this.selectedCountry.toLowerCase()
  //     );
  //   } else {
  //     this.filteredHeadlinesData = [...this.topHeadlinesData];
  //   }
  // }

  // applyFilters(): void {
  //  this.FilterCountry();
  //   // Ensure date strings are parsed correctly
  //   const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
  //   const toDate = this.dateTo ? new Date(this.dateTo) : null;

  //   this.filteredHeadlinesData = this.topHeadlinesData.filter((item) => {
  //     const publishedDate = new Date(item.publishedAt);
  //     console.log(item.publishedAt, 'RK  Date Coming or not Checking');
  //     console.log(
  //       'From Date:',
  //       fromDate,
  //       'To Date:',
  //       toDate,
  //       'Published Date:',
  //       publishedDate
  //     );
  //     // Normalize the comparison by setting time to midnight
  //     if (fromDate) fromDate.setHours(0, 0, 0, 0);
  //     if (toDate) toDate.setHours(23, 59, 59, 999);
  //     publishedDate.setHours(0, 0, 0, 0);

  //     const isDateInRange =
  //       (!fromDate || publishedDate >= fromDate) &&
  //       (!toDate || publishedDate <= toDate);

  //     return isDateInRange;
  //   });
  //   console.log(this.filteredHeadlinesData, 'Filtered Data RK');
  // }

  assignCountriesToData(): void {
    // Assuming each item corresponds to a country by index
    this.topHeadlinesData.forEach((item, index) => {
      item.country = this.getCountry(index); // Add country to each item
    });
  }
  getCountry(index: number): string {
    return this.countries[index % this.countries.length];
  }

 

  // resetFilters(): void {
  //   this.dateFrom = null;
  //   this.dateTo = null;
  //   this.selectedCountry = '';
  //   this.applyFilters(); // Reapply filters to show all data
  // }
 

  NewsNavigate(data: any): void {
    this.router.navigate(['/news'], { state: { newsData: data } });
    console.log(data, 'RKKKK');
  }



  applyFilters(): void {
    // Ensure date strings are parsed correctly
    const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
    const toDate = this.dateTo ? new Date(this.dateTo) : null;

    // Normalize the date range by setting time to the start or end of the day
    if (fromDate) fromDate.setHours(0, 0, 0, 0);
    if (toDate) toDate.setHours(23, 59, 59, 999);

    this.filteredHeadlinesData = this.topHeadlinesData.filter((item) => {
        const publishedDate = new Date(item.publishedAt);
        publishedDate.setHours(0, 0, 0, 0);  // Set published date to midnight for comparison

        const isDateInRange =
            (!fromDate || publishedDate >= fromDate) &&
            (!toDate || publishedDate <= toDate);

        const isCountryMatch =
            !this.selectedCountry ||
            item.country?.toLowerCase() === this.selectedCountry.toLowerCase();

        // Return true if both conditions are met
        return isDateInRange && isCountryMatch;
    });

    console.log(this.filteredHeadlinesData, 'Filtered Data RK');
}

resetFilters(): void {
    this.dateFrom = null;
    this.dateTo = null;
    this.selectedCountry = '';
    this.filteredHeadlinesData = [...this.topHeadlinesData];  // Reset to initial data
}

}
