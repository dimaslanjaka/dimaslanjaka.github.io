declare module 'connect-browser-sync' {
  import bs from 'browser-sync';
	import express from 'express';
  interface ConnectBrowserSyncOptions {
    injectHead: true;
  }
  export default function injectBrowserSync(
    browserSync: bs.BrowserSyncInstance,
    options?: ConnectBrowserSyncOptions
  ): any | express.RequestHandler;
}
