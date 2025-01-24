import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(data:any[] , searchKey:string): any[] {
    return data.filter( (current)=>{if(current.title){
      return current.title.toLowerCase().includes(searchKey.toLowerCase()) }

    else if(current.name){
      return current.name.toLowerCase().includes(searchKey.toLowerCase())}  }  
    );}

}
