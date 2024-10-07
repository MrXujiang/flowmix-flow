import { useState, useMemo } from 'react';
import { Segmented, Button, Empty, Tag } from "antd";
import { Link, useSearchParams } from 'umi';
import { DeleteOutlined } from '@ant-design/icons'
import classnames from 'classnames';
import styles from './index.less';

export interface IPageLayerProps {
    visible: boolean;
    list?: {
        id: string;
        title: string;
    }[];
    nodes?: any[];
    onNodeClick?: (node: any) => void;
    onNewPage?: () => void;
    onDelPage?: (id: string) => void;
}

const PageLayer = (props: IPageLayerProps) => {
    const { 
        visible, 
        list, 
        nodes,
        onNodeClick = () => {}, 
        onNewPage = () => {}, 
        onDelPage 
    } = props;
    const [curType, setCurType] = useState('layer');
    const [searchParams] = useSearchParams();
    const orderNodes = useMemo(() => {
        return nodes? nodes.sort((a, b) => {
            return a.data.order - b.data.order;
        }) : [];
    }, [nodes])
    return <div className={styles.pageLayer} style={{display: visible ? 'block' : 'none'}}>
                <div className={styles.bars}>
                    <Segmented<string>
                        options={[
                            {
                                value: 'page',
                                label: '我的页面'
                            },
                            {
                                value: 'layer',
                                label: '图层列表'
                            }
                        ]}
                        defaultValue={curType}
                        onChange={(value) => {
                            setCurType(value);
                        }}
                    />
                </div>
                <div className={styles.content}>
                    {
                        curType === 'page' && 
                        <div className={styles.page}>
                            <div className={styles.list}>
                                {
                                    list && list.length ? list.map((item) => {
                                        return <div className={classnames(styles.item, searchParams.get("id") === item.id && styles.selected)} key={item.id}>
                                           <Link to={`?id=${item.id}`}>{item.title}</Link> 
                                           <span className={styles.delBtn} onClick={() => {
                                               onDelPage && onDelPage(item.id);
                                           }}><DeleteOutlined /></span>
                                        </div>
                                    }) : <Empty description="空空如也" style={{paddingTop: 20}} />
                                }
                            </div>
                            <div style={{textAlign: 'center', marginTop: 16}}><Button onClick={onNewPage} type="primary">+ 新建</Button></div>
                        </div>
                    }

                    {
                        curType === 'layer' && 
                        <div className={styles.layer}>
                            <div className={styles.list}>
                                {
                                    orderNodes.length ? orderNodes.map((item, i) => {
                                        const value = item.type === 'Image' ? (item.data.style?.file?.url || 'https://magic.dooring.vip/assets/logo-nvGOfOJy.png') : item.data.style?.text?.content;
                                        return <div className={classnames(styles.pd, item.selected && styles.selected)} key={i} onClick={() => onNodeClick(item)}>
                                                    <Tag>{ item.data.order || 0 }</Tag>
                                                    {
                                                        item.type === 'Image' ? <img src={value} alt="" /> : <div className={styles.text}>{value}</div>
                                                    }

                                                    <span className={styles.tag}><Tag color="blue">{ item.type }</Tag></span>
                                                    
                                                </div>
                                    }) : <Empty description="空空如也" style={{paddingTop: 20}} />
                                }
                                
                            </div>
                        </div>
                    }
                    
                </div>
                
    </div>
}

export default PageLayer;