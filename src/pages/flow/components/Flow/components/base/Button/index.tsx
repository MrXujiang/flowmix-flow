import * as Icon from '@ant-design/icons';
import BaseText from '../Text/baseText';
import styles from './index.less';

  function FMButton(props: any) {
    const { id, style, interaction } = props || {};
    const { link } = interaction || {};
    const { icon, text, background, radius, shadow } = style || {};
    // @ts-ignore
    const MyIcon: React.ForwardRefExoticComponent<Pick<AntdIconProps, AntdIconType> &
    React.RefAttributes<HTMLSpanElement>> = icon && icon.type ? (Icon as any)[icon.type] : null;

    const handleClick = () => {
      const isPreview = location.search.includes('preview');
      if (isPreview && link) {
        window.open(link, '_blank');
      }
    }

    return (
        <div 
          className={styles.fmButton}
          style={{
            background,
            borderRadius: typeof radius === 'number' ? radius : `${radius[0]}px ${radius[1]}px ${radius[2]}px ${radius[3]}px`,
            boxShadow: shadow ? `${shadow.direction === 'out' ? '' : shadow.direction} ${shadow.transform[0]}px ${shadow.transform[1]}px ${shadow.transform[2]}px ${shadow.transform[3]}px ${shadow.color}` : 'none',
          }}
          onClick={handleClick}
        >
            <div className={styles.icon}>
                {
                  MyIcon && <MyIcon style={{color: icon?.color, fontSize: icon?.size}} />
                }
            </div>
            <div 
              className={styles.text}
            >
              <BaseText text={text} />
            </div>
        </div>
    );
  }


export default FMButton