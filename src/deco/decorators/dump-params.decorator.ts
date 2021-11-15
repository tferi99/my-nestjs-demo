/**
 * Decorator without factory to dump all parameters.
 *
 * @param args
 * @constructor
 */
export function DumpDecoratorParams(...args): any {
  console.log('===========');
  console.log(`@DumpDecoratorParams(args: ${args.length}):`)
  let idx = 0;
  args.forEach((arg: any) => {
    console.log(`    - [${idx}]`, arg);
    idx++;
  });
  console.log('-----------');
}
