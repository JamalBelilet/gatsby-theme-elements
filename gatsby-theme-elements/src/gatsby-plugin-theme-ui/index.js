/**
 * This theme uses `theme-ui` under the hood.
 * @see https://theme-ui.com/
 * @see https://theme-ui.com/gatsby-plugin/
 */
export default {
  space: [0, 4, 8, 16, 32],
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
  },
  fontSizes: [16, 18, 20, 22, 27, 36],
  lineHeights: {
    body: 1.45,
    heading: 1.1
  },
  colors: {
    gray: ['#efefef', '#ddd', '#333', '#111'],
    background: '#fff',
    primary: 'rebeccapurple'
  },
  sizes: {
    default: '100%',
    max: '820px',
    small: '21px',
  },
  styles: {
    Layout: {
      color: 'gray.2',
      fontFamily: 'body',
      fontSize: 1,
      lineHeight: 'body',
    },
    Header: {
      backgroundColor: 'background',
      color: 'gray.3',
      margin: '0 auto',
      padding: '20px 15%',
      width: 'default',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0,0,0,.0975)',
      div: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      nav: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        background: '#fafafa',
        border: 'solid 1px #dbdbdb',
        textAlign: 'center',
        padding: '7px',
        minWidth: '200px'
      }
    },
    Main: {
      margin: '0 auto',
      width: 'default',
      backgroundColor: '#FAFAFA',
    },
    Container: {
      padding: '45px',
    },
    h1: {
      color: 'gray.3',
      fontSize: 5,
      fontWeight: 'bold',
      lineHeight: 'heading',
      margin: 0,
      marginTop: 3
    },
    ul: {
      borderTop: '1px solid',
      borderColor: 'gray.0',
      listStyle: 'none',
      padding: 0
    },
    li: {
      borderBottom: '1px solid',
      borderColor: 'gray.0',
      padding: 0,
      '&:focus-within, &:hover': {
        backgroundColor: 'gray.0'
      }
    },
    img: {
      height: 'small',
      margin: '0 8px',
    },
    p: {
      margin: '0',
    }
  }
}
