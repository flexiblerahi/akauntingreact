import React from 'react';
import {
    withStyles,
    createTheme
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Box, Typography, Divider, TextField } from '@material-ui/core';

const theme = createTheme();

theme.typography.customFont = {
    fontSize: '0.875rem',
    '@media (min-width:600px)': {
        fontSize: '0.875rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
    },
};


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

function ItemDetails({data}) {
console.log(data)
    const boxSX = {
        "&:hover": {
            backgroundColor: '#F3F3F3'
        },
    };
    const boxHoverPrice = {
        "&:hover": {
            backgroundColor: '#EBEBEB'
        },
    };


    const textfieldfontSize = 14

    return (
        <>
            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                <Box sx={{
                    fontWeight: 700
                }} p={1} flexGrow={1} bgcolor="#F3F3F3">
                    <Typography variant='customFont'>
                        Product Type
                    </Typography>
                </Box>
                <Box p={1} bgcolor="#F3F3F3">
                    <Typography variant='customFont'>
                       {data.type}
                    </Typography>
                </Box>
            </Box>
            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                <Box sx={{
                    fontWeight: 700
                }} p={1} flexGrow={1}>
                    <Typography variant='customFont'>
                        SKU
                    </Typography>
                </Box>
                <Box p={1} bgcolor="#FFFFFF">
                    <TextField
                        value={data.sku}
                        style={{ 'backgroundColor': 'white' }}
                        inputProps={{
                            style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                        }}
                    />
                </Box>
            </Box>
            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                <Box sx={{
                    fontWeight: 700
                }} p={1} flexGrow={1}>
                    <Typography variant='customFont'>
                        Category
                    </Typography>
                </Box>
                <Box p={1} bgcolor="#FFFFFF">
                    <TextField
                        value={data.category}
                        style={{ 'backgroundColor': 'white' }}
                        inputProps={{
                            style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                        }}
                    />
                </Box>
            </Box>
            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                <Box sx={{
                    fontWeight: 700
                }} p={1} flexGrow={1}>
                    <Typography variant='customFont'>
                        Description
                    </Typography>
                </Box>
                <Box p={1} bgcolor="#FFFFFF">
                    <TextField
                        value={data.description}
                        style={{ 'backgroundColor': 'white' }}
                        inputProps={{
                            style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                        }}
                    />
                </Box>
            </Box>
            <Divider />
            <Box bgcolor={"#F3F3F3"} boxShadow={3} p={1}>
                <Box sx={boxSX} display="flex" p={1}>
                    <Box p={1} flexGrow={1}>
                        <Typography variant='h6'>
                            Pricing & Cost
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <Typography>

                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={boxHoverPrice} display="flex" p={1}>
                    <Box sx={{
                        fontWeight: 700
                    }} p={1} flexGrow={1}>
                        <Typography variant='customFont'>
                            Purchase Price
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <TextField
                            value={data.purchase_price}
                            style={{ 'backgroundColor': 'white' }}
                            inputProps={{
                                style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={boxHoverPrice} display="flex" p={1}>
                    <Box sx={{
                        fontWeight: 700
                    }} p={1} flexGrow={1}>
                        <Typography variant='customFont'>
                            Sale price
                        </Typography>
                    </Box>
                    <Box p={1}>
                        <TextField
                            value={data.sale_price}
                            style={{ 'backgroundColor': 'white' }}
                            inputProps={{
                                style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

ItemDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
    ItemDetails
);
