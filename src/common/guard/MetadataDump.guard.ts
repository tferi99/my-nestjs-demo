import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { ENABLE_GUARD_CONFIGS_KEY, GuardConfig } from '../../grd/decorators/enable-guard.decorator';

@Injectable()
export class MetadataDumpGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const clazz = ctx.getClass();
    const handler = ctx.getHandler();
    console.log(`=== MetadataDumpGuard: ${clazz.name}.${handler.name}() ===`);

    // class
    console.log('Class:');
    const classKeys = Reflect.getMetadataKeys(clazz);
    classKeys.forEach((key) => console.log('  - [' + key + ']: ' + Reflect.getMetadata(key, clazz)));

    // method
    console.log('Method:');
    const methodKeys = Reflect.getMetadataKeys(handler);
    methodKeys.forEach((key) => {
      if (!this.handleBuiltInMetadata(key, handler)) {
        this.printMetadata(key, Reflect.getMetadata(key, handler));
      }
    });

    console.log('--------------------------------------');
    return true;
  }

  handleBuiltInMetadata(key: any, target: any): boolean {
    if (key === GUARDS_METADATA) {
      this.printGuardsMetadata(key, target);
      return true;
    }
    if (key == ENABLE_GUARD_CONFIGS_KEY) {
      this.printEnableGuardMetadata(key, target);
      return true;
    }
    return false;
  }

  private printMetadata(key: any, value: any) {
    console.log('  - [' + key + ']: ' + value);
  }

  private printGuardsMetadata(key: any, target: any): void {
    const guards = Reflect.getMetadata(key, target);
    let val = 'Guards[';
    let first = true;
    guards.forEach((guard) => {
      val += first ? guard.name : ', ' + guard.name;
      first = false;
    });
    val += ']';
    this.printMetadata(key, val);
  }

  private printEnableGuardMetadata(key: any, target: any) {
    const data: Map<string, GuardConfig> = Reflect.getMetadata(key, target);
    this.printMetadata(key, '...');
    console.log('    ...', data);
  }
}
