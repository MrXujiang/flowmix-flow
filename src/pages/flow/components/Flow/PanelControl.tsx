import { memo } from 'react';
import { Button, Tooltip } from 'antd';
import { FMHand, FMCursorPointer } from '../../../../components/Icon';
import { ClearOutlined, SunOutlined, MoonOutlined, ShrinkOutlined } from '@ant-design/icons'
import styles from './index.less';

interface IProps {
    theme: 'dark' | 'light';
    pandMode?:'select' |'move';
    isPreview: boolean;
    onThemeChange: (theme: 'dark' | 'light') => void;
    onClear: () => void;
    onExitPreview?: () => void;
    onPanModeChange?: (type: 'select' | 'move') => void;
}

const PanelControl = memo((props: IProps) => {
    const { 
        theme, 
        pandMode = 'select',
        isPreview, 
        onThemeChange, 
        onExitPreview, 
        onClear, 
        onPanModeChange = () => {}
    } = props;
    return <div className={styles.panelControl}>
        {
            isPreview ? <>
                <Tooltip title="退出预览" key={1}>
                    <Button 
                        icon={<ShrinkOutlined style={{fontSize: 14}} />} 
                        type="text"
                        onClick={onExitPreview}
                    />
                </Tooltip>
            </> : <>
                <Tooltip title="选择">
                    <Button 
                        icon={<FMCursorPointer width={16} height={16} />} 
                        type={pandMode === 'select' ? 'primary' : 'text'}
                        onClick={() => onPanModeChange('select')}
                        className={styles.panelItem}
                    />
                </Tooltip>
                <Tooltip title="平移画布">
                    <Button 
                        icon={<FMHand width={16} height={16} />} 
                        type={pandMode === 'move' ? 'primary' : 'text'} 
                        onClick={() => onPanModeChange('move')}
                        className={styles.panelItem}
                    />
                </Tooltip>
                <Tooltip title="清空">
                    <Button 
                        icon={<ClearOutlined style={{fontSize: 14}} />} 
                        type="text" 
                        onClick={onClear}
                        className={styles.panelItem}
                    />
                </Tooltip>
            </>
        }
        

        <Tooltip title="主题模式">
            <Button 
              icon={theme === 'dark' ? <SunOutlined style={{fontSize: 14}} /> : <MoonOutlined style={{fontSize: 14}} />} 
              type="text" 
              onClick={() => onThemeChange(theme === 'dark'? 'light' : 'dark')}
            />
        </Tooltip>
        
    </div>
})

export default PanelControl;