import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;
global.Buffer = Buffer;
globalThis.Buffer = Buffer;

declare global {
    interface Window {
      Buffer: typeof Buffer;
      process: typeof process;
    }
  }