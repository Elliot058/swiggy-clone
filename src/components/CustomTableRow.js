/**
 *
 * @createdBy Surya Shakti
 * @email suryashakti1999@gmail.com
 * @description Table Row of the pages
 * @createdOn 28-Dec-20 11:06 PM
 */

import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const CustomTableRow = ({ each, i, pageLimit, page, title, syllabusId }) => {
    const Router = useRouter();
    const { unitId, chapterId } = Router.query;

    const clickHandler = () => {
        if (title === 'units') {
            Router.push(
                '/syllabuses/[id]/[unitId]/[chapterId]',
                `/syllabuses/${syllabusId}/${unitId}/${each._id}`,
            ).then(() => {});
        }
        if (title === 'chapters') {
            Router.push(
                `/syllabuses/[id]/[unitId]/[chapterId]/[topicId]`,
                `/syllabuses/${syllabusId}/${unitId}/${chapterId}/${each._id}`,
            ).then(() => {});
        }
    };

    return (
        <React.Fragment>
            <TableRow key={i}>
                <TableCell align="center">{pageLimit * (page - 1) + (i + 1)}</TableCell>
                <TableCell align="center">{each.name ? each.name : '---'}</TableCell>
                {each.chapter ? <TableCell align="center">{each.chapter ? each.chapter.name : '---'}</TableCell> : null}
                {each.unit ? <TableCell align="center">{each.unit ? each.unit.name : '---'}</TableCell> : null}
                {each.syllabus ? (
                    <TableCell align="center">{each.syllabus ? each.syllabus.name : '---'}</TableCell>
                ) : null}
                {each.course ? (
                    <TableCell align="center">{each.course.name ? each.course.name : '---'}</TableCell>
                ) : null}
                {title === 'units' || title === 'chapters' ? (
                    <TableCell align="center">
                        <Button color={'primary'} onClick={() => clickHandler()}>
                            <Typography variant={'button'}>
                                View
                            </Typography>
                        </Button>
                    </TableCell>
                ) : null}

            </TableRow>
        </React.Fragment>
    );
};

CustomTableRow.propTypes = {
    title: PropTypes.string.isRequired,
    each: PropTypes.any.isRequired,
    i: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    deleteCallback: PropTypes.func.isRequired,
    editCallback: PropTypes.func.isRequired,
    pageLimit: PropTypes.number.isRequired,
    coursesList: PropTypes.array,
    syllabusesList: PropTypes.array,
};

export default CustomTableRow;
