import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";
import {useEffect} from "react"; 


const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers
}) => {
  //클래스형 컴포넌트 였다면 componentDidMount
  useEffect(() => {
    getPost(10);
    getUsers();
  }, [getPost, getUsers]);
  return(
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  )
}

export default connect(
  ({sample})=>({
    post: sample.post,
    users: sample.users,
    loadingPost : sample.loading.GET_POST,
    loadingUsers : sample.loading.GET_USERS
  }),
  {
    getPost,
    getUsers
  }
)(SampleContainer)