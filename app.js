//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
//# sourceMappingURL=underscore-min.map// Generated by CoffeeScript 1.8.0
(function() {
  var GameState, Strategy, ThreesState, ThreesState0, ThreesState1, ThreesState2, Value, addValues, bestAction, bestMove, canPushArrayIndex, count, currentTime, dirReverses, dirTransposes, dirs, doFor, heuristic, move, pushArray, rollOutEval, sample, strategy, sum, transform, uct, zipWith,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  sum = function(xs) {
    return _.reduce(xs, (function(a, b) {
      return a + b;
    }), 0);
  };

  zipWith = function() {
    var f, lists;
    f = arguments[0], lists = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return _.map(_.zip.apply(_, lists), f);
  };

  sample = function(weights) {
    var i, random, total, w, _i, _len;
    random = Math.random();
    total = 0;
    for (i = _i = 0, _len = weights.length; _i < _len; i = ++_i) {
      w = weights[i];
      total += w;
      if (random <= total) {
        return i;
      }
    }
  };

  count = function(x, xs) {
    return _.reduce(xs, (function(total, y) {
      if (y === x) {
        return total + 1;
      } else {
        return total;
      }
    }), 0);
  };

  currentTime = function() {
    return new Date().getTime();
  };

  doFor = function(t, f) {
    var start, _results;
    start = currentTime();
    _results = [];
    while (currentTime() - start < t) {
      _results.push(f());
    }
    return _results;
  };

  Value = (function() {
    function Value(wins, visits) {
      this.wins = wins;
      this.visits = visits != null ? visits : 1;
    }

    Value.prototype.winRatio = function(agent) {
      return this.wins[agent] / this.visits;
    };

    return Value;

  })();

  addValues = function() {
    var v1, v2, values;
    values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return new Value(zipWith.apply(null, [sum].concat(__slice.call((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v1 = values[_i];
        _results.push(v1.wins);
      }
      return _results;
    })()))), sum((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        v2 = values[_i];
        _results.push(v2.visits);
      }
      return _results;
    })()));
  };

  Strategy = (function() {
    function Strategy(heuristic, pick) {
      this.heuristic = heuristic;
      this.pick = pick;
    }

    Strategy.prototype.initNode = function(state) {
      return {
        state: state,
        value: this.heuristic(state),
        children: null
      };
    };

    Strategy.prototype.initChildren = function(node) {
      var nextStates, state, states, _ref, _ref1;
      nextStates = node.state.nextStates();
      if (node.state.isRandom) {
        _ref = _.zip.apply(_, nextStates), node.weights = _ref[0], states = _ref[1];
      } else {
        _ref1 = _.zip.apply(_, nextStates), node.actions = _ref1[0], states = _ref1[1];
      }
      return node.children = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = states.length; _i < _len; _i++) {
          state = states[_i];
          _results.push(this.initNode(state));
        }
        return _results;
      }).call(this);
    };

    Strategy.prototype.explore = function(node) {
      var child, index, state, value, values;
      state = node.state;
      if (state.terminal) {
        value = this.heuristic(state);
      } else if (node.children === null) {
        this.initChildren(node);
        values = (function() {
          var _i, _len, _ref, _results;
          _ref = node.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(child.value);
          }
          return _results;
        })();
        value = addValues.apply(null, (function() {
          var _i, _len, _ref, _results;
          _ref = node.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(child.value);
          }
          return _results;
        })());
      } else {
        if (state.isRandom) {
          index = sample(node.weights);
        } else {
          index = this.pick(node);
        }
        value = this.explore(node.children[index]);
      }
      node.value = addValues(node.value, value);
      return value;
    };

    return Strategy;

  })();

  rollOutEval = function(depth, state) {
    var states, weights, _ref;
    if (state.terminal || depth === 0) {
      return new Value(state.evaluate());
    }
    _ref = _.zip.apply(_, state.nextStates()), weights = _ref[0], states = _ref[1];
    if (state.isRandom) {
      return rollOutEval(depth - 1, states[sample(weights)]);
    } else {
      return rollOutEval(depth - 1, _.sample(states));
    }
  };

  uct = function(node) {
    var child, score, values;
    values = (function() {
      var _i, _len, _ref, _results;
      _ref = node.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.value);
      }
      return _results;
    })();
    score = function(index) {
      var value;
      value = node.children[index].value;
      return Math.sqrt(2 * Math.log(value.visits) / node.value.visits) + value.winRatio(node.state.agent);
    };
    return _.max(_.range(_.size(values)), score);
  };

  bestAction = function(node) {
    var agent, bestIndex, child, values;
    agent = node.state.agent;
    values = (function() {
      var _i, _len, _ref, _results;
      _ref = node.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.value);
      }
      return _results;
    })();
    bestIndex = _.max(_.range(_.size(values)), function(index) {
      return values[index].winRatio(agent);
    });
    return node.actions[bestIndex];
  };

  GameState = (function() {
    function GameState() {}

    GameState.prototype.isRandom = false;

    GameState.prototype.agent = null;

    GameState.prototype.terminal = true;

    GameState.prototype.nextStates = function() {
      return [];
    };

    return GameState;

  })();

  canPushArrayIndex = function(array, i) {
    switch (array[i]) {
      case -1:
        return false;
      case 0:
        return array[i - 1] !== 0;
      case 1:
        return array[i - 1] === 2;
      case 2:
        return array[i - 1] === 1;
      default:
        return array[i - 1] === array[i];
    }
  };

  pushArray = function(array) {
    var index;
    index = array.length;
    while (--index > 0) {
      if (canPushArrayIndex(array, index)) {
        array[index] += array[index - 1];
        while (--index > 0) {
          array[index] = array[index - 1];
        }
        array[0] = 0;
        return true;
      }
    }
    return false;
  };

  dirs = ["up", "down", "left", "right"];

  dirTransposes = {
    up: true,
    down: true
  };

  dirReverses = {
    up: true,
    left: true
  };

  transform = function(grid, dir) {
    var row, transformed, _i, _len;
    transformed = (function() {
      var _i, _len, _results;
      if (dirTransposes[dir]) {
        return _.zip.apply(_, grid);
      } else {
        _results = [];
        for (_i = 0, _len = grid.length; _i < _len; _i++) {
          row = grid[_i];
          _results.push(row.slice());
        }
        return _results;
      }
    })();
    if (dirReverses[dir]) {
      for (_i = 0, _len = transformed.length; _i < _len; _i++) {
        row = transformed[_i];
        row.reverse();
      }
    }
    return transformed;
  };

  move = function(grid, dir) {
    var free, i, row, transformed;
    transformed = transform(grid, dir);
    free = (function() {
      var _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = transformed.length; _i < _len; i = ++_i) {
        row = transformed[i];
        if (pushArray(row)) {
          _results.push(i);
        }
      }
      return _results;
    })();
    return [transformed, free];
  };

  ThreesState = (function(_super) {
    __extends(ThreesState, _super);

    function ThreesState(grid, depth) {
      this.grid = grid;
      this.depth = depth != null ? depth : 0;
    }

    ThreesState.prototype.gridSize = function() {
      var row;
      return sum((function() {
        var _i, _len, _ref, _results;
        _ref = this.grid;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          _results.push(row.length);
        }
        return _results;
      }).call(this));
    };

    ThreesState.prototype.numEmpty = function() {
      var row;
      return sum((function() {
        var _i, _len, _ref, _results;
        _ref = this.grid;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          _results.push(count(0, row));
        }
        return _results;
      }).call(this));
    };

    ThreesState.prototype.evaluate = function() {
      var depth, empty;
      empty = this.numEmpty() / this.gridSize();
      depth = this.depth / (this.depth + 5);
      return [empty + depth];
    };

    return ThreesState;

  })(GameState);

  ThreesState0 = (function(_super) {
    __extends(ThreesState0, _super);

    function ThreesState0(grid, next, depth) {
      var dir, nextStates, s;
      this.grid = grid;
      this.next = next;
      this.depth = depth != null ? depth : 0;
      nextStates = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = dirs.length; _i < _len; _i++) {
          dir = dirs[_i];
          _results.push([dir, this.move(dir)]);
        }
        return _results;
      }).call(this);
      nextStates = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = nextStates.length; _i < _len; _i++) {
          s = nextStates[_i];
          if (s[1] !== null) {
            _results.push(s);
          }
        }
        return _results;
      })();
      this.nextStates = function() {
        return nextStates;
      };
      this.terminal = nextStates.length === 0;
    }

    ThreesState0.prototype.agent = 0;

    ThreesState0.prototype.isRandom = false;

    ThreesState0.prototype.move = function(dir) {
      var free, transformed, _ref;
      _ref = move(this.grid, dir), transformed = _ref[0], free = _ref[1];
      if (free.length === 0) {
        return null;
      }
      return new ThreesState1(transformed, free, this.next, this.depth);
    };

    return ThreesState0;

  })(ThreesState);

  ThreesState1 = (function(_super) {
    __extends(ThreesState1, _super);

    function ThreesState1(grid, free, next, depth) {
      this.grid = grid;
      this.free = free;
      this.next = next;
      this.depth = depth;
    }

    ThreesState1.prototype.isRandom = true;

    ThreesState1.prototype.terminal = false;

    ThreesState1.prototype.spawn = function(index) {
      return new ThreesState2(this.grid, index, this.next, this.depth);
    };

    ThreesState1.prototype.nextStates = function() {
      var index, weight, _i, _len, _ref, _results;
      weight = 1.0 / this.free.length;
      _ref = this.free;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        index = _ref[_i];
        _results.push([weight, this.spawn(index)]);
      }
      return _results;
    };

    return ThreesState1;

  })(ThreesState);

  ThreesState2 = (function(_super) {
    __extends(ThreesState2, _super);

    function ThreesState2(grid, index, next, depth) {
      this.grid = grid;
      this.index = index;
      this.next = next;
      this.depth = depth;
    }

    ThreesState2.prototype.isRandom = true;

    ThreesState2.prototype.terminal = false;

    ThreesState2.prototype.spawn = function(val) {
      var grid, row;
      grid = this.grid.slice(0);
      row = grid[this.index].slice(0);
      row[0] = this.next;
      grid[this.index] = row;
      return new ThreesState0(grid, val, this.depth + 1);
    };

    ThreesState2.prototype.nextStates = function() {
      var val, vals, weight, _i, _len, _results;
      vals = [1, 2, 3];
      weight = 1 / vals.length;
      _results = [];
      for (_i = 0, _len = vals.length; _i < _len; _i++) {
        val = vals[_i];
        _results.push([weight, this.spawn(val)]);
      }
      return _results;
    };

    return ThreesState2;

  })(ThreesState);

  heuristic = function(state) {
    return rollOutEval(5, state);
  };

  strategy = new Strategy(heuristic, uct);

  bestMove = function(grid, next) {
    var initial, node, think;
    initial = new ThreesState0(grid, next);
    node = strategy.initNode(initial);
    think = function() {
      return strategy.explore(node);
    };
    doFor(1000, think);
    return bestAction(node);
  };

  window.threesbot = {};

  window.threesbot.bestMove = bestMove;

}).call(this);
var MoveEvaluator = function() {
  var that = {};

  var argmax = function(array) {
    var maxIndex = 0;
    var maxValue = array[0];
    
    for (var i = array.length; --i > 0;) {
      if (array[i] > maxValue) {
        maxIndex = i;
        maxValue = array[i];
      }
    }
    
    return maxIndex;
  };

  var canPushArrayIndex = function(array, i) {
    switch (array[i]) {
    case -1: return false;
    case 0: return array[i-1] !== 0;
    case 1: return array[i-1] === 2;
    case 2: return array[i-1] === 1;
    default: return array[i-1] === array[i];
    }
  };

  var canPushArray = function(array) {
    for (var i = array.length; --i > 0;) {
      if (canPushArrayIndex(array, i)) return true;
    }
    return false;
  };

  // tries to shift the array forwards
  // returns true if successful
  var pushArray = function(array) {
    var index = array.length;
    
    while(--index > 0) {
      if (canPushArrayIndex(array, index)) {
        array[index] += array[index-1];
        break;
      }
    }
    
    if (index === 0) return false;
    
    while (--index > 0) {
      array[index] = array[index-1];
    }
    array[0] = 0;
    
    return true;
  };

  var dirs = ["up", "down", "left", "right"];
  that.dirs = dirs;

  var gridSize = 4;
  var dirTransposes = {"up": true, "down": true};
  var dirReverses = {"up": true, "left":true};
  
  var transform = function(grid, direction) {
    var transformed = [];
    
    if (dirTransposes[direction]) {
      for (var i = 0; i < gridSize; ++i) {
        var row = [];
        for (var j = 0; j < gridSize; ++j) {
          row.push(grid[j][i]);
        }
        transformed.push(row);
      }
    } else {
      for (var i = gridSize; --i >= 0;) {
        transformed.push(grid[i].slice());
      }
    }
    
    if (dirReverses[direction]) {
      for (var i = gridSize; --i >= 0;) {
        transformed[i].reverse();
      }
    }
    
    return transformed;
  };

  that.canApplyMove = function(grid, direction) {
    var transformed = transform(grid, direction);

    for (var i = transformed.length; --i >= 0;) {
      if (canPushArray(transformed[i])) return true;
    }
    
    return false;
  };

  var partialApplyMove = function(grid, direction) {
    var transformed = transform(grid, direction);
    var free = [];
    
    for (var i = transformed.length; --i >= 0;) {
      if (pushArray(transformed[i])) {
        free.push(i);
      }
    }
    
    return [transformed, free];
  };

  var partialApplyMoves = function(grid) {
    return dirs.map(function(dir) { return partialApplyMove(grid, dir); });
  };

  var emptySquares = function(grid) {
    var empty = 0;
    for (var row = grid.length; --row >= 0;) {
      for (var col = grid[row].length; --col >= 0;) {
        if (grid[row][col] === 0) ++empty;
      }
    }
    return empty;
  };
  
  var scoreTile = function(tile) {
    switch (tile) {
    // case -1: case 0: return 0;
    case 1: case 2: return -1000;
    default: return tile * tile;
    }
  };
  
  var scorePair = function(tile1, tile2) {
    var small, large;
    
    if (tile1 <= tile2) {
      small = tile1;
      large = tile2;
    } else {
      small = tile2;
      large = tile1;
    }
    
    switch(small) {
    //case -1: case 0: return 0;
    case 1:
      if (large === 1) return -100;
      else if (large === 2) return 0;
      else return -large;
    case 2:
      if (large === 2) return -100;
      else if (large === 1) return 0;
      else return -large;
    default:
      return small - large;
    }
  };
  
  var scoreBoard = function(grid) {
    var score = 0;
    for (var row = gridSize; --row >= 0;) {
      for (var col = gridSize; --col >= 0;) {
        score += scoreTile(grid[row][col]);
      }
    }
    
    for (var i = gridSize; --i > 0;) {
      for (var j = gridSize; --j >= 0;) {
        score += scorePair(grid[i-1][j], grid[i][j]);
        score += scorePair(grid[j][i-1], grid[j][i]);
      }
    }

    return score;
  };

  
  // takes the avg over where the next tile goes
  var evaluatePartial = function(depth, count, partialGrid, next) {
    var grid = partialGrid[0];
    var free = partialGrid[1];
    
    if (free.length === 0) return -100000;
    
    ++count[0];

    if (depth === searchDepth) return scoreBoard(grid);
    ++depth;
    
    // possible next tiles
    var tiles = depth > 0 ? [-1] : [-1, 1, 2];
    
    var avg = 0;
    
    for (var i = free.length; --i >= 0;) {
      grid[free[i]][0] = next;
      for (var j = tiles.length; --j >= 0;) {
        avg += evaluateMove(depth, count, grid, tiles[j])[1];
      }
      grid[free[i]][0] = 0;
    }
    
    return avg / (free.length * tiles.length);
  };

  // gets the best move given the next tile
  var evaluateMove = function(depth, count, grid, next) {
    ++count[0];
    var partialGrids = partialApplyMoves(grid);

    // console.log('evaluateMove: depth = ' + depth);
    
    var scores = partialGrids.map(function(partialGrid) {
      return 1 + evaluatePartial(depth, count, partialGrid, next);
    });
    
    var maxIndex = argmax(scores);
    
    // console.log(scores.toString());
    
    return [dirs[maxIndex], scores[maxIndex]];
  };
  
  var searchDepth;
  
  that.bestMove = function(grid, next) {
    searchDepth = 0;
    var count = [0];
    var bestDir;
    while (count[0] < 10000) {
      ++searchDepth;
      var prev = count[0];
      count[0] = 0;
      bestDir = evaluateMove(0, count, grid, next)[0];
      if (count[0] === prev) {
        console.log("Dead end :(");
        break;
      }
    }
    
    console.log(searchDepth);
    
    return bestDir;
  };
  
  return that;
};
var stringifyBoard = function(board) {
  var b = "[ ";
  for(var i=0; i<board.length; i++) {
    var row = "[ ";
    for(var j=0; j<board[i].length; j++) {
      row += (board[i][j] + ", ");
    }
    row += " ],\n";
    b += row;
  }
  return b;
};

