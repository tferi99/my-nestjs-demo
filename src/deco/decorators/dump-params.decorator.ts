/**
 * Decorator without factory to dump all parameters.
 *
 * @param args
 * @constructor
 */
export function DumpDecoratorParams(label?: string): any {
  return (...args) => {
    console.log('=========== ' + label + ' ===========');
    console.log(`@DumpDecoratorParams(args: ${args.length}):`);
    let idx = 0;
    args.forEach((arg: any) => {
      console.log(`    - [${idx}]`, arg);
      idx++;
    });
    console.log('----------------------');
  }
}
