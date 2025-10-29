import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'awsvspipe'
})
export class AwsvsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
         return value.replace('/axapi/v3/slb/virtual-server/', '');
  }

}
