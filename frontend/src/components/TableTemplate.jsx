import React, { useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination, Paper, Box } from '@mui/material';

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    return (
        <Paper 
            elevation={0} 
            sx={{ 
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
        >
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value
                                                    }
                                                </StyledTableCell>
                                            );
                                        })}
                                        <StyledTableCell align="center">
                                            <ButtonHaver row={row} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ 
                borderTop: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb'
            }}>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    sx={{
                        '.MuiTablePagination-toolbar': {
                            padding: '12px 24px',
                            minHeight: '56px',
                        },
                        '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            fontWeight: 500,
                        },
                        '.MuiTablePagination-select': {
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            padding: '4px 8px',
                        },
                        '.MuiIconButton-root': {
                            color: '#8b5cf6',
                            '&:hover': {
                                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            },
                            '&.Mui-disabled': {
                                color: '#d1d5db',
                            }
                        }
                    }}
                />
            </Box>
        </Paper>
    )
}

export default TableTemplate