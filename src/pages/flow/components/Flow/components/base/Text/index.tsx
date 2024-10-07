import BaseText from "./baseText";
function FMText(props: any) {
    const { id, style } = props || {};
    const { text, shadow } = style || {};

    return (
      <div
        style={{ 
          width: '90%', 
          maxWidth: 800,
          textShadow: shadow ? `${shadow.direction === 'out' ? '' : shadow.direction} ${shadow.transform[0]}px ${shadow.transform[1]}px ${shadow.transform[2]}px ${shadow.color}` : 'none',
          overflow: 'hidden',
        }}
      >
        <BaseText text={text} />
    </div>
    );
  }


export default FMText