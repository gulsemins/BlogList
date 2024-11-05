const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  return authorization && authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
};

contactsRouter.post("/", async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid or missing" });
  }

  const user = await User.findById(decodedToken.id);
  const contact = new Contact({ ...req.body, user: user._id });
  const savedContact = await contact.save();

  user.contacts = user.contacts.concat(savedContact._id);
  await user.save();
  res.json(savedContact);
});
