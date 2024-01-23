import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setTimeout(() => setIndex(index < byDateDesc.length ? index + 1 : 0), 5000);
  };

  useEffect(() => {
    // Ajout verification pour voir si byDatadesc est valid Error Console

    if (byDateDesc) {
      nextCard();
    }
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Enlever les chevrons et remplacement par une div et remplacement Event.id => event.title et deplacement de la key
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Creation d'une key unique
                  key={`${_.title}-id`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
