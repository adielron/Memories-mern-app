import React, {useState,useEffect} from 'react';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
//importing hook from react-redux
//dispatch an action
import {useDispatch} from 'react-redux';
import {getPosts, getPostBySearch} from '../../actions/posts'

import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from "material-ui-chip-input";

import Pagination from "../Pagination";

import useStyles from './styles';


function useQuery() {
  return new URLSearchParams(useLocation().search)
}

 const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  //allows us to use as hooks
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes= useStyles();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  console.log('page is ' +page);


  //updates component
  //**

  //on every chage of id and refresh we are going to get new post
  // useEffect(()=>{
  //   console.log('refresh from home');
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

const searchPost = () => {
  //removes whitespace
  if (search.trim() || tags ){
    //dispatch -> setSearch post return only queryd posts
    // cannot pass an array throgh url params
    //that why we nee to convery to string the tags
    dispatch(getPostBySearch({ search, tags: tags.join(',') }))
    // components refresh because we move to new page
    navigate(`/posts/search?searchQuery=${search  || 'none' }&tags=${tags.join(',')}`)
  } else{
    navigate('/')
  }
}

  const handleKeyPress = (e) => {
    //if pressed enter
    if (e.keycode === 13){
      //search post
      searchPost();
    }
  }

const handleAdd = (tag) => setTags([...tags, tag])

const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={6}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
          <AppBar className={classes.appBarSearch} position='static' color='inherit'>
            <TextField
              name='search'
              variant='outlined'
              label='Search Memories'
              onKeyPress={handleKeyPress}
              fullWidth
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
            />
            <ChipInput
              style={{ margin: '10px 0' }}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label='Search Tags'
              variant= 'outlined'
            />
            <Button variant='contained' onClick={searchPost} className={classes.searchButton} color="primary">Search</Button>
          </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            {
              (!searchQuery && !tags.length) && (
                <Paper elevation={6} className={classes.pagination} >
                  <Pagination page={page} />
                </Paper>
              )
            }


          </Grid>
        </Grid>
    </Container>
    </Grow>

  )
}

export default Home;
