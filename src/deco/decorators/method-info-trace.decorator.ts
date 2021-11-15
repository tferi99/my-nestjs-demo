export function MethodInfoTrace() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('- METHOD');
    console.log('    - target:', target);
    console.log('    - propertyKey:', propertyKey);
    console.log('    - descriptor:', descriptor);
  };
}
