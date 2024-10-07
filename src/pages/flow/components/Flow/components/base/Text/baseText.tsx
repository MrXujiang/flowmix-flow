function BaseText({ text }: any) {
    return !!text?.content && <div
    style={{
      padding: 6,
      color: text?.color,
      fontSize: text?.fontSize,
      fontWeight: text?.bold ? 'bold' : 'normal',
      lineHeight: text?.lineHeight,
      textAlign: text?.textAlign,
      textDecoration: 
      text?.underline && text?.through ? 'line-through underline' : 
          text?.underline ? 'underline' : 
              text?.through ? 'line-through' : 
                'none',
      fontStyle: text?.italic? 'italic' : 'normal',
    }}
  >
    { text.content }
  </div>
  }


export default BaseText