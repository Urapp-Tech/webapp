import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrowIcon from '../icons/BackArrow';

type Props = {
  isNestedRoute?: boolean;
  title: string;
};

export default function CustomHeader({ isNestedRoute, title }: Props) {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <div className="all-categories mb-8">
      <div className="flex items-center">
        {isNestedRoute ? (
          <IconButton
            className="back-btn mr-4 text-black"
            onClick={backHandler}
          >
            <BackArrowIcon />
          </IconButton>
        ) : null}
        <h4 className="text-2xl font-semibold leading-tight text-secondary md:text-[1.375rem] md:font-bold">
          {title}
        </h4>
      </div>
    </div>
  );
}
