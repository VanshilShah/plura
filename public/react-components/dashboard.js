import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

var drawerWidth = 240;

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      display: 'flex'
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: Object.assign({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px'
    }, theme.mixins.toolbar),
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: 'calc(100% - ' + drawerWidth + 'px)',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    menuButtonHidden: {
      display: 'none'
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: _defineProperty({
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7)
    }, theme.breakpoints.up('sm'), {
      width: theme.spacing(9)
    }),
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
    },
    fixedHeight: {
      height: 240
    }
  };
});

export default function Dashboard() {
  var classes = useStyles();

  var _React$useState = React.useState(true),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var handleDrawerOpen = function handleDrawerOpen() {
    setOpen(true);
  };
  var handleDrawerClose = function handleDrawerClose() {
    setOpen(false);
  };
  var fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return React.createElement(
    'div',
    { className: classes.root },
    React.createElement(CssBaseline, null),
    React.createElement(
      AppBar,
      { position: 'absolute', className: clsx(classes.appBar, open && classes.appBarShift) },
      React.createElement(
        Toolbar,
        { className: classes.toolbar },
        React.createElement(
          IconButton,
          {
            edge: 'start',
            color: 'inherit',
            'aria-label': 'Open drawer',
            onClick: handleDrawerOpen,
            className: clsx(classes.menuButton, open && classes.menuButtonHidden)
          },
          React.createElement(MenuIcon, null)
        ),
        React.createElement(
          Typography,
          { component: 'h1', variant: 'h6', color: 'inherit', noWrap: true, className: classes.title },
          'Dashboard'
        ),
        React.createElement(
          IconButton,
          { color: 'inherit' },
          React.createElement(
            Badge,
            { badgeContent: 4, color: 'secondary' },
            React.createElement(NotificationsIcon, null)
          )
        )
      )
    ),
    React.createElement(
      Drawer,
      {
        variant: 'permanent',
        classes: {
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        },
        open: open
      },
      React.createElement(
        'div',
        { className: classes.toolbarIcon },
        React.createElement(
          IconButton,
          { onClick: handleDrawerClose },
          React.createElement(ChevronLeftIcon, null)
        )
      ),
      React.createElement(Divider, null)
    ),
    React.createElement(
      'main',
      { className: classes.content },
      React.createElement('div', { className: classes.appBarSpacer }),
      React.createElement(
        Container,
        { maxWidth: 'lg', className: classes.container },
        React.createElement(
          Grid,
          { container: true, spacing: 3 },
          React.createElement(
            Grid,
            { item: true, xs: 12, md: 8, lg: 9 },
            React.createElement(Paper, { className: fixedHeightPaper })
          ),
          React.createElement(
            Grid,
            { item: true, xs: 12, md: 4, lg: 3 },
            React.createElement(Paper, { className: fixedHeightPaper })
          ),
          React.createElement(
            Grid,
            { item: true, xs: 12 },
            React.createElement(Paper, { className: classes.paper })
          )
        )
      )
    )
  );
}