import { ReactNode } from "react";
import { Link } from 'umi';
import styles from './index.less';


interface ILogoProps {
    text?: ReactNode;
    path?: string;
}

const Logo = (props: ILogoProps) => {
    const { text = 'flowmix', path = '/' } = props;
    return <div className={styles.logo}>
        <Link to={path}>{ text }</Link>
    </div>
}

export default Logo