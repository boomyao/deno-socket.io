import XHR from "./polling.js"
import JSONP from "./polling-jsonp.js"
import websocket from './websocket.js'

/**
 * Export transports.
 */

export default {
  polling: polling,
  websocket
};

/**
 * Export upgrades map.
 */


/**
 * Polling polymorphic constructor.
 *
 * @api private
 */

export function polling(req) {
  if ("string" === typeof req._query.j) {
    return new JSONP(req);
  } else {
    return new XHR(req);
  }
}

polling.upgradesTo = ["websocket"];
