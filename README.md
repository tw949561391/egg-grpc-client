# egg-grpc-client

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-grpc-client.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-grpc-client
[travis-image]: https://img.shields.io/travis/eggjs/egg-grpc-client.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-grpc-client
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-grpc-client.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-grpc-client?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-grpc-client.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-grpc-client
[snyk-image]: https://snyk.io/test/npm/egg-grpc-client/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-grpc-client
[download-image]: https://img.shields.io/npm/dm/egg-grpc-client.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-grpc-client

<!--
Description here.
-->

## Install

```bash
$ npm i egg-grpc-client --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.grpcClient = {
  enable: true,
  package: 'egg-grpc-client',
};
```

## Configuration

```js
// {app_root}/config/config.default.js

exports.grpcClient = {
    loaderOption: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    },
    client: {
        protoPath: 'app/grpc',
        host: '0.0.0.0',
        port: '50051'
    }   ////app.grpcClient
    
    
    // clients: {
    //     server1: {
    //         protoPath: 'app/grpc',
    //         host: '0.0.0.0',
    //         port: '50051'
    //     },  //app.grpcClient.get('server1')
    //     server2:{
    //         protoPath: 'app/grpc',
    //         host: '0.0.0.0',
    //         port: '50051'
    //     }  //app.grpcClient.get('server2')
    // }
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example


```
// {app_root}/config/config.default.js

exports.grpcClient = {
    loaderOption: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    },
    clients: {
        passport:{
         protoPath: 'app/grpcClient/passport',
         host: '0.0.0.0',
         port: '50051'
        }
    }   
};


//{app_base}/app/grpcClient/passport/ProfileService.proto
    syntax = "proto3";
    
    package passport.profile;
    
    service ProfileService {
        rpc getUserInfo (UserID) returns (UserInfo) {
        }
    }
    
    service ProfileService2 {
        rpc getUserInfo (UserID) returns (UserInfo) {
        }
    }
    
    message UserID {
        string userId = 1;
    }
    
    message UserInfo {
        string userId = 1;
        string username = 2;
        string avatar = 3;
        string nickname = 4;
        string gender = 5;
    }
    
    //use
    
    app.grpcClient.get('passport').passport.profile.ProfileService.getUserInfo({userId: '230371e2-eb07-4b2b-aa61-73fd27c5387e'}).then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })


   //app.[passport.profile].* ==  `package passport.profile` in *.proto ;
```

<!-- example here -->

## Server

Please open an issue [egg-grpc-server](https://www.npmjs.com/package/egg-grpc-server).

## Questions & Suggestions

Please open an issue [here](https://github.com/tw949561391/egg-grpc-client/issues).

## License

[MIT](LICENSE)
