import { useEffect, useState } from "react";
import { Heart, MessageCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommunityFeed = () => {

  const [stories, setStories] = useState([]);
  const [liked, setLiked] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetch("https://go-clean-8c5n.onrender.com/api/story")
      .then(res => res.json())
      .then(data => {
        console.log("Stories:", data);

        // ✅ FIX: handle API properly
        if (Array.isArray(data)) {
          setStories(data);
        } else if (data.stories) {
          setStories(data.stories);
        } else {
          setStories([]);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const toggleLike = (id) => {
    setLiked(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  return (

    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white relative">

      {/* ✅ FIXED BUTTON POSITION */}
      {user && (
        <button
          onClick={() => navigate("/add-story")}
          className="fixed bottom-24 right-6 z-50 bg-green-600 hover:bg-green-700 p-4 rounded-full shadow-xl"
        >
          <Plus size={26} />
        </button>
      )}

      {/* EMPTY STATE */}
      {stories.length === 0 && (
        <div className="flex flex-col items-center justify-center h-screen text-xl gap-3">
          <p>No stories found 🚫</p>
          {user && <p className="text-sm opacity-70">Click + to add story</p>}
        </div>
      )}

      {stories.map((story) => (

        <div
          key={story._id}
          className="h-screen w-full snap-start relative flex items-center justify-center"
        >

          {/* IMAGE */}
          <img
            src={
              story.image
                ? story.image.startsWith("http")
                  ? story.image
                  : `https://go-clean-8c5n.onrender.com/uploads/${story.image}`
                : "https://via.placeholder.com/600x800"
            }
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* CONTENT */}
          <div className="absolute bottom-10 left-4 right-4 z-10">

            <h2 className="font-bold text-lg">
              {story.userId?.name || "User"}
            </h2>

            <p className="text-sm mt-1">
              {story.text || ""}
            </p>

            <div className="flex gap-6 mt-3 items-center">

              <button onClick={() => toggleLike(story._id)}>
                <Heart
                  size={28}
                  className={
                    liked.includes(story._id)
                      ? "text-red-500"
                      : "text-white"
                  }
                />
              </button>

              <MessageCircle size={28} />

            </div>

          </div>

        </div>

      ))}

    </div>

  );

};

export default CommunityFeed;