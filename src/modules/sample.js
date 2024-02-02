import { handleAction } from "redux-actions";
import * as api from '../lib/api'

//액션 타입 선언
//한 요청 당 세 개를 만들어야 합니다.

const GET_POST ='sample/GET_POST'
const GET_POST_SUCCESS ='sample/GET_POST_SUCCESS'
const GET_POST_FAILURE ='sample/GET_POST_FAILURE'

const GET_USERS = 'sample/GET_USERS'
const GET_USERS_SUCCESS ='sample/GET_USERS_SUCCESS'
const GET_USERS_FAILURE ='sample/GET_USERS_FAILURE'

//thunk 함수를 생성 합니다.
//thunk 함수 내부에서는 시작 할 때, 성공 했을 때, 실패 했을 때 다른 액션을 디스패치 합니다.

export const getPost = id => async dispatch => {
  dispatch({type : GET_POST}) // 요청 시작한 것을 알림
  try{
    const response = await api.getPost(id)
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data
    }) //요청 성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true
    }) // 에러 발생
    throw e; // 나중에 컴포넌트단에서 에러를 조회 할수 있게 해 줌
  }
}

export const getUsers = id => async dispatch => {
  dispatch({type : GET_USERS}) // 요청 시작한 것을 알림
  try{
    const response = await api.getUsers()
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data
    }) //요청 성공
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true
    }) // 에러 발생
    throw e; // 나중에 컴포넌트단에서 에러를 조회 할수 있게 해 줌
  }
}


// 초기 상태를 선언
// 요청의 로딩 중 상태는 loading라는 객체에서 관리 합니다.

const initialstate = {
  loading: {
    GET_POST : false,
    GET_USERS: false
  },
  post : null,
  users: null
}

const sample = handleAction(
  {
    [GET_POST] : state => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST : true //요청 시작
      }
    }),
    [GET_POST_SUCCESS] : (state, action) => ({
      ...state,
      loading:{
        ...state.loading,
        GET_POST : false // 요청완료
      },
      post: action.payload
    }),
    [GET_POST_FAILURE] : (state, action) => ({
      ...state,
      loading:{
        ...state.loading,
        GET_POST : false // 요청 완료
      }
    }),
    [GET_USERS] : state => ({
      ...state,
      loading:{
        ...state.loading,
        GET_USERS : true
      }
    }),
    [GET_USERS_SUCCESS] : (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS : false // 요청 완료
      },
      users : action.payload
    }),
    [GET_USERS_FAILURE] : (state, action) => ({
      ...state,
      loading : {
        ...state.loading,
        GET_USERS : false //요청 완료
      }
    })
  },
  initialstate
);

export default sample;