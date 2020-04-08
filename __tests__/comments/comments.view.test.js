import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../../src/reducers/index';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createMount } from '@material-ui/core/test-utils';
import { Comments, ModelPop, handleClose } from '../../src/components/comments/comments.view.jsx';
import Comment from '../../src/components/comments/comments.view.jsx';

const middlewares = [thunk];
const testStore = state => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(
        createStore,
    );
    return createStoreWithMiddleware(reducer, state);
};

describe('Render comments view', () => {

    const props = {
        comments: [
            {
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
        ],
        user: {
            id: 94
        },
        saveTripRequestCommentAction: jest.fn(),
        commentsSize: 13,
        getMoreTripRequestCommentsAction: jest.fn()
    };

    const store = testStore({});

    mount(
        <Provider store={store}>
            <Comment {...props} />
        </Provider>
    )


    it('should render all components successfully', () => {
        const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'md' } } })
        const theme1 = createMuiTheme({ props: { MuiWithWidth: { initialWidth: 'lg' } } })
        createMount()(
            <MuiThemeProvider theme={theme}>
                <Comments {...{
                    comments: [
                        {
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
                    ], user: { id: 3 }, commentsSize: 13
                }} />
            </MuiThemeProvider>
        );
        const wrapper = createMount()(
            <MuiThemeProvider theme={theme}>
                <Comments {...props} />
            </MuiThemeProvider>
        );
        const deleteBtn = wrapper.find('#deleteBtn').at(1);
        deleteBtn.props().onClick();

        const cancelBtn = wrapper.find('#cancelBtn').at(1);
        cancelBtn.props().onClick();

        const commentBtn = wrapper.find('#commentBtn').at(1);
        commentBtn.props().onClick();

        const infiniteScroll = wrapper.find('InfiniteScroll');
        infiniteScroll.props().next();



        const commentTextField = wrapper.find('#commentTextField').at(1);
        commentTextField.props().onChange({ target: { value: 'Hello form tester!' } });
        commentTextField.props().onChange({ target: { value: '' } });


        const wrapper1 = createMount()(
            <MuiThemeProvider theme={theme1}>
                <Comments {...props} />
            </MuiThemeProvider>
        );
        const deleteBtn1 = wrapper1.find('#deleteBtn').at(1);
        deleteBtn1.props().onClick();
        wrapper1.find('ForwardRef(Modal)').props().onClose();

        const modelPop = mount(<ModelPop deleteTripRequestCommentAction={jest.fn()} handleClose={jest.fn()} data={12} />)
        modelPop.find('#finalDeleteBtn').at(1).props().onClick();
        modelPop.find('#cancelBtn').at(1).props().onClick();
        handleClose(jest.fn())
    })
})