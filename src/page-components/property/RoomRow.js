import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import RoomDetailsDialog from '../../dialogs/RoomDetailsDialog';

function RoomRow({ each, position }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <TableRow key={position}>
        {/*<TableCell>{position + 1}</TableCell>*/}
        <TableCell>{each.name ? each.name : 'N/A'}</TableCell>
        <TableCell>{each?.roomCategory === 1 ? 'Short Stay' : 'ResFe'}</TableCell>
        <TableCell>{each?.status === 1 ? 'Active' : 'Inactive'}</TableCell>
        <TableCell align={'center'}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            // onClick={()=>{Router.push('/user/'+each._id);}}
            onClick={() => setDetailsOpen(true)}
          >
            View
          </Button>
        </TableCell>
      </TableRow>
      <RoomDetailsDialog each={each} detailsOpen={detailsOpen} setDetailsOpen={setDetailsOpen} />
    </>
  );
}
RoomRow.propTypes = {
  each: propTypes.object.isRequired,
  position: propTypes.number.isRequired,
};

export default RoomRow;
