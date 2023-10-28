import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AmenityService, StateService} from '../../src/apis/rest.app';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import { useConfirm } from '../../src/components/Confirm';
import useHandleError from '../../src/hooks/useHandleError';
import UserTableSkeleton from '../../src/components/Skeleton/TableSkeleton';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import AddEditStateDialog from '../../src/page-components/state/AddEditStateDialog';
import SearchAutoComplete from '../../src/components/SearchAutoComplete';
import SearchIcon from '@material-ui/icons/Search';
import InfiniteScroll from '../../src/components/InfiniteScroll';
import {Avatar} from "@material-ui/core";
import moment from "moment";
import AddEditAmenityDialog from "../../src/page-components/amenity/AddEditAmenityDialog";

const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: '6px',
  },
  addButton: {
    marginRight: 10,
    padding: theme.spacing(1, 4),
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  searchIcon: {
    color: theme.palette.primary.main,
  },
}));

const Index = () => {
  const Router = useRouter();
  const classes = useStyle();
  const Confirm = useConfirm();
  const handleError = useHandleError();
  const { enqueueSnackbar } = useSnackbar();
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [allAmenities, setAllAmenities] = useState([]);
  const [eachAmenity, setEachAmenity] = useState('');
  const [waiting, setWaiting] = useState(true);
  const [open, setOpen] = useState(false);

  const handleDelete = (amenityDetails) => {
    Confirm('Are you sure ?', 'Do you really want to delete this Amenity ?', 'Yes, Sure')
      .then(() => {
        AmenityService.remove(amenityDetails._id)
          .then((res) => {
            enqueueSnackbar('Deleted successfully.', {
              variant: 'success',
            });
            let _allAmenities = allAmenities;
            _allAmenities.splice(_allAmenities.indexOf(amenityDetails), 1);
            setAllAmenities([..._allAmenities]);
          })
          .catch((err) => {
            handleError()(err);
          })
          .finally(() => {
            setWaiting(false);
          });
      })
      .catch(() => {});
  };

  const loadStates = () => {
    let query = {
      $skip: allAmenities.length,
      $sort: {
        createdAt: -1,
      },
    };
    if (searchQuery !== '') {
      query.name = {
        $search: `${searchQuery}`,
      };
    }
    setWaiting(true);
    AmenityService.find({
      query,
    })
      .then((res) => {
        let _states = [...allAmenities, ...res.data];
        setAllAmenities(_states);
        setHasMore(_states?.length < res.total);
      })
      .catch((e) => {
        enqueueSnackbar(e ? e.message : 'Something went wrong', {
          variant: 'error',
        });
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return (
    <div className={classes.root}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant={'h4'}>All Amenities</Typography>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'15%'}>
          <SearchAutoComplete
            setHasMore={setHasMore}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setList={setAllAmenities}
            placeholder={'Search by name'}
          />
          <SearchIcon className={classes.searchIcon} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
          onClick={() => {
            setEachAmenity('');
            setOpen(true);
          }}
        >
          + Add New
        </Button>
      </Box>
      <InfiniteScroll
        hasMore={hasMore}
        loader={
          // <Box align={'center'} p={1} key={'all states loader'}>
          //   <CircularProgress size={28} />
          // </Box>
          ''
        }
        loadMore={loadStates}
        pageStart={0}
      >
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Sl No</b>
                </TableCell>
                <TableCell>
                  <b>Icon</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Created At</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waiting ? (
                <TableRow key={'loader'}>
                  <TableCell colSpan={6}>
                    <UserTableSkeleton />
                  </TableCell>
                </TableRow>
              ) : allAmenities?.length > 0 ? (
                allAmenities?.map((row, position) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {position + 1}
                    </TableCell>
                    <TableCell>
                      <Avatar alt="Icon" src={row.icon} />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{moment(row.createdAt).format('dddd, MMMM Do YYYY, [at] h:mm a')}</TableCell>
                    <TableCell style={{ color: 'green' }}>{'Active'}</TableCell>
                    <TableCell>
                      <Box display={'flex'}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            setEachAmenity(row);
                            setOpen(true);
                          }}
                        >
                          <Edit color={'primary'} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                          <Delete color={'primary'} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : !hasMore ? (
                <Box mt={1} mb={1} ml={2} textAlign={'left'}>
                  {'No Amenities Found'}
                </Box>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
      <AddEditAmenityDialog
        open={open}
        setOpen={setOpen}
        allAmenities={allAmenities}
        setAllAmenities={setAllAmenities}
        eachAmenity={eachAmenity}
      />
      {/*<ProjectDialog open={openProject} setOpen={setOpenProject} admin={adminProject} />*/}
    </div>
  );
};

export default Index;
