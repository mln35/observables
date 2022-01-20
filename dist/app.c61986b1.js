// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Classes/observable.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = void 0;

var Transaction =
/** @class */
function () {
  function Transaction() {
    var _this = this;

    this.observers = [];
    this.transactionList = [];
    this.btn = document.querySelector('#valid');
    this.fullNameInput = document.querySelector('#fullname');
    this.typeInput = document.querySelector('#type');
    this.montantInput = document.querySelector('#montant');
    this.motifInput = document.querySelector('#motif');
    this.btn.addEventListener('click', function (e) {
      console.log(_this.fullNameInput.value);

      _this.transactionList.push({
        nom: _this.fullNameInput.value,
        type: _this.typeInput.value,
        montant: +_this.montantInput.value,
        motif: _this.motifInput.value
      });

      console.log(_this.transactionList);

      _this.notifyObserver();
    });
  }

  Transaction.prototype.subscribe = function (observer) {
    this.observers.push(observer);
    this.notifyObserver();
  };

  Transaction.prototype.unsubscribe = function (observer) {
    this.observers = this.observers.filter(function (obs) {
      return obs !== observer;
    });
    console.log("Unsubscribe--Observers Array", this.observers);
  };

  Transaction.prototype.notifyObserver = function () {
    var _this = this;

    this.observers.forEach(function (element) {
      element.update(_this.transactionList);
    });
  };

  return Transaction;
}();

exports.Transaction = Transaction;
},{}],"Classes/observer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = exports.NbTransactions = exports.Solde = void 0; //class solde implementation

var Solde =
/** @class */
function () {
  function Solde(solde, view) {
    this.solde = solde;
    this.view = view;
    this.render();
  }

  Solde.prototype.update = function (data) {
    console.log('update', data);
    var totalDebit = 0;
    var totalCredit = 0;
    data.forEach(function (obj) {
      if (obj.type === 'Debit') {
        totalDebit += obj.montant;
        console.log('tDeb', totalDebit);
      }

      if (obj.type === 'Credit') {
        totalCredit += obj.montant;
        console.log('tCred', totalCredit);
      }
    });
    this.solde = totalCredit - totalDebit;
    console.log('solde', this.solde);
    this.render();
  };

  Solde.prototype.render = function () {
    this.view.renderSolde(this.solde);
  };

  return Solde;
}();

exports.Solde = Solde;

var NbTransactions =
/** @class */
function () {
  function NbTransactions(nb, view) {
    this.nb = nb;
    this.view = view;
    this.totalDebit = 0;
    this.totalCredit = 0;
    this.render();
  }

  NbTransactions.prototype.update = function (data) {
    var _this = this;

    this.totalDebit = 0;
    this.totalCredit = 0;
    console.log('update', data);
    data.forEach(function (obj) {
      if (obj.type === 'Debit') {
        _this.totalDebit += obj.montant;
        console.log('tDeb', _this.totalDebit);
      }

      if (obj.type === 'Credit') {
        _this.totalCredit += obj.montant;
        console.log('tCred', _this.totalCredit);
      }
    });
    this.render();
  };

  NbTransactions.prototype.render = function () {
    this.view.renderNbTrans(this.totalDebit, this.totalCredit);
  };

  return NbTransactions;
}();

exports.NbTransactions = NbTransactions;

var State =
/** @class */
function () {
  function State(nb, view) {
    this.nb = nb;
    this.view = view;
    this.totalDebit = 0;
    this.totalCredit = 0;
    this.render();
  }

  State.prototype.update = function (data) {
    var _this = this;

    this.totalDebit = 0;
    this.totalCredit = 0;
    console.log('update', data);
    data.forEach(function (obj) {
      if (obj.type === 'Debit') {
        _this.totalDebit += obj.montant;
        console.log('tDeb', _this.totalDebit);
      }

      if (obj.type === 'Credit') {
        _this.totalCredit += obj.montant;
        console.log('tCred', _this.totalCredit);
      }
    });
    this.render();
  };

  State.prototype.render = function () {
    var state = this.totalCredit < this.totalDebit ? 'Debiteur' : 'Crediteur';
    this.view.renderState(state);
  };

  return State;
}();

exports.State = State;
},{}],"view/viewHandler.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var View =
/** @class */
function () {
  function View() {
    this.soldeValue = document.querySelector('#solde-value');
  }

  View.prototype.renderSolde = function (solde) {
    this.soldeValue.innerHTML = solde.toString();
  };

  View.prototype.renderNbTrans = function (totalDebit, totalCredit) {
    document.querySelector('#totalDebit').innerHTML = totalDebit.toString();
    document.querySelector('#totalCredit').innerHTML = totalCredit.toString();
  };

  View.prototype.renderState = function (state) {
    var divClass = state === 'Debiteur' ? 'debiteur' : 'crediteur';
    document.querySelector('#state-text').className = divClass;
    document.querySelector('#state-text').innerHTML = state;
  };

  View.prototype.renderList = function (data) {//TODO 
    // implement list rendering
  };

  return View;
}();

exports.View = View;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var observable_1 = require("./Classes/observable");

var observer_1 = require("./Classes/observer");

var viewHandler_1 = require("./view/viewHandler"); // const controller = new Controller();


var transaction = new observable_1.Transaction();
var solde = new observer_1.Solde(0, new viewHandler_1.View());
transaction.subscribe(solde);
var nbTrans = new observer_1.NbTransactions(0, new viewHandler_1.View());
transaction.subscribe(nbTrans);
var state = new observer_1.State(0, new viewHandler_1.View());
transaction.subscribe(state);
},{"./Classes/observable":"Classes/observable.ts","./Classes/observer":"Classes/observer.ts","./view/viewHandler":"view/viewHandler.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36811" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map