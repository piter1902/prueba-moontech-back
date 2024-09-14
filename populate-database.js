// Ejecutar este script desde mongosh (cli de MongoDb)

db.users.insertOne({
  name: "Pedro",
  password: "$2b$10$kx4InJ9Lwcv6QNrI0R9oluoGEcxeLSdiYKF6xtI4Te9eJ5f4qPiDS",
  email: "pedro@allue.eu",
  active: true,
});
db.users.insertOne({
  name: "User 1",
  password: "$2b$10$kx4InJ9Lwcv6QNrI0R9oluoGEcxeLSdiYKF6xtI4Te9eJ5f4qPiDS",
  email: "user1@allue.eu",
  active: true,
});
db.users.insertOne({
  name: "User 2",
  password: "$2b$10$kx4InJ9Lwcv6QNrI0R9oluoGEcxeLSdiYKF6xtI4Te9eJ5f4qPiDS",
  email: "user2@allue.eu",
  active: false,
});
db.users.insertOne({
  name: "User 3",
  password: "$2b$10$kx4InJ9Lwcv6QNrI0R9oluoGEcxeLSdiYKF6xtI4Te9eJ5f4qPiDS",
  email: "user3@allue.eu",
  active: true,
});
