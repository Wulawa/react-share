var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "react", "./css/share.css"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var React = require("react");
    // import { polyfill } from 'react-lifecycles-compat';
    // import QRcode from  "qrcode.react";
    require("./css/share.css");
    var QRcode = require("qrcode.react");
    var polyfill = require('react-lifecycles-compat').polyfill;
    // Initialize a variables.123
    var firstImage = document.images[0];
    var image = firstImage ? firstImage.src : '';
    var site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
    var title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
    var description = getMetaContentByName('description') || getMetaContentByName('Description') || '';
    var url = location.href;
    var origin = location.origin;
    function getMetaContentByName(name) {
        var metaNods = document.getElementsByTagName('meta');
        var target = Array.from(metaNods).find(function (item) { return item.name === name; });
        return target && target.content;
        // return (<HTMLMetaElement>document.getElementsByName(name)[0])node.content;
    }
    // interface ShareInfo {
    //   url: string;
    //   sites: string;
    //   disabled: boolean, 
    //   title: string;
    //   image: string;
    //   description: string;
    //   summary: string;
    //   source: string;
    //   wechatQrcodeSize: number,
    //   wechatQrcodeLevel: string
    //   initialized?: boolean;
    // }
    var sites = ["qzone", "weibo", "google", "twitter", "qq", "tencent", "wechat", "douban", "linkedin", "facebook"];
    var Share = /** @class */ (function (_super) {
        __extends(Share, _super);
        function Share() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Share.prototype.encodeFromObject = function (props) {
            var result = Object.create(props);
            /**
               * warn: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
               * 泛型为隐式具有any类型 props[k] 无法根据索引获取value
               * 指定result为any类型
               *
               * **/
            Object.keys(result).forEach(function (k) {
                result[k] = typeof result[k] === 'string' ? encodeURIComponent(result[k]) : result[k];
            });
            return result;
        };
        // encodeFromObject(props: any): any {
        //   type sourceType = typeof props;
        //   const result: sourceType = {};
        //   /** 
        //    * warn: 不能将类型“any”分配给类型“never” 
        //    * 因为props有多种类型的值，所以函数props[k]有可能是number或者boolean，那么此时无法判断key和value的类型是否匹配。
        //    * 
        //    * 指定result与props为同类型即可
        //    * 
        //    * **/
        //   Object.keys(props).forEach((k) => {
        //     result[k] = typeof props[k] === 'string' ? encodeURIComponent(props[k]) : props[k];
        //   })
        //   return result;
        // }
        Share.prototype.render = function () {
            var _a = this.encodeFromObject(this.props), url = _a.url, disabled = _a.disabled, title = _a.title, image = _a.image, description = _a.description, summary = _a.summary, source = _a.source, wechatQrcodeSize = _a.wechatQrcodeSize, wechatQrcodeLevel = _a.wechatQrcodeLevel, initialized = _a.initialized;
            var interfaceMap = {
                qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url + "&title=" + title + "&desc=" + description + "&summary=" + summary + "&site=" + source,
                qq: "http://connect.qq.com/widget/shareqq/index.html?url=" + url + "&title=" + title + "&source=" + source + "&desc=" + description,
                tencent: "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + title + "&url=" + url + "&pic=" + image,
                weibo: "http://service.weibo.com/share/share.php?url=" + url + "&title=" + title + "&pic=" + image,
                wechat: decodeURIComponent(url),
                douban: "http://shuo.douban.com/!service/share?href=" + url + "&name=" + title + "&text=" + description + "&image=" + image + "&starid=0&aid=0&style=11",
                diandian: "http://www.diandian.com/share?lo=" + url + "&ti=" + title + "&type=link",
                linkedin: "http://www.linkedin.com/shareArticle?mini=true&ro=true&title=" + title + "&url=" + url + "&summary=" + summary + "&source=" + source + "&armin=armin",
                facebook: "https://www.facebook.com/sharer/sharer.php?u=" + url,
                twitter: "https://twitter.com/intent/tweet?text=" + title + "&url=" + url + "&via=" + origin,
                google: "https://plus.google.com/share?url=" + url
            };
            return (React.createElement("div", { className: "social-share" }, initialized ?
                this.props.children :
                sites.map(function (site) {
                    if (~disabled.indexOf(site))
                        return;
                    if (site !== "wechat") {
                        return (React.createElement("a", { key: site, className: "social-share-icon icon-" + site, target: '_blank', href: interfaceMap[site] }));
                    }
                    else {
                        return (React.createElement("a", { key: site, className: "social-share-icon icon-" + site, target: '_blank', href: 'javascript:;' },
                            React.createElement("div", { className: "wechat-qrcode" },
                                React.createElement("h4", null, "\u5FAE\u4FE1\u626B\u4E00\u626B\uFF1A\u5206\u4EAB"),
                                React.createElement(QRcode, { value: interfaceMap[site], size: wechatQrcodeSize, level: wechatQrcodeLevel }))));
                    }
                })));
        };
        Share.defaultProps = {
            url: url,
            origin: origin,
            title: title,
            description: description,
            summary: description,
            image: image,
            site: site,
            source: site,
            initialized: false,
            wechatQrcodeSize: 150,
            wechatQrcodeLevel: 'Q'
        };
        return Share;
    }(React.Component));
    polyfill(Share);
    exports["default"] = Share;
});
