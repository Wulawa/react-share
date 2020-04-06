import * as React from "react"
// import { polyfill } from 'react-lifecycles-compat';
// import QRcode from  "qrcode.react";
import "./css/share.css"
const QRcode = require("qrcode.react");
const { polyfill } = require('react-lifecycles-compat');


// Initialize a variables.123
const firstImage:HTMLImageElement = document.images[0];
let image = firstImage ? firstImage.src : '';
let site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
let title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
let description = getMetaContentByName('description') || getMetaContentByName('Description') || '';
let url = location.href
let origin = location.origin

function getMetaContentByName(name: string): string | undefined {
  const metaNods: HTMLCollectionOf<HTMLMetaElement> = document.getElementsByTagName('meta');
  const target = Array.from(metaNods).find(item => item.name === name);
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


const sites: string[] = ["qzone", "weibo", "google", "twitter", "qq", "tencent", "wechat", "douban", "linkedin", "facebook"];

interface ShareProps {
  className?: string;
  url?: string;
  origin?: string;
  title?: string;
  description?: string;
  summary?: string;
  disabled?: typeof sites;
  site?: typeof sites;
  image?: string;
  source?: string;
  initialized?: boolean;
  wechatQrcodeSize?: number,
  wechatQrcodeLevel?: string
}
class Share extends React.Component<ShareProps> {
  static defaultProps = {
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
  encodeFromObject<T extends object>(props: T): T {
    const result = Object.create(props);
    /** 
       * warn: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
       * 泛型为隐式具有any类型 props[k] 无法根据索引获取value
       * 指定result为any类型
       * 
       * **/
    Object.keys(result).forEach((k) => {
      result[k] = typeof result[k] === 'string' ? encodeURIComponent(result[k]) : result[k];
    })
    return result;
  }
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

  render() {
    let {url, disabled, title, image, description, summary, source, wechatQrcodeSize, wechatQrcodeLevel,initialized} = this.encodeFromObject(this.props);

    const interfaceMap = {
      qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${source}`,
      qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
      tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}&pic=${image}`,
      weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
      wechat: decodeURIComponent(url),
      douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
      diandian: `http://www.diandian.com/share?lo=${url}&ti=${title}&type=link`,
      linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`,
      google: `https://plus.google.com/share?url=${url}`
    };
    return (
      <div className="social-share">
        {
          initialized?
          this.props.children :
          sites.map((site: keyof typeof interfaceMap): React.ReactNode | null=> {
            if(~disabled.indexOf(site)) return;
            if(site !== "wechat"){
              return (
                <a key={site} className={`social-share-icon icon-${site}`} target='_blank' href={interfaceMap[site]}></a>
              )
            } else {
              return (
              <a key={site} className={`social-share-icon icon-${site}`} target='_blank' href='javascript:;'>
                <div className="wechat-qrcode">
                  <h4>微信扫一扫：分享</h4>
                  <QRcode value={interfaceMap[site]} size={wechatQrcodeSize} level={wechatQrcodeLevel}/>
                </div>  
              </a>)
            }
          })
        }
      </div>
    )
  }
}

polyfill(Share);

export default Share;
