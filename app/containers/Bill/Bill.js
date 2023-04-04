import React from 'react';
import { withStyles, makeStyles, createTheme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Avatar, Badge, Box, Divider, Grid, Paper, Typography, TextField } from '@material-ui/core';
import moment from "moment";


const theme = createTheme();

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#55588B",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    root: {
        '&.MuiAccordionDetails-root': {
            display: 'block'
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    invoiceData: {
        fontSize: '12px !important',
        lineHeight: '30px !important'
    },
    title: {
        lineHeight: '2.5rem !important',
        fontSize: '2.25rem !important',
        color: '#42426C',
        fontWeight: '300',
        marginRight: '20px !important'
    },
    link: {
        padding: '5px 15px',
        backgroundColor: '#E5E7EB',
        color: 'black',
        textDecoration: ' none',
        borderRadius: '10px',
        marginTop: '10px'
    },
    table: {
        minWidth: 700,
    },
    buttonActive: {
        background: '#55588B',
        borderRadius: '10px',
        color: 'white',
        lineHeight: '1.5rem',
        fontWeight: 500,
        fontSize: '.875rem',
        padding: '0.375rem 0.75rem'
    },
    button: {
        borderRadius: '10px',
        color: 'black',
        lineHeight: '1.5rem',
        fontWeight: 500,
        fontSize: '.875rem',
        padding: '0.375rem 0.75rem'
    },
    labelText: {
        fontSize: '12px',
        fontWeight: 700,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: '45px',
        letterSpacing: 'normal',
        color: 'rgb(96, 96, 96)',
        margin: '0px',
        textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        border: 0,
        justifyItems: 'flex-end'
    },
});


function Bill(props) {
    const {
        classes,
        data,
        handleChange
    } = props
    const customClasses = useStyles();
    return (
        <div className={customClasses.root}>
            <Grid item container spacing={2}>
                <Grid md={3}>
                    <Box>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={customClasses.heading}>Create</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {data.contact_name} created this invoice in {moment(data.issued_at).format('ll')}
                                    <br /> <Link to={`/app/update/${data.id}/invoice`} className={customClasses.link}>Edit</Link>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={customClasses.heading}>Send</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ display: 'block' }}>
                                <Typography>
                                    Last Sent: {moment(data.issued_at).format('ll')}
                                </Typography>
                                <br />
                                <button className={customClasses.buttonActive}>Send Email</button>
                                <button className={customClasses.button}>Mark Sent</button>
                                <button className={customClasses.button}>Share Link</button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography className={customClasses.heading}>Get Paid</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Amount Due:  {data.amount}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid md={9}>
                    <Box marginLeft={2}>
                        <Paper elevation={5} square>
                            <Box padding={3}>
                                <Typography variant='subtitle1'>Bill</Typography>
                                <Box display={'flex'} justifyContent={'space-between'} marginY={2}>
                                    <Avatar variant='circular' src='data:image/png;base64,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'></Avatar>
                                    <Box component={'div'}>
                                        <Typography variant='subtitle2'>innobyte</Typography>
                                        <Typography className={customClasses.invoiceData}>{data.contact_email}</Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box marginY={2}>
                                    <Grid container spacing={3}>
                                        <Grid item sm={6}>
                                            <Typography variant='subtitle2'>Bill To</Typography>
                                            <Box>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_name}
                                                    placeholder={data.contact_name===""?'contact_name':''}
                                                    name='contact_name'
                                                    onChange={handleChange}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                            </Box>
                                            <Box>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_address}
                                                    name='contact_address'
                                                    placeholder={data.contact_address===""?'contact_address':''}
                                                    onChange={handleChange}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                            </Box>
                                            <Box display={'flex'} justifyContent={'space-between'}>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_city}
                                                    name='contact_city'
                                                    placeholder={data.contact_city===""?'contact_city':''}
                                                    onChange={handleChange}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_zip_code}
                                                    name='contact_zip_code'
                                                    onChange={handleChange}
                                                    placeholder={data.contact_zip_code===""?'contact_zip_code':''}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_state}
                                                    name='contact_state'
                                                    placeholder={data.contact_state===""?'contact_state':''}
                                                    onChange={handleChange}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                            </Box>
                                            <Box display={'flex'} justifyContent={'space-between'}>
                                                <Typography variant='subtitle2' style={{ marginTop: '10px' }}>Tax Number:
                                                </Typography>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_tax_number}
                                                    name='contact_tax_number'
                                                    placeholder={data.contact_tax_number===""?'contact_tax_number':''}
                                                    onChange={handleChange}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                            </Box>
                                            <Box>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_phone}
                                                    name='contact_phone'
                                                    placeholder={data.contact_phone===""?'contact_phone':''}
                                                    onChange={handleChange}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                            </Box>
                                            <Box>
                                                <TextField
                                                    className={customClasses.labelText}
                                                    value={data.contact_email}
                                                    name='contact_email'
                                                    placeholder={data.contact_email===""?'contact_email':''}
                                                    onChange={handleChange}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '12px'
                                                        }
                                                    }}
                                                >
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid item sm={6}>
                                            <Grid container spacing={1}>
                                                <Grid item sm>
                                                    <Typography className={customClasses.invoiceData}> Invoice Number:</Typography>
                                                </Grid>
                                                <Grid item sm>
                                                    <Typography className={customClasses.invoiceData}>{data.document_number}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item sm>
                                                    <Typography className={customClasses.invoiceData}> Invoice Date:</Typography>
                                                </Grid>
                                                <Grid item sm>
                                                    <Typography className={customClasses.invoiceData}>{moment(data.issued_at).format('ll')}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1}>
                                                <Grid item sm>
                                                    <Typography className={customClasses.invoiceData}>  Due Date:</Typography>
                                                </Grid>
                                                <Grid item sm>
                                                    <Typography className={customClasses.invoiceData}>{moment(data.due_at).format('ll')}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Divider />
                                <TableContainer component={Paper}>
                                    <Table className={customClasses.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Items</StyledTableCell>
                                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                                <StyledTableCell align="right">Price</StyledTableCell>
                                                <StyledTableCell align="right">Amount</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.items.map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.price_formatted}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.total_formatted}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Grid item container spacing={2}>
                                    <Grid sm={6}></Grid>
                                    <Grid sm={6}>
                                        <Box textAlign={'end'} marginY={4}>
                                            <Typography className={customClasses.invoiceData}>Subtotal: ${data.amount}</Typography>
                                            <Divider variant='inset' />
                                            <Typography className={customClasses.invoiceData}>{data.tax_name}({data.tax_rate}%):  {data.tax_amount_formatted}</Typography>
                                            <Divider variant='inset' />
                                            <Typography className={customClasses.invoiceData}>Total: ${data.amount}</Typography>
                                            <Divider variant='inset' />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Bill;