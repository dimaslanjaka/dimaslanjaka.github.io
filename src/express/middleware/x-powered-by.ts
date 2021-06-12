/******************************************************************************
 * Copyright (c) 2016 Nicola Del Gobbo
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 * WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing permissions
 * and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 * Antonio D'Angelo <tonydangelo123@gmail.com>
 *****************************************************************************/

"use strict";

/**
 * @description Add the `X-Powered-By` header on the response
 * @see {@link https://github.com/NickNaso/response-powered-by/blob/master/lib/response-powered-by.js}
 * @return {Function}
 * @version 1.0.3
 * @author Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 * @param powered
 */
export default function (powered) {
  return function (req, res, next) {
    next = next || noop;
    if (powered && typeof powered === "string") {
      res.setHeader("X-Powered-By", powered);
    } else {
      res.removeHeader("X-Powered-By");
    }
    next();
  };
}

function noop() {}
