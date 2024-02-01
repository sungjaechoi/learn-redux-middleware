import { connect } from "react-redux";
import { increaseAsync, decreaseAsync } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = ({number, increaseAsync, decreaseAsync}) => {
  return (
    <Counter number={number} onIncrease={increaseAsync} onDecrease={decreaseAsync}/>
  );
};

const mapStateToProps = state => ({
  number : state.counter
})
const mapDipatchToProps = dispatch => ({
  increaseAsync:() =>{dispatch(increaseAsync())},
  decreaseAsync:() =>{dispatch(decreaseAsync())}
})

export default connect(mapStateToProps, mapDipatchToProps)(CounterContainer)

//connect 익명함수 사용

// export default connect(
//   state => ({
//     number: state.counter
//   }),
//   {
//     increase,
//     decrease
//   }
// )(CounterContainer)