import { createMuiTheme } from '@material-ui/core/styles';

const createTheme = (primary = '#EE1B34') => {
  // Create a theme instance.
  let theme = createMuiTheme({
    palette: {
      type: 'light',
      common: {
        black: '#000',
        white: '#fff',
        gray: '#F5F5F5',
      },
      primary: {
        main: primary,
        secondary: '#770E1A',
      },
      secondary: {
        main: '#770E1A',
      },
      text: {
        primary: '#333333',
        secondary: '#787878',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
        other: '#A0ACC5',
      },
      background: {
        paper: '#ffffff',
        default: '#F0F2F5',
        other: '#E5E5E5',
        drawer: 'rgba(3, 127, 251, 0.05)',
        common: '#FFF5F5',
        strike: '#C6C6C6',
        secondary: '#323232',
        text: '#9A9A9A',
        upload: '#EEF7FF',
        cropper: '#EEF7FF',
        zoom: '#111111',
      },
      divider: '#E6E7EF',
      divider2: 'rgba(0, 0, 0, 0.12)',
      other: {
        subTextColor: '#878787',
        backgroundMenuColor: '#e9f5ff',
        textField: '#eeeeee',
      },
    },
    typography: {
      fontFamily: 'Nunito',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontWeight: 300,
        fontSize: '80px',
        lineHeight: 1.167,
        letterSpacing: '"0.01562em',
      },
      h2: {
        fontWeight: 500,
        fontSize: '44px',
        lineHeight: '42px',
        letterSpacing: '-0.00833em',
        '@media(max-width: 500px)': {
          fontSize: '30px',
        },
      },
      h3: {
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '36px',
        fontStyle: 'normal',
      },
      h4: {
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '27px',
        fontStyle: 'normal',
      },
      h5: {
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: '27px',
        fontStyle: 'normal',
      },
      h6: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '21px',
        fontStyle: 'normal',
      },
      h7: {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '21px',
        fontStyle: 'normal',
      },
      subtitle1: {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.5px',
      },
      subtitle2: {
        fontWeight: 300,
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '0.2px',
      },
      body1: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
      button: {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '19px',
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 6,
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  });

  theme = {
    ...theme,
    overrides: {
      MuiDrawer: {
        paperAnchorDockedLeft: {
          borderRight: 'none',
        },
      },
      MuiButton: {
        root: {
          padding: '6px 10px',
          borderRadius: 3,
        },
        label: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
      MuiTabs: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
      },
      MuiTab: {
        root: {
          textTransform: 'none',
          // margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: theme.spacing(1),
        },
      },
      MuiTooltip: {
        tooltip: {
          borderRadius: 6,
          backgroundColor: theme.palette.primary.main,
          fontSize: '13px',
        },
      },
      MuiListItemText: {
        primary: {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      MuiAvatar: {
        root: {
          width: 32,
          height: 32,
        },
      },
      MuiPaper: {
        elevation4: {
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 12px 0px 10px 0px rgb(0 0 0 / 10%)',
        },
      },
      MuiButtonGroup: {
        contained: {
          boxShadow: 'none',
        },
        groupedContainedHorizontal: {
          borderRight: 'none',
        },
      },
      MuiStepper: {
        root: {
          padding: 0,
        },
      },
      MuiTableCell: {
        root: {
          wordBreak: 'break-all',
          borderBottom: '1px solid #E5E5E5',
        },
      },
      MuiTableContainer: {
        root: {
          borderRadius: 1,
        },
      },
      MuiStepLabelLabelContainer: {
        width: '85%',
        textAlign: 'center',
      },
    },
  };

  return theme;
};

export default createTheme;
