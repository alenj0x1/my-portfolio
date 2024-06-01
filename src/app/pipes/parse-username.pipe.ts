import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseUsername',
  standalone: true
})
export class ParseUsernamePipe implements PipeTransform {

  transform(username: string): string {
    return "@" + username;
  }

}
