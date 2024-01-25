import { boot } from 'quasar/wrappers';
import { BootFileParams } from '@quasar/app-vite';

export default boot(async (ctx: BootFileParams<void>) => {
  /**
   * Dynamically import all boot scripts from features and return a flat list.
   * To add a boot script to your feature, create a `boot.ts` file and `export default myFunction;`.
   */
  const modules = import.meta.glob('../features/**/boot.ts');
  for (const module of Object.values(modules)) {
    const bootFunction = (await module()).default;
    await Promise.resolve(bootFunction(ctx));
  }
});
