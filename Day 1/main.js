var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
function solve() {
    return __awaiter(this, void 0, void 0, function () {
        var open;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    open = require('node:fs/promises').open;
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var file, total, _a, _b, _c, line, right, left, i, i, e_1_1;
                            var _d, e_1, _e, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0: return [4 /*yield*/, open('./input.txt')];
                                    case 1:
                                        file = _g.sent();
                                        total = 0;
                                        _g.label = 2;
                                    case 2:
                                        _g.trys.push([2, 7, 8, 13]);
                                        _a = true, _b = __asyncValues(file.readLines());
                                        _g.label = 3;
                                    case 3: return [4 /*yield*/, _b.next()];
                                    case 4:
                                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                                        _f = _c.value;
                                        _a = false;
                                        line = _f;
                                        right = '';
                                        left = '';
                                        for (i = 0; i < line.length && left === ''; ++i) {
                                            if (line[i] >= '0' && line[i] <= '9') {
                                                left = line[i];
                                            }
                                            else {
                                                left = match_word(line.slice(i));
                                            }
                                        }
                                        for (i = line.length - 1; i >= 0 && right === ''; --i) {
                                            if (line[i] >= '0' && line[i] <= '9') {
                                                right = line[i];
                                            }
                                            else {
                                                right = match_word(line.slice(i));
                                            }
                                        }
                                        console.log(left + right);
                                        total += parseInt(left + right);
                                        _g.label = 5;
                                    case 5:
                                        _a = true;
                                        return [3 /*break*/, 3];
                                    case 6: return [3 /*break*/, 13];
                                    case 7:
                                        e_1_1 = _g.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3 /*break*/, 13];
                                    case 8:
                                        _g.trys.push([8, , 11, 12]);
                                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                                        return [4 /*yield*/, _e.call(_b)];
                                    case 9:
                                        _g.sent();
                                        _g.label = 10;
                                    case 10: return [3 /*break*/, 12];
                                    case 11:
                                        if (e_1) throw e_1.error;
                                        return [7 /*endfinally*/];
                                    case 12: return [7 /*endfinally*/];
                                    case 13:
                                        console.log(total);
                                        return [2 /*return*/, total];
                                }
                            });
                        }); })()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function match_word(input) {
    if (input.indexOf('one') === 0) {
        return '1';
    }
    else if (input.indexOf('two') === 0) {
        return '2';
    }
    else if (input.indexOf('three') === 0) {
        return '3';
    }
    else if (input.indexOf('four') === 0) {
        return '4';
    }
    else if (input.indexOf('five') === 0) {
        return '5';
    }
    else if (input.indexOf('six') === 0) {
        return '6';
    }
    else if (input.indexOf('seven') === 0) {
        return '7';
    }
    else if (input.indexOf('eight') === 0) {
        return '8';
    }
    else if (input.indexOf('nine') === 0) {
        return '9';
    }
    else {
        return '';
    }
}
solve();