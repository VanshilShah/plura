import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { yellow, blue } from "@material-ui/core/colors";

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    var _this2 = this;

    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.getName = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var res, json;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch('/api/name');

            case 3:
              res = _context.sent;
              _context.next = 6;
              return res.json();

            case 6:
              json = _context.sent;

              console.log(json);
              _this.setState({ name: json.name });
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 11]]);
    }));
    _this.getTasks = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var res, json;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return fetch('/api/tasks');

            case 3:
              res = _context2.sent;
              _context2.next = 6;
              return res.json();

            case 6:
              json = _context2.sent;

              console.log(json.tasks);
              _this.setState({ tasks: json.tasks });
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2['catch'](0);

              console.log(_context2.t0);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 11]]);
    }));

    _this.renderTask = function (task) {
      return React.createElement(
        'p',
        { key: task.ID },
        task.Name
      );
    };

    _this.state = {
      name: "loading",
      tasks: ["no tasks"]
    };

    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getName();
      this.getTasks();
    }
  }, {
    key: 'createTheme',
    value: function createTheme() {
      var primaryColor = yellow,
          secondaryColor = blue;
      return createMuiTheme({
        palette: {
          primary: {
            light: primaryColor[300],
            main: primaryColor[500],
            dark: primaryColor[700]
          },
          secondary: {
            light: secondaryColor[300],
            main: secondaryColor[500],
            dark: secondaryColor[700]
          }
        },
        typography: {
          useNextVariants: true
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var theme = this.createTheme();
      return React.createElement(
        MuiThemeProvider,
        { theme: theme },
        React.createElement(AppBar, { position: 'static', style: { height: 50 } }),
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            this.state.name
          ),
          this.state.tasks.length > 0 && this.state.tasks.map(this.renderTask)
        )
      );
    }
  }]);

  return Home;
}(React.Component);

export default Home;