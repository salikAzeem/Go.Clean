import { useEffect, useState, useRef, useCallback } from "react";
import { Heart, MessageCircle, Plus, Share2, Bookmark, ChevronUp, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Story {
  _id: string;
  userId?: { name: string };
  text?: string;
  image?: string;
  createdAt?: string;
}

const API_BASE = "https://go-clean-8c5n.onrender.com";

const CommunityFeed = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [doubleTapId, setDoubleTapId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<any>(null); // ✅ FIXED
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // ✅ FIX: Proper user loading (mobile safe)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/story`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setStories(data);
        else if (data.stories) setStories(data.stories);
        else setStories([]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleDoubleTap = useCallback(
    (id: string) => {
      if (!liked.includes(id)) toggleLike(id);
      setDoubleTapId(id);
      setTimeout(() => setDoubleTapId(null), 800);
    },
    [liked, toggleLike]
  );

  const handleImageError = (storyId: string) => {
    setImageErrors((prev) => new Set([...prev, storyId]));
  };

  // ✅ FIX: Cloudinary image handling
  const getImageUrl = (story: Story) => {
    return story.image || null;
  };

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(idx);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-3 border-pink-500 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm font-medium">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide overscroll-none touch-pan-y"
    >
      {/* ✅ FIXED MOBILE BUTTON */}
      {user && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/add-story")}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[999] bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl"
        >
          <Plus size={26} />
        </motion.button>
      )}

      {stories.length === 0 && (
        <div className="h-screen snap-start flex flex-col items-center justify-center gap-4 px-4">
          <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center">
            <MessageCircle size={32} className="text-gray-600" />
          </div>
          <p className="text-xl font-bold text-white">No stories yet</p>
          <p className="text-gray-400 text-sm">Be the first to share!</p>
          {user && (
            <button
              onClick={() => navigate("/add-story")}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-semibold"
            >
              Create Story
            </button>
          )}
        </div>
      )}

      {stories.map((story, index) => {
        const imageUrl = getImageUrl(story);
        const isLiked = liked.includes(story._id);
        const isSaved = saved.includes(story._id);
        const hasImageError = imageErrors.has(story._id);

        return (
          <div
            key={story._id}
            className="h-screen snap-start snap-always relative flex items-center justify-center bg-black"
          >
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
              {imageUrl && !hasImageError ? (
                <img
                  src={imageUrl}
                  alt="story"
                  className="w-full h-full object-cover"
                  onDoubleClick={() => handleDoubleTap(story._id)}
                  onError={() => handleImageError(story._id)}
                  loading={index > 1 ? "lazy" : "eager"}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <ImageOff size={48} className="text-gray-600 mb-3" />
                  <p className="text-gray-500 text-sm">Image unavailable</p>
                </div>
              )}

              <AnimatePresence>
                {doubleTapId === story._id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-20"
                  >
                    <Heart size={100} className="text-pink-500 fill-pink-500" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RIGHT ACTIONS */}
              <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-10">
                <button onClick={() => toggleLike(story._id)}>
                  <Heart className={isLiked ? "text-pink-500 fill-pink-500" : "text-white"} />
                </button>

                <MessageCircle className="text-white" />
                <Share2 className="text-white" />

                <button onClick={() => toggleSave(story._id)}>
                  <Bookmark className={isSaved ? "fill-white" : "text-white"} />
                </button>
              </div>

              {/* USER INFO */}
              <div className="absolute bottom-6 left-4 right-20 z-10">
                <p className="text-white font-semibold">
                  {story.userId?.name || "Anonymous"}
                </p>
                <p className="text-gray-400 text-xs">
                  {getTimeAgo(story.createdAt)}
                </p>

                {story.text && (
                  <p className="text-white text-sm mt-2">{story.text}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityFeed;