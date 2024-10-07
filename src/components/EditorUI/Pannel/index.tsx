import PageLayer from "./PageLayer";
import type { IPageLayerProps } from './PageLayer';
import { memo } from 'react';
import styles from './index.less';

interface IPanelProps {
    curActive?: string;  // layer 图层面板 | page 页面面板
    pageData?: IPageLayerProps['list'];
    nodeData?: any[];
    onNodeClick?: (node: any) => void;
    onNewPage?: () => void;
    onDelPage?: (id: string) => void;
}

const Panel = (props:IPanelProps) => {
    const { 
        curActive = 'layer', 
        pageData, 
        nodeData, 
        onNodeClick,
        onNewPage, 
        onDelPage 
    } = props;
    return <div className={styles.panel}>
                <PageLayer 
                    visible={curActive === 'layer'} 
                    list={pageData}
                    nodes={nodeData}
                    onNewPage={onNewPage} 
                    onDelPage={onDelPage}
                    onNodeClick={onNodeClick}
                />
            </div>
}

export default memo(Panel);