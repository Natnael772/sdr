import React, { useEffect, useRef, useState } from "react";

const Carousel: React.FC = () => {
  const [sliderItems, setSliderItems] = useState<string[]>([
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
  ]);
  const [thumbnailItems, setThumbnailItems] = useState<string[]>([
    // "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
  ]);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<number | null>(null);
  const autoNextRef = useRef<number | null>(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const showSlider = (type: "next" | "prev") => {
    setSliderItems((prevItems) => {
      const newItems = [...prevItems];
      if (type === "next") {
        const firstItem = newItems.shift();
        if (firstItem) newItems.push(firstItem);
      } else {
        const lastItem = newItems.pop();
        if (lastItem) newItems.unshift(lastItem);
      }
      return newItems;
    });

    setThumbnailItems((prevItems) => {
      const newItems = [...prevItems];
      if (type === "next") {
        const firstItem = newItems.shift();
        if (firstItem) newItems.push(firstItem);
      } else {
        const lastItem = newItems.pop();
        if (lastItem) newItems.unshift(lastItem);
      }
      return newItems;
    });

    if (carouselRef.current) {
      carouselRef.current.classList.add(type);
      if (timeRef.current) clearTimeout(timeRef.current);
      timeRef.current = window.setTimeout(() => {
        carouselRef.current?.classList.remove(type);
      }, timeRunning);
    }
  };

  const handleNextClick = () => showSlider("next");
  const handlePrevClick = () => showSlider("prev");

  useEffect(() => {
    autoNextRef.current = window.setTimeout(() => {
      handleNextClick();
    }, timeAutoNext);

    return () => {
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, [sliderItems]);

  return (
    <>
      <header>
        <nav>
          <a href="#">Home</a>
          <a href="#">Contacts</a>
          <a href="#">Info</a>
        </nav>
      </header>

      <div className="carousel" ref={carouselRef}>
        <div className="list">
          {sliderItems.map((image, index) => (
            <div className="item" key={index}>
              <img src={`/${image}`} alt={`Slide ${index + 1}`} />
              <div className="content">
                <div className="author">LUNDEV</div>
                <div className="title">DESIGN SLIDER</div>
                <div className="topic">ANIMAL</div>
                <div className="des">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                  sequi, rem magnam nesciunt minima placeat, itaque eum neque
                  officiis unde, eaque optio ratione aliquid assumenda facere ab
                  et quasi ducimus aut doloribus non numquam. Explicabo,
                  laboriosam nisi reprehenderit tempora at laborum natus unde.
                  Ut, exercitationem eum aperiam illo illum laudantium?
                </div>
                <div className="buttons">
                  <button>SEE MORE</button>
                  <button>SUBSCRIBE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail">
          {thumbnailItems.map((image, index) => (
            <div className="item" key={index}>
              <img src={`/${image}`} alt={`Thumbnail ${index + 1}`} />
              <div className="content">
                <div className="title">Name Slider</div>
                <div className="description">Description</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button id="prev" onClick={handlePrevClick}>
            {"<"}
          </button>
          <button id="next" onClick={handleNextClick}>
            {">"}
          </button>
        </div>

        <div className="time"></div>
      </div>
    </>
  );
};

export default Carousel;
