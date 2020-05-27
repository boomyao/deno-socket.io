/**
 * Module dependencies.
 */

import * as http from "https://deno.land/std/http/mod.ts"
import Server from "./server.js"
import _Transport from './transport.js'
import * as _Transports from './transports/index.js'
import * as _parser from '../socket.io-parser/mod.js'
import _Socket from './socket.js'

export const Transport = _Transport
export const Socket = _Socket
export const Transports = _Transports
export const parser = _parser

export default function() {
  // backwards compatible use as `.attach`
  // if first argument is an http server
  if (arguments.length && arguments[0] instanceof http.Server) {
    return attach.apply(this, arguments);
  }

  // if first argument is not an http server, then just make a regular eio server
  return new Server(arguments);
};

/**
 * Protocol revision number.
 *
 * @api public
 */

export const protocol = 1;

/**
 * Creates an http.Server exclusively used for WS upgrades.
 *
 * @param {Number} port
 * @param {Function} callback
 * @param {Object} options
 * @return {Server} websocket.io server
 * @api public
 */

export function listen(port, options, fn) {
  if ("function" === typeof options) {
    fn = options;
    options = {};
  }

  const server = http.createServer(function(req, res) {
    res.writeHead(501);
    res.end("Not Implemented");
  });

  // create engine server
  const engine = attach(server, options);
  engine.httpServer = server;

  server.listen(port, fn);

  return engine;
}

/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @return {Server} engine server
 * @api public
 */

export function attach(server, options) {
  const engine = new Server(options);
  engine.attach(server, options);
  return engine;
}
