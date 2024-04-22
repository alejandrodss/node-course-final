"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductNotValidError = exports.ProductNotFoundError = void 0;
var BaseError_1 = require("./BaseError");
var ProductNotFoundError = /** @class */ (function (_super) {
    __extends(ProductNotFoundError, _super);
    function ProductNotFoundError() {
        var _this = _super.call(this, "Product not found", 404) || this;
        _this.name = 'ProductNotFound';
        return _this;
    }
    return ProductNotFoundError;
}(BaseError_1.BaseError));
exports.ProductNotFoundError = ProductNotFoundError;
var ProductNotValidError = /** @class */ (function (_super) {
    __extends(ProductNotValidError, _super);
    function ProductNotValidError() {
        var _this = _super.call(this, "Products are not valid", 400) || this;
        _this.name = 'ProductNotValid';
        return _this;
    }
    return ProductNotValidError;
}(BaseError_1.BaseError));
exports.ProductNotValidError = ProductNotValidError;
