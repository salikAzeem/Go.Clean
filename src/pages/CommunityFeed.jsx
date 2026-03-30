import { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

const CommunityFeed = () => {

  const [stories, setStories] = useState([]);
  const [liked, setLiked] = useState({});

  useEffect(() => {
    fetch("https://go-clean-8c5n.onrender.com/api/story")
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.log(err));
  }, []);

  const toggleLike = (id) => {
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (

    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">

      {/* EMPTY STATE */}
      {stories.length === 0 && (
        <div className="h-screen flex items-center justify-center text-white bg-black">
          No stories available
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

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* GRADIENT OVERLAY (BOTTOM) */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent" />

          {/* CONTENT */}
          <div className="relative z-10 w-full max-w-2xl px-4 text-white flex flex-col justify-end h-full pb-20">

            {/* USER */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold">
                {story.userId?.name?.charAt(0) || "U"}
              </div>
              <span className="font-semibold text-lg">
                {story.userId?.name || "Unknown"}
              </span>
            </div>

            {/* TEXT */}
            <p className="text-base mb-4 leading-relaxed">
              {story.text || ""}
            </p>

            {/* ACTIONS */}
            <div className="flex items-center gap-6 mb-3">

              {/* LIKE */}
              <button onClick={() => toggleLike(story._id)}>
                <Heart
                  size={30}
                  className={`transition transform ${
                    liked[story._id]
                      ? "text-red-500 scale-125"
                      : "text-white"
                  }`}
                />
              </button>

              {/* COMMENT */}
              <MessageCircle size={30} />

            </div>

            {/* COMMENT INPUT */}
            <input
              placeholder="Add a comment..."
              className="w-full p-2 rounded bg-white/90 text-black text-sm outline-none"
            />

          </div>

        </div>

      ))}

    </div>

  );

};

export default CommunityFeed;