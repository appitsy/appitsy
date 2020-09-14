export interface ITheme {
    layout: {
        componentInternalMargin: string;
        componentMargin: string;
    },
    colors: {
        bg: string;
        errors: {
            foreground: string;
            fontSize: string;
        }
    },
    components: {
        panel: {
            background: string;
            color: string;
            border: string;
            borderRadius: string;
        }
    }
};

export const theme: ITheme = {
    layout: {
        componentInternalMargin: '5px',
        componentMargin: '7px',
    },
    colors: {
        bg: 'rgba(50,50,50,0.4)',
        errors: {
            foreground: 'red',
            fontSize: '14px'
        }
    },
    components: {
        panel: {
            background: 'grey',
            color: 'black',
            border: '1px solid grey',
            borderRadius: '5px',
        }
    }
};
