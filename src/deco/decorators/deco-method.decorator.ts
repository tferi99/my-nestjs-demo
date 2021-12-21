/**
 * For demonstrating changing behavior of methods.
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT NOTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * If you change the behavior of a method then metadata maybe cannot be accessed later
 * from consumers (e.g. from guards).
 *
 * You can use such decorators only on the last position !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export function DecoMethod(label: string): any {
  const prefix = `@DecoMethod[${label}]`;
  console.log(prefix + ' factory');

  const factory = (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const childFunction = descriptor.value;
    descriptor.value = (...args: any[]) => {
      console.log(prefix + ' ==> ' + childFunction.name + '(' + args + ')');
      return childFunction.apply(this, args);
    };
    return descriptor;
  }
  return factory;
}
