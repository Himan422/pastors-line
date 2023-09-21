import {
  OPEN_MODAL,
  OPEN_DETAILED_MODAL,
  CLOSE_MODAL,
  CLOSE_DETAILED_MODAL,
} from "../actions/modalActions";

const initialState = {
  showModal: false,
  showDetailedModal: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, showModal: true };
    case OPEN_DETAILED_MODAL:
      return { ...state, showDetailedModal: true };
    case CLOSE_MODAL:
      return { ...state, showModal: false };
    case CLOSE_DETAILED_MODAL:
      return { ...state, showDetailedModal: false };
    default:
      return state;
  }
};

export default modalReducer;
