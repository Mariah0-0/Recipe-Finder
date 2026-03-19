import Card from "../Ui/Card";

const Featured = () => {
  const Recipes = [
    {
      id: "52805",
      name: "Lamb Biryani",
      thumb:
        "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
      rating: 5,
    },
    {
      id: "52903",
      name: "French Onion Soup",
      thumb:
        "https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg",
      rating: 4,
    },
    {
      id: "52860",
      name: "Chocolate Raspberry Brownies",
      thumb:
        "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
      rating: 4.5,
    },
  ];

  return (
    <div className="container mt-1 mb-40 w-full">
      <svg
        width="690"
        height="616"
        viewBox="0 0 690 616"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 -translate-x-1/2 w-[100vw] mr-[-0.5rem] ml-[-0.5rem] h-auto pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <path
          d="M0 73C0 73 14.1485 57.5 29 57.5C43.8515 57.5 52.8614 113 68 113C106.5 113 110.5 0 137 0C163.5 0 168 113 191.5 113C215 113 220.732 52.8828 246 52.5C271.268 52.1172 257 150.5 282.5 150.5C329.738 150.5 292.262 17.5 339.5 17.5C370.5 17.5 358.5 113 387 113C415.384 113 412.116 73 440.5 73C469 73 461.809 121.5 488.5 121.5C531.5 121.5 517.5 25 540.5 25C563.5 25 554 105 577 105C600 105 590.758 52.5 618 52.5C647 52.5 638 137.5 660 137.5C682 137.5 690 113 690 113V526.5C690 526.5 690 615.5 660 615.5C630 615.5 648 526.5 626 526.5C604 526.5 618 589.5 591 589.5C548.984 589.5 583 494.5 540.5 494.5C500.826 494.5 540.5 589.5 504.5 589.5C464.338 589.5 482 509 440.5 509C393.956 509 434 615.5 387 615.5C349.58 615.5 378.5 526.5 339.5 526.5C314.408 526.5 318 558 291.5 558C263.818 558 279.5 494.5 248 494.5C204.835 494.5 233.5 589.5 191.5 589.5C163.066 589.5 175 526.5 146.5 526.5C120.022 526.5 122.5 567.5 95 567.5C55.3195 567.5 80 487 38.5 487C0.425884 487 0 567.5 0 567.5V73Z"
          fill="#F1C1C8"
        />
      </svg>

      <div className="relative px-25 pt-110 h-45 w-full flex items-center gap-5">
        <h1 className="text-5xl inline">Featured Recipes</h1>
        <span className="inline-block bg-[var(--accent)] h-1 flex-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-30">
        {Recipes.map((r) => (
          <Card
            key={r.id}
            id={r.id}
            img={r.thumb}
            title={r.name}
            rating={r.rating}
            isFavorited={false}
            onFavoriteToggle={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
