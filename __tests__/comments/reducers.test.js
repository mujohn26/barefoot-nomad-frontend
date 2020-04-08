import tripRequestCommentReducers from '../../src/reducers/trip_requests/commentsReducers';

describe('User trip requests reducer tests', () => {
    it('shoult get all trip request comments', () => {
        const result = tripRequestCommentReducers({ comments: [], failed: false }, {
            type: "GET_TRIP_REQUESTS_COMMENTS_SUCCESS", payload: {
                comments: {
                    "id": 126,
                    "subjectId": "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                    "subjectType": "trip request",
                    "commentorId": 94,
                    "comment": "Good evening!",
                    "createdAt": "2020-02-27T21:48:43.142Z",
                    "updatedAt": "2020-02-27T21:48:43.142Z",
                    "user": {
                        "firstName": "Nsengimana",
                        "lastName": "Dominique",
                        "email": "nsengimanavedadom@gmail.com",
                        "profileImage": "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                    }
                },
                commentsSize: 12
            }
        });
        expect(result).toEqual({
            comments: {
                "id": 126,
                "subjectId": "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                "subjectType": "trip request",
                "commentorId": 94,
                "comment": "Good evening!",
                "createdAt": "2020-02-27T21:48:43.142Z",
                "updatedAt": "2020-02-27T21:48:43.142Z",
                "user": {
                    "firstName": "Nsengimana",
                    "lastName": "Dominique",
                    "email": "nsengimanavedadom@gmail.com",
                    "profileImage": "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                }
            },
            commentsSize: 12,
            failed: false
        });
    })
    it('shoult get all trip request comments', () => {
        const result = tripRequestCommentReducers({ comments: [], failed: false }, {
            type: "GET_MORE_TRIP_REQUESTS_COMMENTS_SUCCESS", payload: {
                comments: [{
                    "id": 126,
                    "subjectId": "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                    "subjectType": "trip request",
                    "commentorId": 94,
                    "comment": "Good evening!",
                    "createdAt": "2020-02-27T21:48:43.142Z",
                    "updatedAt": "2020-02-27T21:48:43.142Z",
                    "user": {
                        "firstName": "Nsengimana",
                        "lastName": "Dominique",
                        "email": "nsengimanavedadom@gmail.com",
                        "profileImage": "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                    }
                }],
                commentsSize: 12
            }
        });
        expect(result).toEqual({
            comments: [{
                "id": 126,
                "subjectId": "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                "subjectType": "trip request",
                "commentorId": 94,
                "comment": "Good evening!",
                "createdAt": "2020-02-27T21:48:43.142Z",
                "updatedAt": "2020-02-27T21:48:43.142Z",
                "user": {
                    "firstName": "Nsengimana",
                    "lastName": "Dominique",
                    "email": "nsengimanavedadom@gmail.com",
                    "profileImage": "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                }
            }],
            commentsSize: 12,
            failed: false
        });
    })
    it('shoult catch error when trying get all trip request comments', () => {
        const result = tripRequestCommentReducers({ comments: [], failed: false }, {
            type: "GET_TRIP_REQUESTS_COMMENTS_FAILED", payload: true
        });
        expect(result).toEqual({
            comments: [],
            failed: true
        });
    })
    it('shoult save trip request comment', () => {
        const result = tripRequestCommentReducers({ comments: [], failed: false }, {
            type: "SAVE_TRIP_REQUESTS_COMMENT_SUCCESS", payload: {
                "id": 126,
                "subjectId": "3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2",
                "subjectType": "trip request",
                "commentorId": 94,
                "comment": "Good evening!",
                "createdAt": "2020-02-27T21:48:43.142Z",
                "updatedAt": "2020-02-27T21:48:43.142Z",
                "user": {
                    "firstName": "Nsengimana",
                    "lastName": "Dominique",
                    "email": "nsengimanavedadom@gmail.com",
                    "profileImage": "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                }
            }
        });
        expect(result).toEqual({
            comments: [
                {
                    id: 126,
                    subjectId: '3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2',
                    subjectType: 'trip request',
                    commentorId: 94,
                    comment: 'Good evening!',
                    createdAt: '2020-02-27T21:48:43.142Z',
                    updatedAt: '2020-02-27T21:48:43.142Z',
                    user: {
                        firstName: "Nsengimana",
                        lastName: "Dominique",
                        email: "nsengimanavedadom@gmail.com",
                        profileImage: "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                    }
                }
            ],
            failed: false
        });
    })
    it('shoult catch error when trying to save trip request comment', () => {
        const result = tripRequestCommentReducers({ comments: [], failed: false }, {
            type: "SAVE_TRIP_REQUESTS_COMMENT_FAILED", payload: true
        });
        expect(result).toEqual({
            comments: [],
            failed: true
        });
    })
    it('shoult delete trip request comment', () => {
        const result = tripRequestCommentReducers({
            comments: [
                {
                    id: 126,
                    subjectId: '3d85c8c7-9ee3-4e06-bf94-0630c7dd01d2',
                    subjectType: 'trip request',
                    commentorId: 94,
                    comment: 'Good evening!',
                    createdAt: '2020-02-27T21:48:43.142Z',
                    updatedAt: '2020-02-27T21:48:43.142Z',
                    user: {
                        firstName: "Nsengimana",
                        lastName: "Dominique",
                        email: "nsengimanavedadom@gmail.com",
                        profileImage: "https://lh3.googleusercontent.com/a-/AAuE7mDhdixQDLxzUVhrT7iqdBN4bwYI6WzjgAyyAS-5"
                    }
                }
            ], failed: false
        }, {
            type: "DELETE_TRIP_REQUESTS_COMMENT_SUCCESS", payload: 126
        });
        expect(result).toEqual({
            comments: [],
            failed: false
        });
    })
    it('shoult catch error when trying to delete trip request comment', () => {
        tripRequestCommentReducers(undefined, {
            type: "DELETE_TRIP_REQUESTS_COMMENT_FAILED", payload: true
        });
        tripRequestCommentReducers({ comments: [], failed: false }, {
            type: "ELETE_TRIP_REQUESTS_COMMENT_FAILED", payload: true
        });
        const result = tripRequestCommentReducers({ comments: [], failed: false }, {
            type: "DELETE_TRIP_REQUESTS_COMMENT_FAILED", payload: true
        });
        expect(result).toEqual({
            comments: [],
            failed: true
        });
    })
})