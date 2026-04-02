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

    <div className="mt-16 pb-24 min-h-screen bg-black text-white">

      {/* ✅ ADD STORY BUTTON */}
      {user && (
        <button
          onClick={() => navigate("/add-story")}
          className="fixed bottom-28 right-6 z-[9999] bg-green-600 hover:bg-green-700 p-4 rounded-full shadow-xl"
        >
          <Plus size={26} />
        </button>
      )}

      {/* ✅ EMPTY STATE */}
      {stories.length === 0 && (
        <div className="flex items-center justify-center h-[80vh] text-xl">
          No stories found 🚫
        </div>
      )}

      {/* ✅ STORIES */}
      {stories.map((story) => {

        // ✅ FIX IMAGE URL PROPERLY
        const imageUrl = story.image
          ? story.image.startsWith("http")
            ? story.image
            : `https://go-clean-8c5n.onrender.com/uploads/${story.image}`
          : null;

        return (

          <div
            key={story._id}
            className="min-h-screen flex items-center justify-center px-2 border-b border-gray-800"
          >

            {/* ✅ CARD */}
            <div className="relative w-full max-w-md h-[85vh] rounded-xl overflow-hidden bg-black shadow-2xl">

              {/* ✅ IMAGE OR FALLBACK */}
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="story"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  No Image
                </div>
              )}

              {/* ✅ OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />

              {/* ✅ CONTENT */}
              <div className="absolute bottom-6 left-4 right-4 z-10">

                {/* USER */}
                <h2 className="font-bold text-lg">
                  {story.userId?.name || "User"}
                </h2>

                {/* TEXT */}
                <p className="text-sm mt-1">
                  {story.text || ""}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-5 mt-3 items-center">

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

          </div>

        );
      })}

    </div>

  );

};

export default CommunityFeed;