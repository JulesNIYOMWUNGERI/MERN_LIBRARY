import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Search from './Search';

const Searchs = ({ setCurrentId }) => {

    const { searchs } = useSelector((state) => state.books);
    console.log(searchs)


  return (
    !searchs?.length ? <CircularProgress /> : (
        <Grid container alignItems='stretch' spacing={1}>
            {searchs.map((search) => (
              <Grid key={search._id} item xs={12} md={3} lg={3} sm={4}>
                <Search search={search} setCurrentId={setCurrentId} />
              </Grid>
            ))}
        </Grid>
    )
  )
}

export default Searchs
