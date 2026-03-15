import heroEnvironment from "@/assets/hero-environment.png";

const RecyclingIdeas = () => {

  const openVideo = (type: string) => {

    let url = "";

    if (type === "solid") {
      url = "https://www.youtube.com/results?search_query=solid+waste+management+recycling+process";
    }
    else if (type === "organic") {
      url = "https://www.youtube.com/results?search_query=organic+waste+composting+at+home";
    }
    else if (type === "hazardous") {
      url = "https://www.youtube.com/results?search_query=hazardous+waste+disposal+and+ewaste+management";
    }

    window.open(url, "_blank");

  };

  return (

    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 py-20"
      style={{
        backgroundImage: `url(${heroEnvironment})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md sm:max-w-3xl text-white">

        {/* TITLE */}
        <div className="mb-10">
          <div className="inline-block bg-green-600 px-8 py-3 rounded-full text-base sm:text-lg md:text-xl font-semibold shadow-lg">
            RECYCLING IDEAS
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center">

          <button
            onClick={() => openVideo("solid")}
            className="bg-green-800 hover:bg-green-900 px-6 py-4 rounded-xl text-white font-semibold w-full sm:w-72 shadow-lg transition"
          >
            SOLID WASTE
          </button>

          <button
            onClick={() => openVideo("organic")}
            className="bg-green-800 hover:bg-green-900 px-6 py-4 rounded-xl text-white font-semibold w-full sm:w-72 shadow-lg transition"
          >
            ORGANIC WASTE
          </button>

          <button
            onClick={() => openVideo("hazardous")}
            className="bg-green-800 hover:bg-green-900 px-6 py-4 rounded-xl text-white font-semibold w-full sm:w-72 shadow-lg transition"
          >
            LIQUID & HAZARDOUS WASTE
          </button>

        </div>

        {/* QUOTE */}
        <p className="mt-12 text-xs sm:text-sm md:text-base opacity-90 max-w-md mx-auto">
          "When we keep our surroundings clean, we protect not just nature,
          but our future."
        </p>

      </div>

    </section>

  );

};

export default RecyclingIdeas;