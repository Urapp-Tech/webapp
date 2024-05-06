/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-syntax */

import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CircularProgress } from '@mui/material';
import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomInputBox from '../../components/common/CustomInputBox';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Notify from '../../components/common/Notify';
import TimePicker from '../../components/common/TimePicker';
import TopBar from '../../components/common/TopBar';
import { AddAppointmentForm } from '../../interfaces/app.appointment';
import storeAppointmentService from '../../services/store-appointment.service';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import { PATTERN, MAX_LENGTH_EXCEEDED, GENDER } from '../../utilities/constant';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import {
  fetchCategories,
  setSelectedCategory,
} from '../../redux/features/storeCategorySlice';
import { Category } from '../../interfaces/serviceCategory.interface';
import { fetchCategoriesItems } from '../../redux/features/storeCategoryItemsSlice';
import Loader from '../../components/common/Loader';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

export default function AddAppointmentPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [isPageLoader, setIsPageLoader] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [activeBarber, setActiveBarber] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [activeBarberData, setActiveBarberData] = useState<any>();
  const [, /* bookingList */ setBookingList] = useState<any>();
  // const [catLovlist, setCatLovList] = useState<any>();
  const { categories: catLovlist, selectedCategory } = useAppSelector(
    (state) => state.storeCategoryState
  );
  const { categoryItems: catItemsLovlist, selectedCategoryItems } =
    useAppSelector((state) => state.storeCategoryItemState);

  // const [catItemsLovlist, setCatItemsLovList] = useState<any>([]);
  const [usedCatItemsLovlist, setusedCatItemsLovList] = useState<any>([]);
  const [barberList, setBarberList] = useState<any>([]);
  // const [prevBookedAppointment, setPrevBookedAppointment] = useState<any>([]);
  const [empId, setEmpId] = useState<any>();
  const [appointmentTime, setAppointmentTime] = useState<dayjs.Dayjs | any>(
    null
  );
  const { systemConfig } = useAppSelector((x) => x.appState);
  const user = useAppSelector((state) => state.authState.user);
  const [appointmentBookedTime, setAppointmentBookedTime] = useState<
    Array<any>
  >([]);
  const [tempAppointmentBookedTime, setTempAppointmentBookedTime] = useState<
    Array<any>
  >([]);

  const [tmpId, setTmpId] = useState<any>(0);

  const [selectedScheduleTime, setSelectedScheduleTime] = useState<any>({
    startTime: undefined,
    endTime: undefined,
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
    control,
  } = useForm<AddAppointmentForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'appointments', // Name of the array field
    keyName: 'key',
  });

  const getCatItemName = (id: any) => {
    let tempAr: any[] = [];
    tempAr = usedCatItemsLovlist;
    return tempAr?.find((el: any) => el.id === id)?.name;
  };

  const pagination = {
    clickable: true,
    renderBullet(index: number, className: any) {
      return `<span class="${className}"></span>`;
    },
  };

  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const getBookedTimeSlots = async (id: any, date: any) => {
    await storeAppointmentService
      .getBarberBookedTimeSlots(id, date)
      .then((res) => {
        if (res.data.success) {
          setEmpId(id);
          const bookedTime = res.data.data.map((resp: any) => ({
            ...resp,
            appointmentTime: dayjs(resp.appointmentTime),
          }));
          // setAppointmentBookedTime(tempBookedTime);
          // console.log('tempBookedTime:::::::', tempBookedTime);
          /*  if (bookedTime.length > 0) {
            setTempAppointmentBookedTime((prevArr: any) => [
              ...prevArr,
              bookedTime,
            ]);
          } */

          setAppointmentBookedTime(bookedTime);

          // console.log('tempArr:::::::::', tempArr);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function BarberCard(item: any, index: number) {
    const onHandleBarber = async () => {
      if (index === activeBarber) {
        setActiveBarber(null);
        setActiveBarberData(null);
        setBookingList(null);
        let newFilter = [];
        if (tempAppointmentBookedTime.length > 0) {
          newFilter = tempAppointmentBookedTime.filter(
            (itemFilter: any) =>
              itemFilter.storeEmployee === item.storeEmployee.id
          );
        }
        setAppointmentBookedTime(newFilter);
      } else {
        setBookingList(item.storeEmployeeSchedule);
        setActiveBarberData(item);
        setActiveBarber(index);
        if (item.storeEmployee.id !== empId) {
          getBookedTimeSlots(
            item.storeEmployee.id,
            dayjs(getValues('appointmentDate'))?.format('YYYY-MM-DD')
          );
        }
      }
    };

    const getAvatarName: any = (name: string | undefined) => {
      const ProfileName = name?.split(' ');
      const initials = ProfileName?.map((part) => part.charAt(0).toUpperCase());
      return initials?.join('');
    };

    return (
      <div
        onClick={onHandleBarber}
        className={`${
          index === activeBarber && 'bg-background'
        } w-[100%] cursor-pointer rounded-2xl border-[1px] border-[#949EAE] px-3 py-4`}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#003E80]">
            {getCatItemName(item.storeServiceCategoryItem)}
          </span>
          <div className="flex items-center">
            <img
              className="h-[14px] w-[14px]"
              src={assets.images.Star}
              alt="avatar-img"
            />
            <span className="ml-1 text-sm font-semibold">4.9</span>
          </div>
        </div>
        <div className="my-6 text-center">
          <div className="flex items-center justify-center">
            {item.storeEmployee.avatar ? (
              <img
                className="my-2 h-[55px] w-[55px]"
                src={item.storeEmployee.avatar}
                alt="avatar-img"
              />
            ) : (
              <Avatar className="my-2 h-[55px] w-[55px]">
                {getAvatarName(item.storeEmployee.name)}
              </Avatar>
            )}
          </div>
          <span className="text-sm font-semibold">
            {item.storeEmployee.name}
          </span>
        </div>
      </div>
    );
  }

  const selectCategory = (categoryId: string) => {
    const cat = catLovlist.find((x) => x.id === categoryId);
    if (cat) {
      dispatch(setSelectedCategory(cat));
      // setSelectedItem(cat);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setValue('name', `${user?.firstName} ${user?.lastName}`);
      setValue('email', user.email);
      setValue('phone', user.phone);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchCategories(systemConfig?.tenant));
  }, []);

  const getBarbers = async (id: any) => {
    setIsPageLoader(true);
    await storeAppointmentService
      .getBarbersList(id, { tenant: systemConfig?.tenant })
      .then((res: any) => {
        if (res.data.success) {
          setIsPageLoader(false);
          setBarberList(res.data.data);
          setActiveBarberData(null);
          setBookingList(null);
          setActiveBarber(null);
        } else {
          setIsPageLoader(false);
        }
      })
      .catch((error: any) => {
        setIsPageLoader(false);
      });
  };

  useEffect(() => {
    const uniqueData = catItemsLovlist.filter(
      (item: any) =>
        !usedCatItemsLovlist.some(
          (existingItem: any) => existingItem.id === item.id
        )
    );
    setusedCatItemsLovList([...usedCatItemsLovlist, ...uniqueData]);
  }, [catItemsLovlist]);

  useEffect(() => {
    if (
      selectedCategory?.id &&
      (getValues('categoryId') === undefined ||
        getValues('categoryId') === 'none')
    ) {
      setValue('categoryId', selectedCategory?.id);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (
      selectedCategoryItems?.id &&
      (getValues('storeServiceCategoryItem') === undefined ||
        getValues('storeServiceCategoryItem') === 'none')
    ) {
      setValue('storeServiceCategoryItem', selectedCategoryItems?.id);
    }
  }, [selectedCategoryItems, catItemsLovlist]);

  useEffect(() => {
    if (
      getValues('categoryId') !== undefined &&
      getValues('categoryId') !== 'none'
    ) {
      setBarberList([]);
      setValue('storeServiceCategoryItem', 'none');
      selectCategory(watch('categoryId'));
      dispatch(
        fetchCategoriesItems({
          tenant: systemConfig?.tenant,
          categoryId: watch('categoryId'),
        })
      );
    }
  }, [watch('categoryId')]);

  useEffect(() => {
    if (
      getValues('storeServiceCategoryItem') !== undefined &&
      getValues('storeServiceCategoryItem') !== 'none'
    ) {
      getBarbers(watch('storeServiceCategoryItem'));
    }
  }, [watch('storeServiceCategoryItem')]);

  function checkDuplicateServices(
    array: any,
    targetEmployee: string,
    targetCategoryItem: string,
    targetDate: any
  ) {
    for (const obj of array) {
      if (
        obj.storeEmployee === targetEmployee &&
        dayjs(obj.appointmentTime).format('YYYYMMDD') ===
          dayjs(getValues('appointmentDate')).format('YYYYMMDD') &&
        obj.storeServiceCategoryItem === targetCategoryItem
      ) {
        return true; // Found a matching object
      }
    }
    return false; // No matching object found
  }

  useEffect(() => {
    const currentDay = dayjs(getValues('appointmentDate')).format('dddd');
    const scheduleData = activeBarberData?.storeEmployeeSchedule.find(
      (item: any) => item.workDay === currentDay
    );
    setSelectedScheduleTime({
      startTime: dayjs(scheduleData?.startTime),
      endTime: dayjs(scheduleData?.endTime),
    });
  }, [activeBarberData]);

  const addAppointmentServices = () => {
    const obj = {
      id: 0,
      barber: activeBarberData?.storeEmployee?.name,
      amount: activeBarberData?.amount,
      storeServiceCategory: watch('categoryId'),
      serviceTime: activeBarber?.serviceTime,
      storeServiceCategoryItem: watch('storeServiceCategoryItem'),
      storeEmployee: activeBarberData?.storeEmployee?.id,
      appointmentTime: `${dayjs(getValues('appointmentDate'))?.format(
        'YYYY-MM-DD'
      )} ${dayjs(appointmentTime)?.format('HH:mm:ss')}`,
    };

    if (
      watch('storeServiceCategoryItem') &&
      activeBarberData &&
      getValues('appointmentDate') &&
      appointmentTime
    ) {
      const currentDay = dayjs(getValues('appointmentDate')).format('dddd');
      const scheduleData = activeBarberData?.storeEmployeeSchedule.find(
        (item: any) => item.workDay === currentDay
      );
      const startTime = dayjs(scheduleData?.startTime).format('HH:mm');
      const endTime = dayjs(scheduleData?.endTime).format('HH:mm');
      let prevTime = dayjs(scheduleData?.startTime).format('HH:mm');
      const time: any = dayjs(appointmentTime).format('HH:mm');
      const addTime = dayjs(appointmentTime).add(
        activeBarberData?.serviceTime,
        'minute'
      );
      const selectedAppointmentTime = dayjs(appointmentTime).format('HH:mm');
      const convertAppointmentAddTime = dayjs(addTime).format('HH:mm');
      if (scheduleData) {
        if (
          selectedAppointmentTime >= startTime ||
          selectedAppointmentTime <= endTime
        ) {
          const isDuplicate = checkDuplicateServices(
            fields,
            activeBarberData?.storeEmployee?.id,
            watch('storeServiceCategoryItem'),
            watch('appointmentDate')
          );
          if (!isDuplicate) {
            //
            if (fields?.length > 0) {
              fields?.forEach((item: any) => {
                const add = dayjs(item.appointmentTime).add(
                  item.serviceTime,
                  'minute'
                );
                const elStartTime = dayjs(item.appointmentTime).format('HH:mm');
                const convertAddTime: any = dayjs(add).format('HH:mm');
                if (
                  dayjs(getValues('appointmentDate')).format('YYYYMMDD') !==
                  dayjs(item.appointmentTime).format('YYYYMMDD')
                ) {
                  if (elStartTime > startTime || elStartTime < endTime) {
                    console.log('if mee 1');
                    if (time > convertAddTime) {
                      console.log('if mee 2');
                      prevTime = convertAddTime;
                    } else if (
                      convertAppointmentAddTime >= elStartTime &&
                      dayjs(getValues('appointmentDate')).format('YYYYMMDD') ===
                        dayjs(item.appointmentTime).format('YYYYMMDD')
                    ) {
                      setIsNotify(true);
                      setNotifyMessage({
                        text: `Service time is ${activeBarberData?.serviceTime} minutes, Barber is not avaiable at ${time}`,
                        type: 'error',
                      });
                      throw new Error('Error');
                    }
                  } else {
                    console.log('if mee 4');
                    setIsNotify(true);
                    setNotifyMessage({
                      text: 'Barber is not avaiable at this time',
                      type: 'error',
                    });
                    throw new Error('Error');
                  }
                }
              });
            }
            // return;

            appointmentBookedTime.forEach((el: any) => {
              // for (const key of Object.keys(appointmentBookedTime)) {
              //   const index = key;
              //   const el = appointmentBookedTime[index];
              // console.log('El', el);
              // console.log('activeBarberData', activeBarberData);
              console.log('hello its me 1');
              if (
                el.storeEmployee === activeBarberData?.storeEmployee?.id &&
                dayjs(el.appointmentTime).format('HH:mm') !== time
              ) {
                console.log('hello its me 2', el);
                const add = dayjs(el.appointmentTime).add(
                  el.serviceTime,
                  'minute'
                );
                const elStartTime = dayjs(el.appointmentTime).format('HH:mm');
                const convertAddTime: any = dayjs(add).format('HH:mm');
                // console.log(
                //   '🚀 ~ appointmentBookedTime.forEach ~ elStartTime:',
                //   elStartTime,
                //   convertAddTime
                // );
                console.log('elStartTime', elStartTime);
                console.log('startTime', startTime);
                console.log('endTime', endTime);
                if (elStartTime > startTime || elStartTime < endTime) {
                  console.log('if mee 1');
                  if (time > convertAddTime) {
                    console.log('if mee 2');
                    // console.log('if');
                    prevTime = convertAddTime;
                  } else if (
                    time <= prevTime ||
                    convertAppointmentAddTime >= elStartTime
                  ) {
                    setIsNotify(true);
                    setNotifyMessage({
                      text: `Service time is ${activeBarberData?.serviceTime} minutes, Barber is not avaiable at ${time}`,
                      type: 'error',
                    });
                    throw new Error('Error');
                  }
                } else {
                  console.log('if mee 4');
                  setIsNotify(true);
                  setNotifyMessage({
                    text: 'Barber is not avaiable at this time',
                    type: 'error',
                  });
                  throw new Error('Error');
                }
              }
              // return;
            });
            // }
            setTmpId((prevId: any) => prevId + 1);
            const newData = {
              id: tmpId,
              appointmentTime: getValues('appointmentDate'),
              email: activeBarberData?.storeEmployee?.email ?? 'abc@gmail.com',
              gender: 'male',
              name: activeBarberData?.storeEmployee?.name ?? 'urapp',
              note: 'demo',
              phone: activeBarberData?.storeEmployee?.phone,
              serviceTime: activeBarberData?.serviceTime,
              status: 'New',
              storeEmployee: activeBarberData?.storeEmployee?.id,
              storeServiceCategory: '12345',
              storeServiceCategoryItem:
                activeBarberData?.storeServiceCategoryItem,
            };
            obj.id = tmpId;
            setTempAppointmentBookedTime((prev: any) => [...prev, newData]);
            // setAppointmentBookedTime((prev: any) => [...prev, newData]);
            // setPrevBookedAppointment(newData);
            append(obj);
          } else {
            // console.log("5");
            setIsNotify(true);
            setNotifyMessage({
              text: 'This service you already selected, Please select another service',
              type: 'error',
            });
          }
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: `Barber is not avaiable at ${selectedAppointmentTime}`,
            type: 'error',
          });
        }
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: `Barber is not avaiable at ${currentDay}`,
          type: 'error',
        });
      }
    } else {
      // console.log("6");
      setIsNotify(true);
      setNotifyMessage({
        text: 'Please select your preferred barber, category , desired services, and appointment date & time for scheduling.',
        type: 'error',
      });
    }
  };

  const onSubmit = (data: any) => {
    setIsLoader(true);
    delete data.storeServiceCategoryItem;
    delete data.storeServiceCategory;
    delete data.categoryId;
    delete data.appointmentDate;
    const updatedAppointmentArray = data.appointments.map((item: any) => {
      const { ...rest } = item;
      return rest;
    });
    data.appointments = updatedAppointmentArray;
    storeAppointmentService
      .appointmentCreate(data, {
        tenant: systemConfig?.tenant,
        app_user: user?.id,
      })
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'success',
          });
          setTimeout(() => {
            navigate('/dashboard/appointments-history');
          }, 500);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: any) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const handleDateChange = (date: any, field: any) => {
    if (activeBarberData) {
      field.onChange(date);
      getBookedTimeSlots(
        activeBarberData.storeEmployee.id,
        dayjs(date)?.format('YYYY-MM-DD')
      );
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'First select barber before selecting appointment date & time',
        type: 'error',
      });
    }
  };

  const removeBookinkList = (item: any) => {
    setTempAppointmentBookedTime((arr: any) =>
      arr.filter((filterItem: any) => filterItem.id !== item.id)
    );
    setAppointmentBookedTime((arr: any) =>
      arr.filter((filterItem: any) => filterItem.id !== item.id)
    );
  };

  return (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      {/* <TopBar isNestedRoute title="Fill Appointment Form" /> */}
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="p-3">
            <span className="text-base font-bold text-[#1A1A1A]">Add Info</span>
            <hr className="my-4 border-[#949EAE]" />
            <form
              // className="overflow-auto px-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="FormBody">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <div className="FormFields grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            maxLetterLimit={50}
                            pattern={PATTERN.CHAR_SPACE_DASH}
                            inputTitle="Full Name"
                            placeholder="Enter full name"
                            id="name"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.name}
                            inputType="text"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="gender"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{ roles: GENDER }}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            defaultValue="Select Gender"
                            inputTitle="Gender"
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="FormFields mt-2 grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            inputTitle="Phone"
                            placeholder="Enter phone number"
                            id="phone"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.phone}
                            inputType="text"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            pattern={PATTERN.CHAR_NUM_DOT_AT}
                            inputTitle="Email"
                            placeholder="Enter email address"
                            id="email"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.email}
                            inputType="text"
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="FormFields mt-2 grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="categoryId"
                            control={control}
                            error={errors}
                            register={register}
                            setValue={setValue}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            inputTitle="Barber Category"
                            options={{ roles: catLovlist }}
                            defaultValue="Select Barber Category"
                          />
                        </FormControl>
                      </div>
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomDropDown
                            validateRequired
                            id="storeServiceCategoryItem"
                            control={control}
                            error={errors}
                            setValue={setValue}
                            register={register}
                            options={{ roles: catItemsLovlist }}
                            customHeight="h-[40px] rounded-xl"
                            customClassInputTitle="font-semibold"
                            inputTitle="Barber Services"
                            defaultValue="Select Service"
                          />
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="w-full">
                      <FormControl
                        className="FormControl w-full"
                        variant="standard"
                      >
                        <label className="FormLabel font-semibold">
                          Any Message{' '}
                        </label>
                        <TextField
                          className="FormTextarea"
                          id="note"
                          multiline
                          rows={7}
                          defaultValue=""
                          placeholder="Write Note..."
                          {...register('note', {
                            required: 'Note is required',
                            minLength: {
                              value: 1,
                              message: 'Minimum One Characters',
                            },
                            maxLength: {
                              value: 250,
                              message: MAX_LENGTH_EXCEEDED,
                            },
                          })}
                        />
                        {errors.note && (
                          <ErrorSpanBox error={errors.note?.message} />
                        )}
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>

              {getValues('storeServiceCategoryItem') !== undefined &&
                getValues('storeServiceCategoryItem') !== 'none' && (
                  <>
                    <div className="mt-5">
                      <span className="text-base font-bold text-[#1A1A1A]">
                        Select Barber
                      </span>
                      <hr className="my-4 border-[#949EAE]" />
                      {isPageLoader ? (
                        <Loader />
                      ) : barberList?.length > 0 ? (
                        <div
                          className={
                            barberList?.length === 0 ? 'h-[0px]' : 'h-[215px]'
                          }
                        >
                          <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            pagination={pagination}
                            modules={[Pagination]}
                            className="mySwiper custom-swiper custom-swiper-slider"
                          >
                            {barberList?.map((item: any, index: number) => {
                              return (
                                <SwiperSlide key={index}>
                                  {BarberCard(item, index)}
                                </SwiperSlide>
                              );
                            })}
                          </Swiper>
                        </div>
                      ) : (
                        <span>
                          There are currently no barbers available to provide
                          this service.
                        </span>
                      )}
                    </div>
                    {activeBarberData !== null && (
                      <div className="mt-5">
                        <span className="text-base font-bold text-[#1A1A1A]">
                          Available {activeBarberData?.storeEmployee?.name}{' '}
                          Appointment slots
                        </span>
                        <hr className="my-4 border-[#949EAE]" />
                        <div className="gaps-4 grid grid-cols-12">
                          {activeBarberData?.storeEmployeeSchedule?.map(
                            (item: any, index: number) => {
                              return (
                                <div key={index} className="col-span-2 p-3">
                                  <div className="h-[100px] flex-col">
                                    <div>
                                      <span className="font-semibold">
                                        {item.workDay}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-sm">
                                        {dayjs(item.startTime).isValid()
                                          ? dayjs(item.startTime)?.format(
                                              'h:mm A'
                                            )
                                          : '--'}{' '}
                                        -{' '}
                                        {dayjs(item.endTime).isValid()
                                          ? dayjs(item.endTime)?.format(
                                              'h:mm A'
                                            )
                                          : '--'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                    <div className="">
                      <div className="mt-5">
                        <span className="text-base font-bold text-[#1A1A1A]">
                          Select Date & Time
                        </span>
                        <hr className="my-4 border-[#949EAE]" />
                        <div className="flex items-center">
                          <div>
                            <ThemeProvider theme={darkTheme}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* <DemoItem label="Desktop variant"> */}
                                <div>
                                  <span className="text-sm">
                                    Select Appointment Date
                                  </span>
                                </div>
                                <Controller
                                  name="appointmentDate"
                                  control={control}
                                  defaultValue={dayjs()}
                                  render={({ field }) => (
                                    <DesktopDatePicker
                                      {...field}
                                      disabled={!activeBarberData}
                                      onChange={(date) =>
                                        handleDateChange(date, field)
                                      }
                                      // onChange={(date) => field.onChange(date)}
                                      value={field.value}
                                      minDate={dayjs()}
                                    />
                                  )}
                                />
                                {/* </DemoItem> */}
                              </LocalizationProvider>
                            </ThemeProvider>
                          </div>
                          <div className="mx-5">
                            <div className="flex-col">
                              <span className="text-sm">
                                Select Appointment Time
                              </span>
                              <div className="">
                                <FormControl
                                  className="FormControl"
                                  variant="standard"
                                >
                                  <TimePicker
                                    disabled={!activeBarberData}
                                    // timePickerLabel="Appointment Time"
                                    // timePickerSubLabel={"(Office in time)"}
                                    timePickerValue={appointmentTime}
                                    setTimePickerValue={setAppointmentTime}
                                    minTime={selectedScheduleTime.startTime}
                                    maxTime={selectedScheduleTime.endTime}
                                    id="startTime"
                                    // setError={setError}
                                  />
                                </FormControl>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <span className="text-base font-bold text-[#1A1A1A]">
                        Booked Time slots
                      </span>
                      <hr className="my-4 border-[#949EAE]" />
                      {appointmentBookedTime?.length === 0 && (
                        <span className="">No Booked Appointments</span>
                      )}
                      <div className="gaps-4 grid grid-cols-12">
                        {[
                          ...appointmentBookedTime,
                          ...tempAppointmentBookedTime.filter((item: any) => {
                            if (
                              item.storeEmployee !==
                              activeBarberData?.storeEmployee?.id
                            ) {
                              console.log('me ho 1');

                              return false;
                            }
                            if (
                              dayjs(item.appointmentTime).format(
                                'DD/MM/YYYY'
                              ) !==
                              dayjs(getValues('appointmentDate')).format(
                                'DD/MM/YYYY'
                              )
                            ) {
                              console.log(
                                `dayjs(item.appointmentTime).format(
                              'DD/MM/YYYY'
                            )`,
                                dayjs(item.appointmentTime).format('DD/MM/YYYY')
                              );
                              console.log(
                                `dayjs(getValues('appointmentDate')).format(
                                'DD/MM/YYYY'
                              )`,
                                dayjs(getValues('appointmentDate')).format(
                                  'DD/MM/YYYY'
                                )
                              );
                              console.log('me ho 2');

                              return false;
                            }
                            return true;
                          }),
                        ]
                          ?.sort(
                            (a: any, b: any) =>
                              dayjs(a.appointmentTime).unix() -
                              dayjs(b.appointmentTime).unix()
                          )
                          .map((item: any, index: number) => {
                            // console.log('APP ITEM TIME', item);

                            const servicetime = Number(item.serviceTime);
                            const apptimeDayjs = dayjs(item.appointmentTime);
                            const endTime = apptimeDayjs.add(
                              servicetime,
                              'minute'
                            );
                            // const formattedEndTime = endTime.format('h:mm A');
                            const formattedEndTime = dayjs(endTime).isValid()
                              ? dayjs(endTime)?.format('h:mm A')
                              : '--';
                            return (
                              <div key={index} className="col-span-2 p-3">
                                <div className="flex-col rounded-xl bg-background">
                                  <div className="flex items-center justify-center p-3">
                                    <span className="text-sm">
                                      {dayjs(item.appointmentTime).isValid()
                                        ? dayjs(item.appointmentTime)?.format(
                                            'h:mm A'
                                          )
                                        : '--'}{' '}
                                      - {formattedEndTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </>
                )}
              <div className="mt-3">
                <span className="text-base font-bold text-[#1A1A1A]">
                  Selected Barber & Service
                </span>
                {fields?.length > 0 && <hr className="my-4 border-[#949EAE]" />}
                {fields?.length > 0 &&
                  fields?.map((items: any, index: number) => {
                    return (
                      <div className="my-4 grid grid-cols-12" key={index}>
                        <div className="col-span-1">
                          <div
                            onClick={() => {
                              remove(index);
                              removeBookinkList(items);
                            }}
                            className="flex w-[40%] cursor-pointer items-center justify-center rounded-2xl bg-background p-2"
                          >
                            <CloseIcon />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold">Barber</p>
                          <span>{items.barber}</span>
                        </div>
                        <div className="col-span-2 mx-7">
                          <p className="font-semibold">Service</p>
                          <span>
                            {getCatItemName(items.storeServiceCategoryItem)}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold">Appointment Amount</p>
                          <span>{items.amount}</span>
                        </div>
                        <div className="col-span-2 mx-7">
                          <p className="font-semibold">Appointment Date</p>
                          <span>{items.appointmentTime.split(' ')[0]}</span>
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold">Appointment Time</p>
                          <span>{items.appointmentTime.split(' ')[1]}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr className="my-4 border-[#949EAE]" />
              <div className="mt-3 flex w-full items-center justify-end">
                <CustomButton
                  buttonType="button"
                  title={fields.length > 0 ? 'Add More Service' : 'Add'}
                  className="btn-black-fill"
                  // type={'submit'}
                  onclick={addAppointmentServices}
                  sx={{
                    padding: '0.375rem 2rem !important',
                    width: '12%',
                    marginRight: '15px',
                    height: '35px',
                  }}
                />
                <CustomButton
                  disabled={fields?.length < 1 && true}
                  buttonType="button"
                  title="Submit"
                  className="btn-black-outline"
                  type="submit"
                  iconRight={isLoader ? <CircularProgress size={14} /> : null}
                  // onclick={handleFormClose}
                  sx={{
                    padding: '0.375rem 2rem !important',
                    width: '15%',
                    height: '35px',
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
