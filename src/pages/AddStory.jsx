const AddStory = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const submit = async () => {

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("text", text);
    formData.append("image", image);

    await fetch("https://go-clean-8c5n.onrender.com/api/story", {
      method: "POST",
      body: formData
    });

    alert("Story added!");
  };

  if (!user) return <p>Please login</p>;

  return (
    <div className="p-5">

      <textarea
        placeholder="Share your story..."
        onChange={(e) => setText(e.target.value)}
      />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button onClick={submit}>Post Story</button>

    </div>
  );
};