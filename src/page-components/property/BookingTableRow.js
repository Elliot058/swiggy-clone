import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';

const BookingTableRow = ({ each, position }) => {
  // console.log('each.........', each);
  const Router = useRouter();
  return (
    <>
      <TableRow key={position}>
        {/*<TableCell>{position + 1}</TableCell>*/}
        <TableCell>{each.customer && each.customer.name ? each.customer.name : 'N/A'}</TableCell>
        <TableCell>{each && each.createdAt ? moment(each.createdAt).format('DD/MM/YYYY') : 'N/A'}</TableCell>
        <TableCell>{each?.type === 1 ? 'Short Stay' : 'ResFe'}</TableCell>
        <TableCell>{each && each.price ? each.price : 'N/A'}</TableCell>
        <TableCell>
          <Button
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => {
              each?.type === 1
                ? Router.push('/bookings/all-short-stay/' + each._id)
                : Router.push('/bookings/all-resfe/' + each._id);
            }}
          >
            View
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
BookingTableRow.propTypes = {
  each: propTypes.object.isRequired,
  position: propTypes.number.isRequired,
};
export default BookingTableRow;
