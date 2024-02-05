import { startLoading, finishLoading } from "../modules/loading";

// export default 키워드를 사용하여 이 함수를 모듈에서 보냄
export default function createRequestThunk(type, request) {
  // 액션 타입을 정의합니다. type을 기반으로 성공 및 실패 액션을 생성
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  // 이 함수는 파라미터로 액션에 필요한 데이터를 받음
  // 이 함수는 Redux thunk를 사용하여 비동기 작업을 처리
  return params => async dispatch => {
    // 액션을 디스패치 -> 비동기 작업이 시작
    dispatch({ type });
    // startLoading 액션을 디스패치하여 로딩 상태를 시작
    dispatch(startLoading(type))

    try {
      // request 함수를 호출하여 비동기 작업을 수행하고 응답을 기다림
      const response = await request(params);

      // 성공 액션을 디스패치 비동기 작업이 성공적으로 완료됨을 나타냄
      dispatch({
        type: SUCCESS,
        payload: response.data // 응답 데이터를 액션의 payload로 설정
      });
       // finishLoading 액션을 디스패치하여 로딩 상태를 완료함 표시
      dispatch(finishLoading(type))
    } catch (e) {
      // 실패 액션을 디스패치 -> 비동기 작업이 실패했음을 나타냄
      dispatch({
        type: FAILURE,
        payload: e,      // 에러 정보를 액션의 payload로 설정
        error: true      // error 필드를 true로 설정하여 실패 상태임을 나타냄
      });
      // startLoading 액션을 다시 디스패치하여 실패 후에도 로딩 상태를 종료하지 않고 다시 시작
      dispatch(startLoading(type))
      
      // 에러를 다시 throw하여 호출자가 실패 상태를 처리할 수 있도록 함
      throw e;
    }
  };
}
