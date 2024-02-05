import { createAction, handleActions } from 'redux-actions';

// 액션 타입 상수를 정의
const START_LOADING = 'loading/START_LOADING'; // 로딩 시작 액션 타입
const FAILURE_LOADING = 'loading/FAILURE_LOADING'; // 로딩 실패 액션 타입

// createAction 함수를 사용하여 액션 생성자 함수를 정의
// startLoading 액션 생성자는 requestType을 파라미터로 받고 START_LOADING 액션을 생성
export const startLoading = createAction(
  START_LOADING,
  requestType => requestType // 액션의 payload에 requestType을 전달
);

// finishLoading 액션 생성자는 requestType을 파라미터로 받고 FAILURE_LOADING 액션을 생성
export const finishLoading = createAction(
  FAILURE_LOADING,
  requestType => requestType // 액션의 payload에 requestType을 전달
);

// 초기 상태를 정의
const initialState = {};

// handleActions 함수를 사용하여 리듀서를 정의
const loading = handleActions(
  {
    // START_LOADING 액션 핸들러: state 객체에 requestType을 속성으로 추가하고 값을 true로 설정
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true
    }),
    // FAILURE_LOADING 액션 핸들러: state 객체에서 requestType 속성을 false로 설정
    [FAILURE_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false
    })
  },
  initialState // 초기 상태를 지정합니다.
);

// 리듀서를 내보냅니다.
export default loading;
