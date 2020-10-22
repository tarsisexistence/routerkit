const pluginName = 'webpackPlugin';

export class WebpackPlugin {
  constructor() {}

  public apply(compiler: any): void {
    compiler.hooks.run.tap(pluginName, () => {
      console.log('The webpack build process is starting!!!');
    });
  }
}
