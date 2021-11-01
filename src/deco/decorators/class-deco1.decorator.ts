import { DECO_PREFIX } from './prefix';

export function ClassDeco1() {
  console.log(DECO_PREFIX + 'TestDeco1: factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(DECO_PREFIX + 'TestDeco1: called', target, propertyKey, descriptor);
  };
}
