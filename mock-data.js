class MockData {

    mockMoods() {

        let responseObject = {
            "statusCode": 200,
            "headers": {
                'content-type': 'application/json'
            }
        }
        let responseBody = {
            "status": 'success',
            "data": [
                {
                    "id": 1,
                    "date": "2019-04-10",
                    "time": "23:50:40",
                    "mood_type": "sad"
                },
                {
                    "id": 2,
                    "date": "2019-04-11",
                    "time": "23:50:40",
                    "mood_type": "Happy"
                },
                {
                    "id": 3,
                    "date": "2019-04-12",
                    "time": "23:50:40",
                    "mood_type": "Happy"
                }
            ]
        }
    }
    // let mockMoods = {}
    // mockMoods["responseObject"] = responseObject;
    // mockMoods["responseBody"] = responseBody;

    // return mockMoods;
}
module.exports = MockData;