var Controller = function() {
  var that = {};
  var moveEvaluator = MoveEvaluator();
  var playInterval = null; // for setInterval purposes

  // move counter
  var moveCounter = 0;

  // move delay, in ms
  var moveDelay = 200;

  // whether to run choppily/quickly or smoothly
  var choppy = false;

  // whether to cheat and use the list of next tiles
  // not yet implemented
  that.useNextTileList = false;

  var readGameState = function() {
    return { board: Session.get("tiles"),
        nextTile: Session.get("next_tile"),
        nextTileList: Session.get("current_deck") };
  };

  var keyCodes = {left: 37, up: 38, right: 39, down: 40};
  var inputMove = function(move) {
    var evt = jQuery.Event("keydown");
    evt.keyCode = evt.which = keyCodes[move];
    $(window).trigger(evt);
    return move;
  };

  that.redrawBoard = function() {
    // directly render; who needs animations
    // looks horrible though :(
    $(".board>.tile").remove();
    document.THREE.display.render_board();
  };

  that.move = function() {
    moveCounter++;

    var gameState = readGameState();
    //var nextMove = moveEvaluator.bestMove(gameState.board, gameState.nextTile);
    var nextMove = threesbot.bestMove(gameState.board, gameState.nextTile);
    var canMove = moveEvaluator.canApplyMove(gameState.board, nextMove);
    //console.log(nextMove + " : canApplyMove = " + canMove);
    //console.log(stringifyBoard(gameState.board));

    if(!canMove) {
      // in order to check we can't move in any direction
      var canMoveDirs = 4;
      console.log(stringifyBoard(gameState.board));
      for(var i=0; i<4; i++) {
        var canMoveThisDir = moveEvaluator.canApplyMove(gameState.board, moveEvaluator.dirs[i]);
        if(!canMoveThisDir) {
          canMoveDirs--;
        }
        console.log(moveEvaluator.dirs[i] + " : " + canMoveThisDir);
      }

      // if no moves, stop (should be game over)
      if(canMoveDirs === 0) {
        that.stop();
      }
    }

    inputMove(nextMove);

    if(choppy) {
      that.redrawBoard();
    }

    return nextMove;
  };

  that.play = function() {
    $("#playButton").attr("value", "Stop").click(controller.stop);
    if(playInterval === null) {
      if(choppy) { 
        //console.log("playing choppy");
        playInterval = setInterval(that.move, moveDelay);
      } else {
        playInterval = setInterval(function() {
          //console.log("playing smooth");
          if(!$(".board>.tile").is(":animated")) {
            that.move();
          }
        }, moveDelay);
      }
    }
  };

  that.stop = function() {
    moveCounter = 0;
    that.redrawBoard();

    $("#playButton").attr("value", "Play").click(controller.play);
    if(playInterval !== null) {
      clearInterval(playInterval);
      playInterval = null;
    }
  };

  that.setChoppy = function(newChoppy) {
    that.stop();
    choppy = newChoppy;
  };


  return that;
};

var drawUI = function() {
  controller = Controller();
  var $playButton = $("<input type='button' id='playButton' value='Play'/>");
  $playButton.click(controller.play);

  $("#new-game").after($playButton);
};

drawUI();
