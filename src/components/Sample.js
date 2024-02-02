const Sample = ({lodingPost, lodingUsers, post, users}) => {
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {lodingPost && '로딩 중...'}
        {!lodingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자 목록</h1>
        {lodingUsers && '로딩 중...'}
        {!lodingUsers && users && (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.username}({user.email})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Sample;