'use strict';

exports.keys = '123456';
'use strict';


exports.grpcClient = {
    host: '0.0.0.0',
    port: '50051',
    loaderOption: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    },
    clients: {
        passport: {
            protoPath: 'grpc',
            host: '0.0.0.0',
            port: '50051',
        }
    }
};
