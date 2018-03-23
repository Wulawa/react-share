import React from 'react'
import ReactDOM from 'react-dom'
import Share from '../libs'

ReactDOM.render((<Share disabled={['google','twitter','facebook']} weiboTitle="这个标题只有的分享到微博时有用，其它标题为全局标题">
<a href="javascript:;" className="social-share-icon icon-weibo"></a>
<a href="javascript:;" className="social-share-icon icon-qq"></a>
<a href="javascript:;" className="social-share-icon icon-qzone"></a>
</Share>), document.getElementById('root'));
