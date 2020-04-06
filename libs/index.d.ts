import * as React from "react";
import "./css/share.css";
declare const sites: string[];
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
    wechatQrcodeSize?: number;
    wechatQrcodeLevel?: string;
}
declare class Share extends React.Component<ShareProps> {
    static defaultProps: {
        url: string;
        origin: string;
        title: string;
        description: string;
        summary: string;
        image: string;
        site: string;
        source: string;
        initialized: boolean;
        wechatQrcodeSize: number;
        wechatQrcodeLevel: string;
    };
    encodeFromObject<T extends object>(props: T): T;
    render(): JSX.Element;
}
export default Share;
