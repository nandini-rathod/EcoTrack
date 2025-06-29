import React from "react";
import "./BigCards.css";
import { Bigcard } from "../../Data/Data";

import BigCard from "./BigCards";

const Bigcards = () => {
  return (
    <div className="Cards-big">
      {Bigcard.map((card, id) => {
        return (
          <div className="parentContainer-big" key={id}>
            <BigCard
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Bigcards;
