import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import HomePagePopupClasses from './HomePagePopup.module.css';
import assets from '../../assets';
import { useAppDispatch } from '../../redux/redux-hooks';
import { addToCart } from '../../redux/features/cartStateSlice';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

const itemFAQs = [
  {
    question: `What if theres no care label on an item ?`,
    answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    
    It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    question: `Will my items be hung or folded too ?`,
    answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
              culpa est cumque aut unde, soluta aperiam illum. Alias saepe fuga
              corporis nisi vitae asperiores magni, fugit, perferendis inventore
              aspernatur quisquam veritatis voluptates sed amet atque ullam,
              nobis quas minima error beatae reprehenderit animi minus cum
              officia! Magnam officia libero quidem sint rerum labore ab
              exercitationem corporis totam fugiat, corrupti quas asperiores
              blanditiis, nobis dolor officiis pariatur, nam maxime. Facere
              perferendis adipisci iure velit id nesciunt, quaerat nam
              perspiciatis atque ratione culpa tenetur voluptatum necessitatibus
              temporibus ex porro sint ut at dolorum quo aut odit officia? Sunt
              necessitatibus asperiores harum nesciunt.`,
  },
  {
    question: `What if there’s no care label on an item ?`,
    answer: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
              culpa est cumque aut unde, soluta aperiam illum. Alias saepe fuga
              corporis nisi vitae asperiores magni, fugit, perferendis inventore
              aspernatur quisquam veritatis voluptates sed amet atque ullam,
              nobis quas minima error beatae reprehenderit animi minus cum
              officia! Magnam officia libero quidem sint rerum labore ab
              exercitationem corporis totam fugiat, corrupti quas asperiores
              blanditiis, nobis dolor officiis pariatur, nam maxime. Facere
              perferendis adipisci iure velit id nesciunt, quaerat nam
              perspiciatis atque ratione culpa tenetur voluptatum necessitatibus
              temporibus ex porro sint ut at dolorum quo aut odit officia? Sunt
              necessitatibus asperiores harum nesciunt.`,
  },
];

function HomePagePopup({ open, setOpen, data }: Props) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [count, setCount] = useState(1);
  const incrementCount = () => {
    setCount((previousCount) => previousCount + 1);
  };
  const decrementCount = () => {
    setCount((previousCount) => {
      if (previousCount <= 1) {
        return 0;
      }
      return previousCount - 1;
    });
  };
  const dispatch = useAppDispatch();
  const addToBasketHandler = () => {
    const cartItem = {
      id: data.id,
      image: data.image,
      name: data.name,
      price: data.price,
      quantity: count,
    };
    dispatch(addToCart(cartItem));
    setOpen(false);
  };
  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      PaperProps={{
        className: HomePagePopupClasses.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <IconButton
        onClick={() => setOpen(false)}
        className={HomePagePopupClasses.Dialog_CloseButton}
      >
        <ClearIcon />
      </IconButton>
      <div className={HomePagePopupClasses.Content}>
        <div className={HomePagePopupClasses.Grid}>
          <div>
            <img
              className={HomePagePopupClasses.ItemImage}
              src={data?.image}
              alt=""
            />
            <div className={HomePagePopupClasses.ItemName}>{data?.name}</div>
            <div className={HomePagePopupClasses.ItemDescription}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </div>
            <div className={HomePagePopupClasses.ItemPrice}>
              <div>
                <span className={HomePagePopupClasses.ItemPrice_Price}>
                  $ {data?.price.toFixed(2)}
                </span>
                <span className={HomePagePopupClasses.ItemPrice_Text}>
                  &nbsp;/ items
                </span>
              </div>
              <div className={HomePagePopupClasses.ItemPrice_ItemCount}>
                <IconButton
                  onClick={incrementCount}
                  className={
                    HomePagePopupClasses.ItemPrice_ItemCount_IconButton
                  }
                >
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
                <div className={HomePagePopupClasses.ItemPrice_ItemCount_Text}>
                  {count}
                </div>
                <IconButton
                  onClick={decrementCount}
                  className={
                    HomePagePopupClasses.ItemPrice_ItemCount_IconButton
                  }
                >
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </div>
            </div>
            <div className={HomePagePopupClasses.AddToBasket_Button_Container}>
              <Button
                type="button"
                onClick={addToBasketHandler}
                className={HomePagePopupClasses.AddToBasket_Button}
              >
                Add to Basket
              </Button>
            </div>
          </div>
          <div className={HomePagePopupClasses.Accordion_Container}>
            {itemFAQs.map((faq, index) => {
              return (
                <Accordion
                  key={index}
                  className={HomePagePopupClasses.Accordion}
                  expanded={expanded === `panel-${index}`}
                  onChange={handleChange(`panel-${index}`)}
                >
                  <AccordionSummary
                    className={HomePagePopupClasses.Accordion_Summary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${index}-content`}
                    id={`panel-${index}-header`}
                  >
                    <div
                      className={
                        HomePagePopupClasses.Accordion_Summary_Question
                      }
                    >
                      {faq.question}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    className={HomePagePopupClasses.Accordion_Details}
                  >
                    <div
                      className={HomePagePopupClasses.Accordion_Details_Text}
                    >
                      {faq.answer}
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default HomePagePopup;
