import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useState } from 'react';

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
    <div className="general-page p-4 sm:p-5 xl:p-7">
      <h4 className="page-heading mb-5">FAQ&apos;s</h4>
      <div className="general-card">
        <h6 className="heading-sm">
          Can you clean items with leather, velvet, suede or fur ?
        </h6>
        <p className="text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p className="text">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using &apos;Content here, content here&apos;,
          making it look like readable English. Many desktop publishing packages
          and web page editors now use Lorem Ipsum as their default model text,
          and a search for &apos;lorem ipsum&apos; will uncover many web sites
          still in their infancy. Various versions have evolved over the years,
          sometimes by accident, sometimes on purpose (injected humour and the
          like).
        </p>
        <div className="faqs-accordion">
          {faqs.map((faq, index) => {
            return (
              <Accordion
                key={index}
                className="accordion-item"
                expanded={expanded === `panel-${index}`}
                onChange={handleChange(`panel-${index}`)}
              >
                <AccordionSummary
                  className="accordion-header"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                >
                  <h6 className="heading">{faq.question}</h6>
                </AccordionSummary>
                <AccordionDetails className="accordion-body">
                  <p className="desc">{faq.answer}</p>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FAQSPage;
