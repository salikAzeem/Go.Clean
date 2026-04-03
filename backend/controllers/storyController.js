export const createStory = async (req, res) => {
  try {
    const { userId, text } = req.body;

    const story = new Story({
      userId,
      text,
      image: req.file ? req.file.path : null, // ✅ Cloudinary URL
    });

    await story.save();

    res.json({ message: "Story added", story });

  } catch (err) {
    res.status(500).json({ message: "Error creating story" });
  }
};