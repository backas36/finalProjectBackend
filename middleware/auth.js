module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({ username: decoded.username, 'tokens.token': token })
    if (!user) { throw new Error() }
    req.token = token
    req.user = user
    next()
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}