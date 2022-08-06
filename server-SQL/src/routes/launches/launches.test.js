const request = require('supertest');
const app = require('../../app');

describe('TEST GET /LAUNCH', () => {
    test('It should give success 200', async () => {
        const response = await request(app)
            .get('/launches')
            .expect(200)
            .expect('Content-Type', /json/);
        // expect(response.statusCode).toBe(200);
    });
});

describe('Test Post /launch', () => {
    const completeLaunchData = {
        mission: 'USS Enterprises',
        rocket: 'NCC ufd -1',
        target: 'Keplet 186 f',
        launchDate: 'January 4,2028',
    };

    const launchDataWithoutDate = {
        mission: 'USS Enterprises',
        rocket: 'NCC ufd -1',
        target: 'Keplet 186 f',
    };

    const invalidLaunchData = {
        mission: 'USS Enterprises',
        rocket: 'NCC ufd -1',
        target: 'Keplet 186 f',
    };

    test('It should give success 200', async () => {
        const response = await request(app)
            .post('/addNewLaunch')
            .send(completeLaunchData)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(requestDate).toBe(responseDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should throw error for validations for Missing Required Fields', async () => {
        const response = await request(app)
            .post('/addNewLaunch')
            .send(invalidLaunchData)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing Required Fields',
        });
    });
});
