import React from "react";
import "./style.scss";
import { TitleBlock } from "components";

export const Contacts = () => {
  return (
    <div className="contacts">
      <TitleBlock
        titleFirst="MANILO"
        titleSecond=" — "
        titleThird="НАШІ КОНТАКТИ"
        style="titleBlock_img"
      />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1545.3569321534098!2d30.39494614202631!3d50.39862202054973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cbd792bd0c45%3A0x70464a3f6b479df3!2z0L_RgNC-0YHQv9C10LrRgiDQnNCw0YDRgtC40L3QvtCy0LAsINCh0L7RhNGW0ZfQstGB0YzQutCwINCR0L7RgNGJ0LDQs9GW0LLQutCwLCDQmtC40ZfQstGB0YzQutCwINC-0LHQuy4!5e0!3m2!1sru!2sua!4v1682932676509!5m2!1sru!2sua"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
