import React, { useState } from "react";
import { Breadcrumbs } from "components";
import { ArrowRightBold } from "images/icons";
import { QuestionIcon } from "./image";
import "./style.scss";

export const Questions = () => {
  return (
    <div className="faq height_100vh">
      <div className="container_list">
        <Breadcrumbs />
        <div className="faq_header">
          <h1 className="title_container delivery_title">
            ПИТАННЯ ТА ВІДПОВІДІ
          </h1>
        </div>
        <div className="row_questions">
          <Accordion questionsAnswers={questionsAnswers} />
          <div className="question_icon">
            <QuestionIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

const Accordion = (props: {
  questionsAnswers: Array<{ question: string; answer: string }>;
  title?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const renderedQuestionsAnswers = questionsAnswers.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
    const arrowDown = index === activeIndex ? "arrow_turned_down" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";

    return (
      <AccordionItem
        arrowDown={arrowDown}
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index + 1}
        onClick={() => {
          setActiveIndex(index);
        }}
      />
    );
  });

  return (
    <div className="faq_block">
      <h1 className="faq_title">{props.title}</h1>
      <dl className="faq_list">{renderedQuestionsAnswers}</dl>
    </div>
  );
};

interface IAccordionItem {
  showDescription: string;
  ariaExpanded: string;
  fontWeightBold: string;
  item: any;
  index: number;
  onClick: () => void;
  arrowDown: string;
}
const AccordionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
  arrowDown,
}: IAccordionItem) => {
  const [isArrowUpRotated, setIsArrowUpRotated] = useState(false);
  return (
    <div className={`faq_question ${showDescription}`} key={item.question}>
      <span className="questions_index">0{index}</span>
      <div className="faq_question__content">
        <button
          className={`faq_list__title ${fontWeightBold}`}
          onClick={() => {
            onClick();
            setIsArrowUpRotated(!isArrowUpRotated);
          }}
        >
          {item.question}
          <div className={`arrow_up ${isArrowUpRotated ? arrowDown : ""}`}>
            <ArrowRightBold />
          </div>
        </button>
        <p
          id={`faq${index + 1}_desc`}
          className={`faq_list__text ${
            isArrowUpRotated ? showDescription : ""
          }`}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const questionsAnswers = [
  {
    question: "Як оформити замовлення на сайті?",
    answer:
      "Після вибору товару натисніть кнопку 'Додати в кошик'. Перейдіть у кошик (кнопка у верхньому правому куті), там будуть перераховані всі вибрані вами товари і натискайте кнопку 'Оформити замовлення'. Після введення необхідної інформації про доставку товару для оформлення замовлення вам потрібно натиснути кнопку 'Відправити замовлення'. Через деякий час після оформлення покупки, з вами зв'яжеться наш менеджер за контактними даними, вказаними при оформленні замовлення. З менеджером можна буде узгодити деталі замовлення. Зробіть своє замовлення зараз та насолоджуйтесь приємними покупками!",
  },
  {
    question: "Термін відправлення замовлення?",
    answer:
      "Термін відправлення замовлення залежить від кількох факторів, включаючи час отримання оплати та наявність товару. Зазвичай, після отримання оплати, ми оформлюємо та відправляємо ваше замовлення протягом 2-5 робочих днів. Індивідуальний пошив займає до 10 робочих дні.  Важливо враховувати, що вихідні та святкові дні можуть вплинути на терміни комплектації та доставки. Ми робимо все можливе, щоб якнайшвидше обробити та відправити ваше замовлення, щоб ви могли насолоджуватися нашими продуктами.",
  },
  {
    question:
      "Як можливо внести зміни в існуюче замовлення або анулювати його?",
    answer: `Для внесення змін в існуюче замовлення або його анулювання, будь ласка, зв'яжіться з нашим менеджером. Він допоможе вам з будь-якими змінами, які ви бажаєте внести до вашого замовлення. Якщо ви бажаєте анулювати замовлення, воно буде автоматично скасовано, якщо оплата не була здійснена. Наша команда завжди готова допомогти вам з будь-якими питаннями, пов'язаними з вашим замовленням.`,
  },
  {
    question: "Що робити, якщо товар мені не підійшов?",
    answer: `Якщо товар, який ви придбали, виявився не підходящим, ви завжди можете обміняти його протягом 14 днів з моменту покупки. Окрім індивідуального пошиву, не повертається. Для обміну товару необхідно зберегти його товарний вигляд, упаковку, етикетку та товарну накладну. Якщо ви вирішили повернути товар, будь ласка, ознайомтеся з умовами Повернення та обміну, щоб дізнатися про процедуру повернення та отримання повернення коштів. Наша команда завжди готова надати вам допомогу та відповісти на всі ваші запитання щодо повернення або обміну товару.`,
  },
  {
    question: "Хто оплачує пересилку товару при поверненні?\n",
    answer: `При поверненні товару, витрати, пов'язані з його доставкою, оплачує покупець. Однак, у випадку виробничого дефекту або помилки з боку інтернет-магазину, доставку оплачує сам магазин. Наша команда завжди готова надати вам додаткову інформацію та відповісти на всі ваші запитання щодо процедури повернення та оплати доставки.`,
  },
];
