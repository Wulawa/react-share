import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QRcode from "qrcode.react"
import "./css/share.less"

// Initialize a variables.
let image = (document.images[0] || 0).src || '';
let site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
let title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
let description = getMetaContentByName('description') || getMetaContentByName('Description') || '';
let url = location.href
let origin = location.origin
function getMetaContentByName(name) {
  return (document.getElementsByName(name)[0] || 0).content;
}
class Share extends Component {
  static defaultProps = {
    url: url,
    origin: origin,
    title: title,
    description: description,
    summary: description,
    image: image,
    site: site,
    source: site,
    sites: ["qzone", "weibo", "google", "twitter", "qq", "tencent", "wechat", "douban", "linkedin", "facebook"],
    wechatQrcodeSize: 150,
    wechatQrcodeLevel: 'Q'
  };
  static propTypes = {
    url: PropTypes.string,
    source: PropTypes.string,
    title: PropTypes.string,
    origin: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    sites: PropTypes.array,
    disabled: PropTypes.array,
    wechatQrcodeTitle: PropTypes.string,
    wechatQrcodeHelper:  PropTypes.string,
    initialized: PropTypes.string,
    wechatQrcodeLevel: PropTypes.string,
    wechatQrcodeSize: PropTypes.number,
  }
  // getDataFormat() {
  //   const hyphenateRE = /([a-z\d])([A-Z])/g;
  //   return Object.keys(this.props).reduce((pre,cur) => {
  //     const key = "data-"+cur.replace(hyphenateRE, '$1-$2').toLowerCase();
  //     pre[key] = this.props[cur];
  //     return pre;      
  //   },{})
  // }
  getDataFormat() {
    // const hyphenateRE = /([a-z\d])([A-Z])/g;
    return Object.keys(this.props).reduce((pre,cur) => {
      pre[cur] = typeof this.props[cur] === 'string' ? encodeURIComponent(this.props[cur]) : this.props[cur];
      return pre;
    },{})
  }
  render() {
    // const setData = this.getDataFormat();
    const {url, sites, title, image, description, summary, source, wechatQrcodeSize, wechatQrcodeLevel,initialized} = this.getDataFormat();

    const templates = {
      qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${source}`,
      qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
      tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}&pic=${image}`,
      weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
      wechat: `javascript:`,
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
          initialized === 'true' ?
          this.props.children :
          sites.map((site) => {
            if(site !== "wechat"){
              return (
                <a key={site} className={`social-share-icon icon-${site}`} target='_blank' href={templates[site]}></a>
              )
            } else {
              return (
              <a key={site} className={`social-share-icon icon-${site}`} target='_blank' href={templates[site]}>
                <div className="wechat-qrcode">
                  <h4>微信扫一扫：分享</h4>
                  <QRcode value={url} size={wechatQrcodeSize} level={wechatQrcodeLevel}/>
                </div>  
              </a>)
            }
          })
        }
      </div>
    )
  }
}

export default Share;