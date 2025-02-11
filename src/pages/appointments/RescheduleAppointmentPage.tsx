/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-syntax */

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import {
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utcPlugin from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import assets from '../../assets';
import '../../assets/css/PopupStyle.css';
import CustomButton from '../../components/common/CustomButton';
import CustomDropDown from '../../components/common/CustomDropDown';
import CustomInputBox from '../../components/common/CustomInputBox';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TimePicker from '../../components/common/TimePicker';
import useAlert from '../../hooks/alert.hook';
import {
  AddAppointmentForm,
  Appointment,
} from '../../interfaces/app.appointment';
import { fetchCategoriesItems } from '../../redux/features/storeCategoryItemsSlice';
import {
  fetchCategories,
  setSelectedCategory,
} from '../../redux/features/storeCategorySlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import storeAppointmentService from '../../services/store-appointment.service';
import { GENDER, MAX_LENGTH_EXCEEDED, PATTERN } from '../../utilities/constant';

// Extend dayjs with necessary plugins
dayjs.extend(isBetween);
dayjs.extend(utcPlugin);
// dayjs.extend(timezone);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#171717',
    },
  },
});

export default function RescheduleAppointmentPage() {
  const officeTimingOut = useAppSelector(
    (x) => x.deviceStates.tenantConfig?.officeTimeOut
  );
  const officeTimingIn = useAppSelector(
    (x) => x.deviceStates.tenantConfig?.officeTimeIn
  );
  const officeTimeIn = dayjs(officeTimingIn);
  const officeTimeOut = dayjs(officeTimingOut);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isPageLoader, setIsPageLoader] = useState(false);
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [activeBarber, setActiveBarber] = useState<any>();
  const [disabledButton, setDisabledButton] = useState<any>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [_appointmentData, setAppointmentData] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [activeBarberData, setActiveBarberData] = useState<any>();
  const [, setBookingList] = useState<any>();
  const { categories: catLovlist, selectedCategory } = useAppSelector(
    (state) => state.storeCategoryState
  );
  const { categoryItems: catItemsLovlist, selectedCategoryItems } =
    useAppSelector((state) => state.storeCategoryItemState);

  const [usedCatItemsLovlist, setusedCatItemsLovList] = useState<any>([]);
  const [barberList, setBarberList] = useState<any>([]);
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

  const params = useParams();
  const { id } = params;

  const branch = useAppSelector((state) => state?.branchState?.branch);

  function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
  }

  const getAppointment = async () => {
    setIsLoader(true);
    await storeAppointmentService
      .findAppointment(id)
      .then((res: any) => {
        if (res.data.success) {
          setValue('name', res.data.data.name);
          setValue('email', res.data.data.email);
          setValue('phone', res.data.data.phone);
          setValue('note', res.data.data.note);
          setValue(
            'gender',
            res.data.data.gender !== 'none'
              ? capitalizeFirstLetter(res.data.data.gender)
              : 'none'
          );
          setAppointmentData(res.data.data);
          setBarberList(res.data.data);
          // console.log('getAppointment', res.data.data);
          setIsLoader(false);
        } else {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'error',
          });
        }
      })
      .catch((err: Error) => {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'appointments',
    keyName: 'key',
  });

  const checkIsSameDate = (date: any, appointmentDate: any) => {
    return dayjs(date).isSame(appointmentDate, 'day');
  };

  const checkIsAfterTime = (date: any, appointmentDate: any) => {
    return dayjs(date).isAfter(appointmentDate, 'minutes');
  };

  const checkIsBetweenTime = (
    selectedTime: any,
    beforeTime: any,
    afterTime: any
  ) => {
    return dayjs(selectedTime).isBetween(beforeTime, afterTime, 'minute');
  };

  const getCatItemName = (id: any) => {
    let tempAr: any[] = [];
    tempAr = usedCatItemsLovlist;
    return tempAr?.find((el: any) => el.id === id)?.name;
  };

  const shopEvents = async (id: any, date: any) => {
    try {
      const resp = await storeAppointmentService.CheckEmployeeAvailable(
        id,
        date
      );
      return resp.data.data;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
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

  const getUserBookedSlotsByDate = async () => {
    setUserAppointments(await getUserBookedSlotsByDate());

    try {
      const response = await storeAppointmentService.getUserAppointmentsByDate(
        dayjs(getValues('appointmentDate'))?.format('YYYY-MM-DD')
      );

      if (response.data && response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.log('getUserBookedSlotsByDate ~ error:', error);
      return [];
    }
  };

  const getBookedTimeSlots: any = async (id: any, date: any) => {
    const resll = await shopEvents(
      id,
      dayjs(getValues('appointmentDate')).format('YYYY-MM-DD')
    );
    if (resll) {
      setDisabledButton(true);
      setAppointmentBookedTime([]);
      setIsNotify(true);
      setNotifyMessage({
        text: 'Today must be an event or may be employee is on leave',
        type: 'error',
      });
      return false;
    }
    setDisabledButton(false);
    await storeAppointmentService
      .getBarberBookedTimeSlots(id, date)
      .then((res) => {
        if (res.data.success) {
          const newArr = res.data.data;
          newArr.forEach((item: any) => {
            const newAppTime = dayjs(item.appointmentTime)
              .set('hours', dayjs(item.appointmentTime).hour())
              .set('minute', dayjs(item.appointmentTime).minute());
            delete item.appointmentTime;
            item.appointmentTime = newAppTime;
            return item;
          });
          if (tempAppointmentBookedTime.length > 0) {
            tempAppointmentBookedTime.filter((item: any) => {
              if (
                item.storeEmployee === id &&
                checkIsSameDate(
                  getValues('appointmentDate'),
                  dayjs(item.appointmentTime)
                )
              ) {
                newArr.push(item);
                return item;
              }
              return false;
            });
          }
          setAppointmentBookedTime(newArr);
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
    return null;
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  function BarberCard(item: any, index: number) {
    const onHandleBarber = async () => {
      if (index === activeBarber) {
        setActiveBarber(null);
        setActiveBarberData(null);
        setBookingList(null);
        setAppointmentBookedTime([]);
      } else {
        setBookingList(item.storeEmployeeSchedule);
        setActiveBarberData(item);
        setActiveBarber(index);
        getBookedTimeSlots(
          item.storeEmployee.id,
          dayjs(getValues('appointmentDate'))?.format('YYYY-MM-DD')
        );
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
            <p className="text-xs">{`(${item.serviceTime} min(s))`}</p>
            {/* {`(${item.serviceTime} min(s))`} */}
          </span>
          <div className="flex items-center">
            <img
              className="h-[14px] w-[14px]"
              src={assets.images.Star}
              alt="avatar-img"
            />
            <span className="ml-1 text-sm font-semibold">{item.rating}</span>
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
    dispatch(fetchCategories(systemConfig?.tenant.id));
    if (id) {
      getAppointment().then();
    }
  }, []);

  const getBarbers = async (id: any) => {
    setIsPageLoader(true);
    await storeAppointmentService
      .getBarbersList(id, { tenant: systemConfig?.tenant.id })
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
      _appointmentData?.id &&
      (getValues('categoryId') === undefined ||
        getValues('categoryId') === 'none')
    ) {
      setValue('categoryId', _appointmentData?.storeServiceCategory);
    }
  }, [_appointmentData]);

  useEffect(() => {
    if (
      _appointmentData?.id &&
      (getValues('storeServiceCategoryItem') === undefined ||
        getValues('storeServiceCategoryItem') === 'none')
    ) {
      setValue(
        'storeServiceCategoryItem',
        _appointmentData?.storeServiceCategoryItem?.id
      );
    }
  }, []);

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
          tenant: systemConfig?.tenant.id,
          branch: branch?.id,
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
      getBarbers(watch('storeServiceCategoryItem')).then();
    }
  }, [watch('storeServiceCategoryItem')]);

  function checkDuplicateServices(
    array: any,
    targetEmployee: string,
    targetCategoryItem: string
  ) {
    for (const obj of array) {
      if (
        obj.storeEmployee === targetEmployee &&
        dayjs(obj.appointmentTime).format('YYYYMMDD') ===
          dayjs(getValues('appointmentDate')).format('YYYYMMDD') &&
        obj.storeServiceCategoryItem === targetCategoryItem
      ) {
        return true;
      }
    }
    return false;
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

  /**
   * Checks if a user has booked an appointment at a specified time.
   * @returns {boolean} Returns true if the user has a booked appointment at the specified time, otherwise returns false.
   */
  const checkUserBookedOnTime = () => {
    const ad = `${dayjs(getValues('appointmentDate'))?.format(
      'YYYY-MM-DD'
    )} ${dayjs(appointmentTime).format('HH:mm')}`;

    const bookedSlot = userAppointments.filter((x) => {
      const startTime = dayjs(x.appointmentTime);
      const endTime = startTime.add(parseInt(x.serviceTime, 10), 'minute');

      const isBetweenInSlot = dayjs(ad).isBetween(
        startTime,
        endTime,
        null,
        '[]'
      );

      return isBetweenInSlot;
    });

    if (bookedSlot.length > 0) {
      return true;
    }
    return false;
  };

  const checkIsBeforeTime = (appointmentDate: any, date: any) => {
    return dayjs(appointmentDate).isBefore(date, 'minute');
  };

  // const addAppointmentServices = () => {
  //   if (checkUserBookedOnTime()) {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: `You have another appointment scheduled for this time. (${dayjs(
  //         appointmentTime
  //       )?.format('hh:mm A')})`,
  //       type: 'error',
  //     });
  //     return;
  //   }

  //   const obj = {
  //     id: 0,
  //     barber: activeBarberData?.storeEmployee?.name,
  //     amount: activeBarberData?.amount,
  //     storeServiceCategory: watch('categoryId'),
  //     serviceTime: activeBarber?.serviceTime,
  //     storeServiceCategoryItem: watch('storeServiceCategoryItem'),
  //     storeEmployee: activeBarberData?.storeEmployee?.id,
  //     appointmentTime: `${dayjs(getValues('appointmentDate'))?.format(
  //       'YYYY-MM-DD'
  //     )} ${dayjs(appointmentTime)?.format('HH:mm:ss')}`,
  //   };

  //   if (
  //     watch('storeServiceCategoryItem') &&
  //     activeBarberData &&
  //     getValues('appointmentDate') &&
  //     appointmentTime
  //   ) {
  //     const currentDay = dayjs(getValues('appointmentDate')).format('dddd');
  //     const scheduleData = activeBarberData?.storeEmployeeSchedule.filter(
  //       (item: any) => item.workDay === currentDay
  //     );
  //     const time = dayjs(appointmentTime);
  //     const startTime = dayjs(scheduleData[0]?.startTime)
  //       .set('date', time.date())
  //       .set('month', time.month())
  //       .set('year', time.year());
  //     let endTime = dayjs(scheduleData[0]?.endTime)
  //       .set('date', time.date())
  //       .set('month', time.month())
  //       .set('year', time.year());
  //     if (startTime.hour() > endTime.hour()) {
  //       endTime = endTime.add(1, 'day');
  //     }
  //     const officeInTime = officeTimeIn
  //       .set('date', time.date())
  //       .set('month', time.month())
  //       .set('year', time.year());
  //     let officeOutTime = officeTimeOut
  //       .set('date', time.date())
  //       .set('month', time.month())
  //       .set('year', time.year());
  //     if (officeInTime.hour() > officeOutTime.hour()) {
  //       officeOutTime = officeOutTime.add(1, 'day');
  //     }
  //     let prevTime = startTime;
  //     const addTime = dayjs(time).add(activeBarberData?.serviceTime, 'minutes');

  //     if (scheduleData.length > 0) {
  //       if (!checkIsBetweenTime(time, startTime, endTime)) {
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: 'Barber is not available at this time',
  //           type: 'error',
  //         });
  //         return false;
  //       }

  //       const isDuplicate = checkDuplicateServices(
  //         fields,
  //         activeBarberData?.storeEmployee?.id,
  //         watch('storeServiceCategoryItem')
  //       );
  //       if (!isDuplicate) {
  //         if (tempAppointmentBookedTime.length > 0) {
  //           for (let i = 0; i < tempAppointmentBookedTime.length; i += 1) {
  //             const tempEl = tempAppointmentBookedTime[i];
  //             const tempServiceTime = dayjs(tempEl.appointmentTime).add(
  //               tempEl.serviceTime,
  //               'minute'
  //             );
  //             if (time > dayjs(tempServiceTime)) {
  //               prevTime = dayjs(tempServiceTime);
  //             } else if (
  //               !checkIsBetweenTime(
  //                 addTime,
  //                 prevTime,
  //                 dayjs(tempEl.appointmentTime)
  //               )
  //             ) {
  //               setIsNotify(true);
  //               setNotifyMessage({
  //                 text: `Barber is engaged with another client`,
  //                 type: 'error',
  //               });
  //               return false;
  //             }
  //           }
  //         }
  //         for (let i = 0; i < appointmentBookedTime.length; i += 1) {
  //           const el = appointmentBookedTime[i];
  //           const serviceTime = dayjs(el.appointmentTime).add(
  //             el.serviceTime,
  //             'minute'
  //           );
  //           if (
  //             time > dayjs(serviceTime) &&
  //             checkIsAfterTime(endTime, serviceTime)
  //           ) {
  //             prevTime = dayjs(serviceTime);
  //           } else if (
  //             !checkIsAfterTime(endTime, serviceTime) &&
  //             !checkIsBetweenTime(addTime, prevTime, dayjs(el.appointmentTime))
  //           ) {
  //             setIsNotify(true);
  //             setNotifyMessage({
  //               text: `Barber is not available at this time`,
  //               type: 'error',
  //             });
  //             return false;
  //           }
  //         }
  //         const storeServiceCategoryItemId = getValues(
  //           'storeServiceCategoryItem'
  //         );
  //         const storeServiceCategoryItem = catItemsLovlist.find(
  //           (catItem) => catItem.id === storeServiceCategoryItemId
  //         );
  //         setTmpId((prevId: any) => prevId + 1);
  //         const newData = {
  //           id: tmpId,
  //           appointmentTime,
  //           email: activeBarberData?.storeEmployee?.email ?? 'abc@gmail.com',
  //           gender: 'male',
  //           name: activeBarberData?.storeEmployee?.name ?? 'urapp',
  //           note: 'demo',
  //           phone: activeBarberData?.storeEmployee?.phone,
  //           serviceTime: storeServiceCategoryItem?.serviceTime,
  //           status: 'New',
  //           storeEmployee: activeBarberData?.storeEmployee?.id,
  //           storeServiceCategory: '12345',
  //           amount: storeServiceCategoryItem?.price,
  //           storeServiceCategoryItem:
  //             activeBarberData?.storeServiceCategoryItem,
  //         };
  //         obj.id = tmpId;
  //         obj.serviceTime = storeServiceCategoryItem?.serviceTime;
  //         obj.amount = storeServiceCategoryItem?.price;
  //         setTempAppointmentBookedTime((prev: any) => [...prev, newData]);
  //         setAppointmentBookedTime((prev: any) => [...prev, newData]);
  //         append(obj);
  //       } else {
  //         setIsNotify(true);
  //         setNotifyMessage({
  //           text: 'This service you already selected, Please select another service',
  //           type: 'error',
  //         });
  //       }
  //     } else {
  //       setIsNotify(true);
  //       setNotifyMessage({
  //         text: `Barber is not available at ${currentDay}`,
  //         type: 'error',
  //       });
  //     }
  //   } else {
  //     setIsNotify(true);
  //     setNotifyMessage({
  //       text: 'Please select your preferred barber, category , desired services, and appointment date & time for scheduling.',
  //       type: 'error',
  //     });
  //   }
  //   return null;
  // };

  const addAppointmentServices = () => {
    const obj = {
      id: 0,
      barber: activeBarberData?.storeEmployee?.name,
      amount: activeBarberData?.servicePrice,
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
      const scheduleData = activeBarberData?.storeEmployeeSchedule.filter(
        (item: any) => item.workDay === currentDay
      );
      const time = dayjs(getValues('appointmentDate'))
        .set('hours', dayjs(appointmentTime).hour())
        .set('minute', dayjs(appointmentTime).minute());
      const startTime = dayjs(scheduleData[0]?.startTime)
        .set('date', time.date())
        .set('month', time.month())
        .set('year', time.year());
      let endTime = dayjs(scheduleData[0]?.endTime)
        .set('date', time.date())
        .set('month', time.month())
        .set('year', time.year());
      if (startTime.hour() > endTime.hour()) {
        endTime = endTime.add(1, 'day');
      }
      let prevTime = startTime;
      const addTime = dayjs(time).add(activeBarberData?.serviceTime, 'minutes');
      if (scheduleData.length > 0) {
        if (!checkIsBeforeTime(startTime, time)) {
          setIsNotify(true);
          setNotifyMessage({
            text: 'Barber is not available at this time',
            type: 'error',
          });
          return false;
        }
        const isDuplicate = checkDuplicateServices(
          fields,
          activeBarberData?.storeEmployee?.id,
          watch('storeServiceCategoryItem')
        );
        if (!isDuplicate) {
          if (tempAppointmentBookedTime.length > 0) {
            for (let i = 0; i < tempAppointmentBookedTime.length; i += 1) {
              const tempEl = tempAppointmentBookedTime[i];
              const tempServiceTime = dayjs(tempEl.appointmentTime).add(
                tempEl.serviceTime,
                'minute'
              );
              if (time > dayjs(tempServiceTime)) {
                prevTime = dayjs(tempServiceTime);
              } else if (
                !checkIsBetweenTime(
                  addTime,
                  prevTime,
                  dayjs(tempEl.appointmentTime)
                )
              ) {
                setIsNotify(true);
                setNotifyMessage({
                  text: `Barber is engaged with another client`,
                  type: 'error',
                });
                return false;
              }
            }
          }
          for (let i = 0; i < appointmentBookedTime.length; i += 1) {
            const el = appointmentBookedTime[i];
            const serviceTime = dayjs(el.appointmentTime).add(
              el.serviceTime,
              'minute'
            );
            if (
              time > dayjs(serviceTime)
              //  &&
              // checkIsAfterTime(endTime, serviceTime)
            ) {
              prevTime = dayjs(serviceTime);
            } else if (
              // !checkIsAfterTime(endTime, serviceTime) &&
              !checkIsBetweenTime(addTime, prevTime, dayjs(el.appointmentTime))
            ) {
              // break;
              setIsNotify(true);
              setNotifyMessage({
                text: `Barber is not available at this time`,
                type: 'error',
              });
              return false;
            }
          }
          setTmpId((prevId: any) => prevId + 1);
          const newData = {
            id: tmpId,
            appointmentTime: time,
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
          setAppointmentBookedTime((prev: any) => [...prev, newData]);
          append(obj);
        } else {
          setIsNotify(true);
          setNotifyMessage({
            text: 'This service you already selected, Please select another service',
            type: 'error',
          });
        }
      } else {
        setIsNotify(true);
        setNotifyMessage({
          text: `Barber is not available at ${currentDay}`,
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
    return null;
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
    data.appointments = updatedAppointmentArray.map((e: any) => {
      const formattedDateTime = dayjs(e.appointmentTime)
        .utc()
        .format('YYYY-MM-DD HH:mm:ss');
      e.appointmentTime = formattedDateTime;
      return e;
    });
    storeAppointmentService
      .rescheduleAppointment(
        _appointmentData.id,
        { ...data, status: 'New' },
        {
          tenant: systemConfig?.tenant.id,
          app_user: user?.id,
        }
      )
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
        <div className="mb-4 flex items-center md:mb-6">
          <IconButton
            onClick={() => navigate(-1)}
            color="inherit"
            className="px-2"
          >
            <ArrowBackIcon />
          </IconButton>
          <span className="text-base font-bold text-[#1A1A1A]">
            Fill Reschedule Appointment Form
          </span>
        </div>
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="p-3">
            <span className="text-base font-bold text-[#1A1A1A]">Add Info</span>
            <hr className="my-4 border-[#949EAE]" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="FormBody">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-8">
                    <div className="FormFields grid grid-cols-12 gap-6">
                      <div className="col-span-6">
                        <FormControl
                          className="FormControl w-full"
                          variant="standard"
                        >
                          <CustomInputBox
                            disable
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
                            disable
                            pattern={PATTERN.ONLY_NUM}
                            maxLetterLimit={15}
                            inputTitle="Phone"
                            placeholder="Enter phone number"
                            id="phone"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            requiredType
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
                            disable
                            pattern={PATTERN.CHAR_NUM_DOT_AT}
                            inputTitle="Email"
                            placeholder="Enter email address"
                            id="email"
                            customFontClass="font-semibold mb-1"
                            customClass="border-[2px] border-[#949EAE] rounded-xl px-2 py-1 text-sm"
                            register={register}
                            error={errors.email}
                            requiredType
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
                  <div className="col-span-12 md:md:col-span-4">
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
                            barberList?.length === 0 ? 'h-[0px]' : 'h-[240px]'
                          }
                        >
                          <Swiper
                            slidesPerView={isMobile ? 1.5 : 6}
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
                                <div
                                  key={index}
                                  className="col-span-4 p-3 md:col-span-2"
                                >
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
                                      value={field.value}
                                      minDate={dayjs()}
                                    />
                                  )}
                                />
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
                                    timePickerValue={appointmentTime}
                                    setTimePickerValue={setAppointmentTime}
                                    id="startTime"
                                    minTime={dayjs().add(15, 'minutes')}
                                    minutesStep={5}
                                    date={getValues('appointmentDate')}
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
                        {appointmentBookedTime
                          ?.sort(
                            (a: any, b: any) =>
                              dayjs(a.appointmentTime).unix() -
                              dayjs(b.appointmentTime).unix()
                          )
                          ?.map((item: any, index: number) => {
                            const servicetime = Number(item.serviceTime);
                            const apptimeDayjs = dayjs(item.appointmentTime);
                            const endTime = apptimeDayjs.add(
                              servicetime,
                              'minute'
                            );

                            const formattedEndTime = dayjs(endTime).isValid()
                              ? dayjs(endTime)?.format('h:mm A')
                              : '--';
                            return (
                              <div
                                key={index}
                                className="col-span-6 p-3 md:col-span-4 lg:col-span-2"
                              >
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
              <div className="w-full overflow-x-scroll md:overflow-x-auto">
                <div className="mt-3 w-[200%] md:w-full">
                  <span className="text-base font-bold text-[#1A1A1A]">
                    Selected Barber & Service
                  </span>
                  {fields?.length > 0 && (
                    <hr className="my-4 border-[#949EAE]" />
                  )}
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
              </div>
              <hr className="my-4 border-[#949EAE]" />
              <div className="mt-3 flex w-full items-center justify-end">
                <CustomButton
                  disabled={disabledButton}
                  buttonType="button"
                  title={fields.length > 0 ? 'Add More Services' : 'Add'}
                  className={`btn-black-fill  ${
                    fields.length > 0 ? 'w-64' : ''
                  } `}
                  onclick={addAppointmentServices}
                  sx={{
                    padding: '0.375rem 2rem !important',
                    marginRight: '15px',
                    height: '35px',
                  }}
                />
                <CustomButton
                  disabled={fields?.length < 1 && true}
                  buttonType="button"
                  title="Submit"
                  className="btn-black-outline"
                  iconRight={isLoader ? <CircularProgress size={14} /> : null}
                  type="submit"
                  sx={{
                    padding: '0.375rem 2rem !important',
                    width: '150px',
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
