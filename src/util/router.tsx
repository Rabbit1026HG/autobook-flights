import { FlightsSearch } from '@pages/FlightsSearch';
import { FlightsHome } from '@pages/FlightsHome';
import { Layout } from '@shared/layout';
import { createBrowserRouter } from 'react-router-dom';
import { FlightPassengerInfo } from '@pages/FlightsPassengerInfo';
import FlightSeatSelection from '@pages/FlightsSeatSelection';
// import FlightsPaymentPage from '@pages/FlightsPayment';
import FlightsPaymentSuccessPage from '@pages/FlightsPaymentSuccess';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <FlightsHome />,
      },
      {
        path: 'flights',
        children: [
          { index: true, element: <FlightsHome /> },
          {
            path: 'search',
            element: <FlightsSearch />,
          },
          {
            path: 'passenger-info',
            element: <FlightPassengerInfo />,
          },
          {
            path: 'select-seats',
            element: <FlightSeatSelection />,
          },
          {
            path: 'payment',
            children: [
              // {
              //   index: true,
              //   element: <FlightsPaymentPage />,
              // },
              {
                path: 'success',
                element: <FlightsPaymentSuccessPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
export { router };
