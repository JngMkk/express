let posts = [];

function getPosts(_, res) {
  res.json(posts);
}

function createPost(req, res) {
  const { title, name, text } = req.body;

  posts.push({ id: posts.length + 1, title, name, text, createdAt: Date() });
  res.json({ title, name, text });
}

function deletePost(req, res) {
  const id = req.params.id;

  // * +id : 문자열인 id를 integer로 변환 (== parseInt)
  // * 입력받은 게시글 id와 기존 게시글의 id가 다른 record만 filtering하여 arr에 재할당
  // * filter 대체(특정 인덱스 삭제): splice / map / reduce
  const filteredPosts = posts.filter((post) => post.id !== +id);
  const isArrChanged = posts.length !== filteredPosts.length;

  posts = filteredPosts;
  if (isArrChanged) {
    res.json("NO CONTENT");
    // * 콜백 함수를 빠르게 빠져나감. (Early Return)
    // * 코드에서 if문이 중첩되는 경우 else를 조금이라도 없앨 수 있으므로 코드 가독성 올라감.
    return;
  }

  res.json("NOT FOUND");
}

const postsApp = {
  getPosts,
  createPost,
  deletePost,
};

export default postsApp;
