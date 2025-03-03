/* eslint-disable import/no-cycle */
import {
  GetProviderBookedTimeSlotsResponse,
  GetProviderListResponse,
} from '../interfaces/appointment';
import API_PATHS from '../utilities/API-PATHS';
import { getHeaders } from '../utilities/constant';

import network from './network';

const getBarbersList = (storeServiceCatItemId: string, params?: object) => {
  return network.get<GetProviderListResponse>(
    API_PATHS.getBarbersList(storeServiceCatItemId),
    {
      headers: getHeaders(),
      params,
    }
  );
};

const getBarberBookedTimeSlots = (
  storeEmp: string,
  date: string,
  params?: object
) => {
  return network.get<GetProviderBookedTimeSlotsResponse>(
    API_PATHS.getBarberBookedTimeSlots(storeEmp, date),
    {
      headers: getHeaders(),
      params,
    }
  );
};

const appointmentCreate = (data: any, params?: object) => {
  return network.post(API_PATHS.appointmentCreate(), data, {
    headers: getHeaders(),
    params,
  });
};

const fetchAllAppointments = (tenant: string, body: any) => {
  return network.get(API_PATHS.getAllPreviousAppointments(tenant), {
    headers: getHeaders(),
    params: body,
  });
};

const findAppointment = (appointment: string, body?: any) => {
  return network.get(API_PATHS.findAppointment(appointment), {
    headers: getHeaders(),
    params: body,
  });
};

const rescheduleAppointment = (appointment: string, data: any, body?: any) => {
  return network.post(API_PATHS.rescheduleAppointment(appointment), data, {
    headers: getHeaders(),
    params: body,
  });
};

const CheckEmployeeAvailable = (
  employeeId: string,
  date: string,
  body?: any
) => {
  return network.get(API_PATHS.CheckEmployeeAvailable(employeeId, date), {
    headers: getHeaders(),
    params: body,
  });
};

const getUserAppointmentsByDate = (date: string, body?: any) => {
  return network.get(API_PATHS.getUserAppointmentsByDate(date), {
    headers: getHeaders(),
    params: body,
  });
};

const getUserAppointmentsByMultipleDates = (body?: any) => {
  return network.post(API_PATHS.getUserAppointmentsByMultipleDates(), body, {
    headers: getHeaders(),
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
  getUserAppointmentsByDate,
  getUserAppointmentsByMultipleDates,
};
