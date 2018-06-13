import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'noSanitize'
})
export class NoSanitizePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }
  transform(stars: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(stars);
  }

}
