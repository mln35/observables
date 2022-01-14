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
exports.Humidity = void 0;

var Humidity =
/** @class */
function () {
  function Humidity(humidity) {
    var _this = this;

    this.humidity = humidity;
    this.observers = [];
    this.controller = document.querySelector('#humidity-control');
    this.controller.value = this.humidity.toString();
    this.controller.addEventListener('change', function (e) {
      _this.setHumidity(+_this.controller.value);
    });
  }

  Humidity.prototype.subscribe = function (observer) {
    this.observers.push(observer);
    this.notifyObserver();
  };

  Humidity.prototype.unsubscribe = function (observer) {
    this.observers = this.observers.filter(function (obs) {
      return obs !== observer;
    });
    console.log("Unsubscribe--Observers Array", this.observers);
  };

  Humidity.prototype.notifyObserver = function () {
    var _this = this;

    this.observers.forEach(function (element) {
      console.log("this.humidity: ".concat(_this.humidity));
      element.update(_this.humidity);
    });
  };

  Humidity.prototype.setHumidity = function (value) {
    this.humidity = value;
    this.notifyObserver();
  };

  Humidity.prototype.testFunction = function (f, g) {
    f();
    g();
  };

  return Humidity;
}();

exports.Humidity = Humidity;
},{}],"Classes/observer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vanne = void 0;

var Vanne =
/** @class */
function () {
  function Vanne(name, seuil, Observable) {
    var _this = this;

    this.name = name;
    this.seuil = seuil;
    this.Observable = Observable;
    this.div = document.createElement('div');
    this.state = true;
    this.Observable.subscribe(this);
    console.log("this.data: ".concat(this.data));
    this.state = true;
    var container = document.querySelector("#pompe-container"); //div_id=pompe
    // this.div.className="off";

    this.div.id = this.name; //input

    var input = document.createElement('input');
    input.className = "seuil";
    input.type = "number";
    input.value = this.seuil.toString();
    input.addEventListener('change', function (e) {
      _this.setSeuil(+input.value);
    }); //title h4

    var title = document.createElement('h4');
    title.innerHTML = this.name; //button

    var button = document.createElement('button');
    button.innerHTML = "Unsubscribe";
    button.addEventListener('click', function (e) {
      if (button.innerHTML === "Unsubscribe") {
        button.innerHTML = "Subscribe";

        _this.Observable.unsubscribe(_this);

        _this.state = false;
        _this.div.className = "unsubs";
      } else {
        button.innerHTML = "Unsubscribe";

        _this.Observable.subscribe(_this);

        _this.state = true;

        _this.update(_this.data);
      }
    }); //add element in the div

    this.div.appendChild(input);
    this.div.appendChild(title);
    this.div.appendChild(button);
    container.appendChild(this.div);
  }

  Vanne.prototype.update = function (data) {
    console.log("this.state:".concat(this.state));

    if (this.state) {
      this.data = data;
      console.log("this.seuil: ".concat(this.seuil, " ").concat(this.data));

      if (this.data < this.seuil) {
        console.log("if(this.data < this.seuil) ");
        this.div.className = "on";
      } else {
        this.div.className = "off";
      }
    }
  };

  Vanne.prototype.setSeuil = function (value) {
    this.seuil = value;
    this.update(this.data);
  };

  return Vanne;
}();

exports.Vanne = Vanne;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var observable_1 = require("./Classes/observable");

var observer_1 = require("./Classes/observer");

var f = function f() {
  console.log("Function1 passed in arg");
};

var g = function g() {
  console.log("Function2 passed in arg");
};

var counter = 1;
var humiditySensor = new observable_1.Humidity(21);
var Add = document.querySelector("#add");
Add.addEventListener('click', function (e) {
  var vanne = new observer_1.Vanne("vanne".concat(counter), 30, humiditySensor);
  counter++;
}); // const vanne1=new Vanne("vanne1", 35, humiditySensor);
// const vanne2=new Vanne("vanne2", 20, humiditySensor);
// const vanne3=new Vanne("vanne3", 10, humiditySensor);
// humiditySensor.subscribe(vanne1);
// humiditySensor.subscribe(vanne2);
// humiditySensor.subscribe(vanne3);

humiditySensor.testFunction(f, g); // humiditySensor.setHumidity(20);
},{"./Classes/observable":"Classes/observable.ts","./Classes/observer":"Classes/observer.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49680" + '/');

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