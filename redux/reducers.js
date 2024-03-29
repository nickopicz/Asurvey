import { combineReducers } from "redux";

import { SET_CODE, SET_DOC_ID, SET_EDITING, SET_USER_ANSWERS } from "./actions";

/**
 * reducer for the docId to access a survey to edit
 */

const docIdRed = (docIdRed = { docId: "" }, action) => {
  switch (action.type) {
    case SET_DOC_ID:
      return { docId: action.docId };
    default:
      return docIdRed;
  }
};

const codeRed = (codeRed = { code: "" }, action) => {
  switch (action.type) {
    case SET_CODE:
      return { code: action.code };
    default:
      return codeRed;
  }
};

const editingRed = (editingRed = { editing: false }, action) => {
  switch (action.type) {
    case SET_EDITING:
      return { editing: action.editing };
    default:
      return editingRed;
  }
};

const userAnswersRed = (userAnswersRed = { userAnswers: [] }, action) => {
  switch (action.type) {
    case SET_USER_ANSWERS:
      return { userAnswers: action.userAnswers };
    default:
      return userAnswersRed;
  }
};

const reducers = combineReducers({
  docIdRed,
  codeRed,
  editingRed,
  userAnswersRed,
});

export default reducers;
