const MoodRepository = require('../Repositories/mood-repository');
const sinon = require('sinon');
const chai = require('chai');

const _ = require('lodash');

mood_repo = new MoodRepository();

describe('insertOne mood using callbacks', () => {
    let insertStub;
    let data;

    beforeEach(() => {
        let response = {
            "date": "2019-04-14",
            "time": "23:50:40",
            "mood_type": "NFS the run!",
            "id": 30
        }
        insertStub = sinon.stub(mood_repo, 'insertOne').resolves(response);

        data = [
        {
            "date": "2019-04-10",
            "time": "23:50:40",
            "mood_type": "sad"
        },
        {
            "date": "2019-04-11",
            "time": "23:50:40",
            "mood_type": "happy"
        }
    ]
    })
    afterEach(() => {
        insertStub.restore();
    })


    it('Add one mood and return success message', () => {
        let body = {
            "date": "2019-04-14",
            "time": "23:50:40",
            "mood_type": "NFS the run!",
            "id": 30
        }
        mood_repo.insertOne(body).then((data) => {
            console.log("res")
            expect(insertStub).toHaveBeenCalledWith(data);
            expect(_.isArray(data)).toBe(true);
            done();
        })
    })
})
