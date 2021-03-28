const initialState = {
  allUserData: [],
  allNotifications: [],
  profile: null,
  myProfile: null,
  loading: false,
  errors: null,
};

export default function UIReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ALLUSERS":
      return {
        ...state,
        allUserData: action.payload,
        loading: false,
      };
    case "SET_ALLNOTIFICATIONS":
      return {
        ...state,
        allNotifications: action.payload,
        loading: false,
      };
    case "SET_MYUSER":
      return {
        ...state,
        myProfile: action.payload,
      };
    case "SET_OTHERUSER":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_ERRORS":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}
