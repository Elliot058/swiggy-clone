import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import { CookieStorage } from 'cookie-storage';
import rest from '@feathersjs/rest-client';
import Axios from 'axios';
import services from './services.json';

export const authCookieName = 'AthrClient-token';

export const cookieStorage = new CookieStorage();

const restClient = rest(process.env.baseUrl);

const restApp = feathers();

restApp.configure(restClient.axios(Axios));

restApp.configure(
  auth({
    path: services.authentication,
    cookie: authCookieName,
    storageKey: authCookieName,
    storage: cookieStorage,
  }),
);

export default restApp;

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('', file);
  return uploadService.create(formData);
};

export const uploadService = restApp.service(services.upload);
export const ForgetPasswordService = restApp.service(services.forgetPassword);
export const UsersService = restApp.service(services.user);
export const StateService = restApp.service(services.state);
export const CityService = restApp.service(services.city);
export const PlacesInCityService = restApp.service(services.placesInCity);
export const AmenityService = restApp.service(services.facility);
export const BlogService = restApp.service(services.blog);
export const PropertyService = restApp.service(services.property);
export const RoomTypeService = restApp.service(services.roomType);
export const ShortStayBookingService = restApp.service(services.shortStay);
export const RatingService = restApp.service(services.rating);
export const WalletService = restApp.service(services.wallet);
export const BannerService = restApp.service(services.banner);
export const AdminDashboardService = restApp.service(services.adminDashboardUserReport);
export const AdminDashboardBookingReportService = restApp.service(services.adminDashboardBookingReport);
export const AdminStatisticsService = restApp.service(services.adminStatistics);
export const HotelTransactionService = restApp.service(services.hotelTransaction);
export const PaymentRequestService = restApp.service(services.paymentRequest);
export const MasterTableService = restApp.service(services.masterCollection);
export const TransactionService = restApp.service(services.transaction);
export const ContactUsService = restApp.service(services.contactUs);
export const ExportShortStayBookingService = restApp.service(services.exportShortStayBookings);
