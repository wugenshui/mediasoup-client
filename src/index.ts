import { Device, detectDevice } from './Device';
import * as types from './types';


(window as any).Device=Device;
(window as any).types=types;
(window as any).detectDevice=detectDevice;


/**
 * Expose all types.
 */
export { types };

/**
 * Expose mediasoup-client version.
 */
export const version = '__MEDIASOUP_CLIENT_VERSION__';

/**
 * Expose Device class and detectDevice() helper.
 */
export { Device, detectDevice };

/**
 * Expose parseScalabilityMode() function.
 */
export { parse as parseScalabilityMode } from './scalabilityModes';
