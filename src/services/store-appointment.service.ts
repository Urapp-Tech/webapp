/* eslint-disable import/no-cycle */
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

import network from './network';

const getBarbersList = (storeServiceCatItemId: any, params?: object) => {
  return network.get(API_PATHS.getBarbersList(storeServiceCatItemId), {
    headers: getHeaders(),
    params,
  });
};

const getBarberBookedTimeSlots = (
  storeEmp: any,
  date: any,
  params?: object
) => {
  return network.get(API_PATHS.getBarberBookedTimeSlots(storeEmp, date), {
    headers: getHeaders(),
    params,
  });
};

const appointmentCreate = (data: any, params?: object) => {
  return network.post(API_PATHS.appointmentCreate(), data, {
    headers: getHeaders(),
    params,
  });
};

const fetchAllAppointments = (tenant: any, body: any) => {
  return network.get(API_PATHS.getAllPreviousAppointments(tenant), {
    headers: getHeaders(),
    params: body,
  });
};

const findAppointment = (appointment: any, body?: any) => {
  return network.get(API_PATHS.findAppointment(appointment), {
    headers: getHeaders(),
    params: body,
  });
};

const rescheduleAppointment = (appointment: any, data: any, body?: any) => {
  return network.post(API_PATHS.rescheduleAppointment(appointment), data, {
    headers: getHeaders(),
    params: body,
  });
};

const CheckEmployeeAvailable = (employeeId: any, date: any, body?: any) => {
  return network.get(API_PATHS.CheckEmployeeAvailable(employeeId, date), {
    headers: getHeaders(),
    params: body,
  });
};

export default {
  getBarbersList,
  getBarberBookedTimeSlots,
  appointmentCreate,
  fetchAllAppointments,
  findAppointment,
  rescheduleAppointment,
  CheckEmployeeAvailable,
};
