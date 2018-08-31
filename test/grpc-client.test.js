'use strict';

const mock = require('egg-mock');

describe('test/grpc-client.test.js', () => {
    let app;
    before(() => {
        app = mock.app({
            baseDir: 'apps/grpc-client-test',
        });
        return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('should GET /', () => {
        app.grpcClient.get('passport').passport.profile.ProfileService.getUserInfo({userId: '230371e2-eb07-4b2b-aa61-73fd27c5387e'}).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
        return app.httpRequest()
            .get('/')
            .expect('hi, grpcClient')
            .expect(200);
    });
});
