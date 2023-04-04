import React from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Box, Typography, Divider } from '@material-ui/core';

const styles = theme => ({
    table: {
        '& > div': {
            overflow: 'auto'
        },
        '& table': {
            '& td': {
                wordBreak: 'keep-all'
            },
            [theme.breakpoints.down('md')]: {
                '& td': {
                    height: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }
        }
    }
});

function QuantityBox({data}) {
    console.log(data)
    return (

        <Box bgcolor={"#3172B0"} color='white' boxShadow={1} p={1}>
            <Box p={1}>
                <Typography variant='h6'>
                    Quantity in Hand
                </Typography>
            </Box>
            <Box p={1}>
                <Typography variant='h4'>
                    {data.total_stock}
                </Typography>
            </Box>
            <Divider />
           {data.items.data?.map((item)=>(
             <Box display="flex" p={1}>
             <Box sx={{
                 fontWeight: 700
             }} p={1} flexGrow={1}>
                 <Typography variant='customFont'>
                     Warehouse {item.warehouse_id}
                 </Typography>
             </Box>
             <Box p={1}>
                 <Typography variant='customFont'>
                     {item.opening_stock}
                 </Typography>
             </Box>
         </Box>
           ))}
        </Box>
    )
}

QuantityBox.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuantityBox);