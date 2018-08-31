'use strict';

const loader = require('./lib/grpc_loader');

module.exports = app => {
  loader(app)
};
