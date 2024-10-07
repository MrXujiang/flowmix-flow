import Header from "@/components/Header";
import { 
    CaretRightOutlined, 
    AppstoreOutlined, 
    ExclamationCircleOutlined,
    UploadOutlined,
    GithubOutlined
} from "@ant-design/icons";
import { Button, Typography, Tooltip, Tour } from "antd";
import type { TourProps } from 'antd';
import { useRef, useState } from "react";
import { DeviconProlog, VscodeIconsFileTypeWord } from '../../Icon';

import styles from './index.less';

const { Paragraph } = Typography;

interface IHeaderProps {
    logoText?: string;
    title?: string;
    onTitleChange?: (value: string) => void;
    onPublishClick?: () => void;
    onPreviewClick?: () => void;
    onLayerClick?: () => void;
    onImportClick?: () => void;
    onTplClick?: () => void;
}

const EditHeader = (props: IHeaderProps) => {
    const { 
        title = '未命名', 
        logoText = 'flowmix/flow开源版',
        onTitleChange, 
        onPublishClick, 
        onLayerClick, 
        onPreviewClick,
        onImportClick, 
    } = props;
    const ref1 = useRef(null);
    const ref3 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const [open, setOpen] = useState(() => {
        const hadGuide = localStorage.getItem('showGuide') === 'true';
        return !hadGuide;
    })
    const steps:TourProps['steps'] = [
        {
            target: () => ref1.current,
            title: '页面列表',
            description: '点击此处回到页面列表, 可以轻松切换页面',
            nextButtonProps: {
                children: '下一步',
            }
        },
        {
            target: () => ref3.current,
            title: '导入JSON文件',
            description: '通过导入JSON文件来快速创建流程图表',
            nextButtonProps: {
                children: '下一步',
            },
            prevButtonProps: {
                children: '上一步',
            }
        },
        {
            target: () => ref5.current,
            title: '预览页面',
            description: '可以直接预览页面整体效果',
            nextButtonProps: {
                children: '下一步',
            },
            prevButtonProps: {
                children: '上一步',
            }
        },
        {
            target: () => ref6.current,
            title: '导出为JSON',
            description: '导出JSON之后可以通过导入JSON文件来快速创建图表, 并能分享给其他人',
            nextButtonProps: {
                children: '完成',
            },
            prevButtonProps: {
                children: '上一步',
            }
        },
    ];
    const finishGuide = () => {
        setOpen(false);
        localStorage.setItem('showGuide', 'true');
    }
    const handleTitleChange = (value: string) => {
        if(value.length > 20) {
            value = value.slice(0, 20);
        }
        onTitleChange && onTitleChange(value);
    }
    return <Header text={logoText}>
        <div className={styles.leftControl}>
            <Button 
                type="primary"
                className={styles.btn}
                onClick={onLayerClick}
                icon={<AppstoreOutlined />} 
                size="small"
                ref={ref1}
            />
            <Button 
                type="primary" 
                className={styles.btn} 
                icon={<UploadOutlined />} 
                size="small" 
                onClick={onImportClick}
                ref={ref3}
            />

            <Button 
                type="primary" 
                className={styles.btn} 
                icon={<CaretRightOutlined />} 
                size="small" 
                onClick={onPreviewClick}
                ref={ref5}
            />
            <Button 
                type="primary" 
                className={styles.btn} 
                size="small"
                onClick={onPublishClick}
                ref={ref6}
            >
                导出
            </Button>
            
        </div>
        <div className={styles.title}>
            <span>
                <Tooltip title="单击页面标题可编辑"><ExclamationCircleOutlined /> 页面名称: </Tooltip>
            </span>
            <Paragraph
                editable={{
                tooltip: null,
                onChange: handleTitleChange,
                // @ts-ignore
                triggerType: "text",
                }}
            >
                { title }
            </Paragraph>
        </div>
        <div className={styles.rightControl}>
            <Button 
                    type="link" 
                    className={styles.btn} 
                    size="small"
                    icon={<DeviconProlog />}
                    onClick={() => window.open('/flow')}
                >
                    Pro版工作流
            </Button>
            <Button 
                    type="link" 
                    className={styles.btn} 
                    size="small"
                    icon={<VscodeIconsFileTypeWord />}
                    onClick={() => window.open('/docx')}
                >
                    文档引擎
            </Button>
            <Button 
                    type="link" 
                    className={styles.btn} 
                    size="small"
                    icon={<GithubOutlined />}
                    onClick={() => window.open('https://github.com/MrXujiang/flowmix-flow')}
                >
                    Github
            </Button>
        </div>
        <Tour 
            open={open} 
            onClose={finishGuide} 
            mask={true} 
            type="primary" 
            steps={steps} 
            onFinish={finishGuide}
        />
        
    </Header>;
}

export default EditHeader;