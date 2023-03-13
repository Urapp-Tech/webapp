import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'What if there’s no care label on an item ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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
    question: 'Will my items be hung or folded too ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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
    question: 'What if there’s no care label on an item ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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
    question: 'Will my items be hung or folded too ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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
    question: 'What if there’s no care label on an item ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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
    question: 'Will my items be hung or folded too ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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
    question: 'What if there’s no care label on an item ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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
    question: 'Will my items be hung or folded too ?',
    answer: `  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
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

function FAQSPage() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div className="container px-5 py-5">
      <div className="font-open-sans text-3xl font-semibold text-neutral-900">
        FAQ&apos;s
      </div>
      <div className="my-4 rounded-xl bg-gray-50 px-4 py-4 shadow-md">
        <div className="mb-2 font-open-sans text-base font-semibold text-neutral-900">
          Can you clean items with leather, velvet, suede or fur ?
        </div>
        <div className="mb-5 font-open-sans text-sm font-normal text-neutral-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. <br /> <br /> It is a long
          established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. The point of using Lorem
          Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using &apos;Content here, content here&apos;, making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for &apos;lorem ipsum&apos; will uncover many web sites still
          in their infancy. Various versions have evolved over the years,
          sometimes by accident, sometimes on purpose (injected humour and the
          like).
        </div>
        {faqs.map((faq, index) => {
          return (
            <Accordion
              key={index}
              className="m-0 bg-transparent shadow-none"
              expanded={expanded === `panel-${index}`}
              onChange={handleChange(`panel-${index}`)}
            >
              <AccordionSummary
                className="bg-transparent"
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <div className="font-open-sans text-base font-medium text-neutral-900">
                  {faq.question}
                </div>
              </AccordionSummary>
              <AccordionDetails className="p-0 pb-4">
                <div className=" px-4 font-open-sans text-sm font-normal text-neutral-500">
                  {faq.answer}
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

export default FAQSPage;
