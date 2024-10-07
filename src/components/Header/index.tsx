import { ReactNode } from "react";
import Logo from '../Logo';
import styles from './index.less';


interface IHeaderProps {
    children?: ReactNode;
    text?: string;
}

const Header = (props: IHeaderProps) => {
    const { children, text } = props;
    return <div className={styles.header}>
        <Logo text={text} />
        {children}
    </div>
}

export default Header