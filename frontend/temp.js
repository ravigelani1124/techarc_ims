const getUserBasedOnConsultant = async (req, res) => {
  try {
    const consultantId = req.params.id; // Assuming the consultant_id is passed as a route parameter
    const users = await User.find({ consultant_id: consultantId });

    if (!users) {
      return res.status(404).json({
        status: "failed",
        message: "Users not found for the given consultant id",
      });
    }

    return res.status(200).json({
      status: "success",
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
