import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileToURL',
})
export class FileToURLPipe implements PipeTransform {
  transform(file: File): string {
    return URL.createObjectURL(file);
  }
}
