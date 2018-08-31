const protoLoader = require('@grpc/proto-loader');
const grpcCore = require('@grpc/grpc-js');
const path = require('path');
const fs = require('fs');

module.exports = async app => {
    app.addSingleton('grpcClient', async (config, app) => {
        config.default = app.config.grpcClient;
        return await createClient(config, app);
    });
};

async function createClient(config, app) {
    const service = {};
    await getAllServices(path.join(app.baseDir, config.protoPath), config, service);
    return service;
}

async function getAllServices(photoPath, config, service) {
    if (!fs.existsSync(photoPath)) {
        throw new Error('no proto file');
    }
    const photoFileList = fs.readdirSync(photoPath);
    for (const photoName of photoFileList) {
        const photoFilePath = path.join(photoPath, photoName);
        const stats = fs.statSync(photoFilePath);
        if (stats.isFile() && path.extname(photoName) === '.proto') {
            const protoObj = await protoLoader.load(photoFilePath, config.default.loaderOption || {});
            const Rpc = grpcCore.loadPackageDefinition(protoObj);
            for (const rpcpackage in protoObj) {
                const RpcCons = getServerClassByPackageName(Rpc, rpcpackage);
                const handler = getControllerClassByPackageName(service, rpcpackage);
                const client = new RpcCons(config.host + ":" + config.port,
                    grpcCore.credentials.createInsecure());
                buildService(client, handler, protoObj[rpcpackage]);
            }
        }
    }
}

function getControllerClassByPackageName(controllers, packageName) {
    const ps = packageName.split(".");
    if (!ps || ps.length === 0) {
        return null;
    }
    let controller = controllers;
    for (const p of ps) {
        if (!controller[p]) {
            controller[p] = {};
        }
        controller = controller[p];
    }
    return controller;
}

function getServerClassByPackageName(controllers, packageName) {
    const ps = packageName.split(".");
    if (!ps || ps.length === 0) {
        return null;
    }
    let controller = controllers;
    for (const p of ps) {
        controller = controller[p];
        if (!controller) {
            return null;
        }
    }
    return controller;
}


function buildService(client, service, proto) {
    for (const methoc in proto) {
        service[methoc] = (params) => {
            return new Promise((resolve, reject) => {
                client[methoc](params, (e, res) => {
                    if (e) {
                        reject(e);
                        return null;
                    } else {
                        resolve(res);
                    }
                })
            })
        }
    }
}
