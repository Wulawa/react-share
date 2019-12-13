import React from 'react';
import TsShare from '../libs/index.tsx';


export default {
  component: TsShare,
  title: 'Share',
};

export const defaultShare = () => <TsShare url='https://github.com/Wulawa/react-share' disabled={['google','twitter','facebook']} weiboTitle="这个标题只有的分享到微博时有用，其它标题为全局标题">
<a href="javascript:;" className="social-share-icon icon-weibo"></a>
<a href="javascript:;" className="social-share-icon icon-qq"></a>
<a href="javascript:;" className="social-share-icon icon-qzone"></a>
</TsShare>

