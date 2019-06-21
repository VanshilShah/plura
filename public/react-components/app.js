'use strict';

import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this2 = this;

    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

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
      console.log(task);
      return React.createElement(
        'p',
        null,
        task.Name
      );
    };

    _this.state = {
      name: "loading",
      tasks: ["no tasks"]
    };

    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getName();
      this.getTasks();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          this.state.name
        ),
        this.state.tasks.map(function (task) {
          return _this3.renderTask(task);
        })
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));