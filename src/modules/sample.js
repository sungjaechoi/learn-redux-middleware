import { handleActions } from "redux-actions";
import * as api from '../lib/api' 
// import 시 "* as"를 사용하면 "../lib/api"에서 내보내는 모든 함수, 변수, 객체에 접근 이 가능하다.

// 액션 타입 선언 - 각 API 요청에 대해 요청 시작, 성공, 실패 액션 타입 정의
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// 게시물 조회를 위한 thunk 함수 선언
export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST }); // 요청 시작 액션 디스패치
  try {
    const response = await api.getPost(id); // API 호출
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data // 요청 성공 액션 디스패치, 응답 데이터를 payload로 설정
    });
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true // 요청 실패 액션 디스패치, 에러 객체를 payload로 설정
    });
    throw e; // 컴포넌트에서 에러를 처리할 수 있도록 예외를 던짐
  }
};

// 사용자 목록 조회를 위한 thunk 함수 선언
export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS }); // 요청 시작 액션 디스패치
  try {
    const response = await api.getUsers(); // API 호출
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data // 요청 성공 액션 디스패치, 응답 데이터를 payload로 설정
    });
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true // 요청 실패 액션 디스패치, 에러 객체를 payload로 설정
    });
    throw e; // 컴포넌트에서 에러를 처리할 수 있도록 예외를 던짐
  }
};

// 초기 상태 정의 - 로딩 상태와 데이터 상태를 관리
const initialstate = {
  loading: {
    GET_POST: false,
    GET_USERS: false
  },
  post: null,
  users: null
};

// 리듀서 - handleActions 함수를 사용하여 각 액션 타입에 따른 상태 변화를 정의
const sample = handleActions(
  {
    // 게시물 조회 시작 시 로딩 상태 true로 변경
    [GET_POST]: state => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true
      }
    }),
    // 게시물 조회 성공 시 로딩 상태 false로 변경 및 데이터 설정
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false
      },
      post: action.payload
    }),
    // 게시물 조회 실패 시 로딩 상태 false로 변경
    [GET_POST_FAILURE]: state => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false
      }
    }),
    // 사용자 목록 조회 시작 시 로딩 상태 true로 변경
    [GET_USERS]: state => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true
      }
    }),
    // 사용자 목록 조회 성공 시 로딩 상태 false로 변경 및 데이터 설정
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false
      },
      users: action.payload
    }),
    // 사용자 목록 조회 실패 시 로딩 상태 false로 변경
    [GET_USERS_FAILURE]: state => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false
      }
    })
  },
  initialstate
);

export default sample;
