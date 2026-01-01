import React from "react";

const categories = [
  {
    name: "Lehenga",
    img: "https://i.pinimg.com/736x/30/91/38/309138f530b79565f13a43fa0647ed46.jpg",
  },
  {
    name: "Kurti",
    img: "https://i.pinimg.com/1200x/b7/3a/67/b73a6758225e0ee8063768b3e1fae234.jpg",
  },
  {
    name: "Gown",
    img: "https://www.numbersea.com/cdn/shop/files/a-lineprincess-satin-lace-v-neck-sleeveless-court-train-dresses-439614.jpg?v=1741913910",
  },
  {
    name: "Salwar Suit",
    img: "https://i.pinimg.com/1200x/e5/5e/32/e55e32d7f09e446fea126056f5817ad9.jpg",
  },
  {
    name: "Ethnic Set",
    img: "https://i.pinimg.com/736x/78/fa/05/78fa057cca59416bdc5ac68e744b575e.jpg",
  },
  {
    name: "Saree",
    img: "https://i.pinimg.com/1200x/9a/9c/de/9a9cdee1bb661d528248fb8bc5d83019.jpg",
  },
];

export default function HomeSlider() {
  return (
    <section className="z_slide_section">
      <div className="container justify-content-center d-flex">
        <div className="z_slide_wrapper">
          {categories.map((item, index) => (
            <div className="z_slide_item" key={index}>
              <div className="z_slide_img_wrap">
                <img src={item.img} alt={item.name} />
              </div>
              <p className="z_slide_title">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
