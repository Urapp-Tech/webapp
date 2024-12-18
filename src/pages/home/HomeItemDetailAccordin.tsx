import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import * as React from 'react';

type Props = {
  data: Array<object>;
};

function HomeItemDetailAccordin({ data }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(`panel0`);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {data?.length > 0 ? (
        data?.map((item: any, index: number) => {
          return (
            <>
              <Accordion
                className="boxShadow bg-transparent"
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    className="flex-grow-1"
                    sx={{ width: '33%', flexShrink: 0 }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </>
          );
        })
      ) : (
        <div className="flex h-[350px] flex-col items-center justify-center">
          <span className="text-xl font-semibold">Faqs</span>
          <span>No Record Found</span>
        </div>
      )}
    </div>
  );
}

export default HomeItemDetailAccordin;
