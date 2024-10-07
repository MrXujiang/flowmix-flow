const defaultValue = {   
    type: 'Button',
    position: { x: 333, y: 222 },
    data: { 
        style: {
            icon: undefined, 
            text: {
                content: 'flowmix流',
                color: '#fff',
                fontSize: 16,
                bold: false,
                textAlign: 'center',
                lineHeight: 1.6,
                italic: false,
                underline: false,
                through: false
            }, 
            background: 'rgb(12,14,16)',
            radius: 6,
            shadow: undefined,
            transform: undefined,
            handles: [
                {
                    direction: 'top',
                    type: 'target',
                },
                {
                    direction: 'bottom',
                    type: 'source',
                },
                {
                    direction: 'right',
                    type: 'source',
                },
                {
                    direction: 'left',
                    type: 'target',
                }
            ],
            mouse: 'default'
        },
        animation: {

        },
        interaction: {

        },
        info: {

        }
    },
    selected: false,
    isConnectable: true,
    zIndex: 1,
    deletable: true,
    width: 150,
    height: 62,
    parentId: ''
}

export default defaultValue