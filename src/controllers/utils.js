export default res => ({ message }) => {
  res.status(500).json({
    message,
  });
};
