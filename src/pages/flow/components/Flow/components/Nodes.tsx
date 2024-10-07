import withBaseNode from './BaseNode';
import MFButton from './base/Button';
import MFText from './base/Text';

// 媒体组件

// 图表组件

const BaseNode = withBaseNode(MFButton);
const TextNode = withBaseNode(MFText);

const nodeTypes = {
    Button: BaseNode,
    Text: TextNode, 
}

export default nodeTypes