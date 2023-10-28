import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import propTypes from 'prop-types';

const AllRatingRow = ({ each, position }) => {
  return (
    <TableRow key={position}>
      <TableCell>{position + 1}</TableCell>
      <TableCell>{each?.createdBy && each?.createdBy?.name ? each.createdBy.name : 'N/A'}</TableCell>
      <TableCell>{each && each.createdAt ? moment(each.createdAt).format('DD/MM/YYYY') : 'N/A'}</TableCell>
      <TableCell>{each?.bookingType === 1 ? 'Short Stay' : 'ResFe'}</TableCell>
      <TableCell>{each.rating && each.rating ? each.rating + '★' : ''}</TableCell>
      {/*<TableCell>{each && each.review ? <Button>Read</Button> : 'N/A'}</TableCell>*/}
    </TableRow>
  );
};
AllRatingRow.propTypes = {
  each: propTypes.object.isRequired,
  position: propTypes.number,
};
export default AllRatingRow;
