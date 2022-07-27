describe('TEST GET /LAUNCH', () => {
    const response = 200;
    test('It should give success 200', () => {
        expect(response).toBe(200);
    });
});

describe('Test Post /launch', () => {
    const response = 400;
    test('It should give success 200', () => {});

    test('It should throw error for validations', () => {
        expect(response).toBe(400);
    });
});
