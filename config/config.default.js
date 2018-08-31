'use strict';


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
    }
    // clients: {
    //     server1: {
    //         protoPath: 'app/grpc',
    //         host: '0.0.0.0',
    //         port: '50051'
    //     },
    //     server2:{
    //         protoPath: 'app/grpc',
    //         host: '0.0.0.0',
    //         port: '50051'
    //     }
    // }
};
