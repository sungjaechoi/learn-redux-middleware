import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = ({number, increase, decrease}) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease}/>
  );
};

const mapStateToProps = state => ({
  number : state.counter
})
const mapDipatchToProps = dispatch => ({
  increase:() =>{dispatch(increase())},
  decrease:() =>{dispatch(decrease())}
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