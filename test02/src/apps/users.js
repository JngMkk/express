import Users from "../schemas/users.js";

async function listUsers(_, res) {
  const users = await Users.find();

  res.send(users);
}

async function detailUsers(req, res) {
  const user = await Users.findOne({ email: req.params.emal });

  res.send(user);
}

async function createUsers(req, res) {
  const user = new Users(req.body);

  await user.save();
  res.send(user);
}

async function updateUsers(req, res) {
  const user = await Users.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true },
  );

  console.log(user);
  res.send(user);
}

async function deleteUsers(req, res) {
  await Users.deleteMany({ email: req.params.email });

  res.send({ success: true });
}

const usersApp = {
  listUsers,
  detailUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};

export default usersApp;
