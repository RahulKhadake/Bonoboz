import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const title = item.title ? item.title.toLowerCase() : '';
      const author = item.author ? item.author.toLowerCase() : '';
      const description = item.description ? item.description.toLowerCase() : '';
      const publishedAt = item.publishedAt ? item.publishedAt.toLowerCase() : '';

      return title.includes(searchText) || 
             author.includes(searchText) || 
             description.includes(searchText) ||
             publishedAt.includes(searchText);
    });
  }

}
