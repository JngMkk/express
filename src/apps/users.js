const users = [];

// * 콜백 사용
function signUpCallBack(req, res) {
  const body = req.body;

  return saveUserCallBack(body, function (body) {
    return sendEmailCallBack(body, function (body) {
      return res.json(getResultCallBack(body));
    });
  });
}

// * DB 저장 후 콜백
function saveUserCallBack(body, callback) {
  users.push(body);
  console.log(`Save ${body.name} to users table.`);

  return callback(body);
}

// * 이메일 발송 로그 후 콜백
function sendEmailCallBack(body, callback) {
  console.log(`Send email to ${body.email}`);

  return callback(body);
}

function getResultCallBack(body) {
  return `Signup ${body.name} success.`;
}

function signUpPromise(req, res) {
  const body = req.body;

  // * 비동기 호출이지만 순서를 지켜서 실행
  saveUserPromise(body)
    .then(sendEmailPromise)
    .then(getResultPromise)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}

// * Promise 객체 사용
function saveUserPromise(body) {
  const oldSize = users.length;

  users.push(body);
  console.log(`Save ${body.name} to users table.`);

  return new Promise((resolve, reject) => {
    if (users.length > oldSize) {
      resolve(body);
    } else {
      reject(new Error("SignUp Error"));
    }
  });
}

function sendEmailPromise(body) {
  console.log(`Send email to ${body.email}`);

  return new Promise((resolve, _) => {
    resolve(body);
  });
}

function getResultPromise(body) {
  return new Promise((resolve, _) => {
    resolve(`Signup ${body.name} success.`);
  });
}

const userApp = { signUpCallBack, signUpPromise };

export default userApp;
