/**
 * For demonstrating changing behavior of methods.
 *
 */
export function DecoMethod(label: string): any {
  const prefix = `@DecoMethod[${label}]`;
  console.log(prefix + ' factory');

  const factory = (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const childFunction = descriptor.value;
    descriptor.value = (...args: any[]) => {
      console.log(prefix + ' child function')
      return childFunction.apply(this, args);
    };
    return descriptor;
  }
  return factory;
}
