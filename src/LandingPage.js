import React, { Fragment } from 'react';
import movies from './movies';
import FilmCard from './components/FilmCard/FilmCard';
import {makeStyles} from '@material-ui/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {  Grid, Modal } from '@material-ui/core';
import FilmModal from './components/FilmModal/FilmModal';
const useStyles = makeStyles((theme)=>({
    appBar: {
        marginTop: 24,
        paddingBottom: 16,
        marginBottom: 16,
        marginLeft: 32,
        marginRight: 30,
        borderBottom: '1px solid #eee',
    },
    username: {
        letterSpacing: '.8px',
        fontSize: '20px',
        color: '#999',
        fontWeight: '400',
        marginRight: '8px'
    },
    logout: {
        '& > svg': {
            fontSize: '30px',
            color: 'rgb(230, 62, 16)',
            cursor: 'pointer'
        }
    },
    filmCards: {
        marginTop: 8,
        marginLeft: 4,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: '10px',
        // backgroundImage: "linear-gradient(to right,#edf0ee,#e1e8e3)",
        border: '1px solid #eee'
    },
    movieContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginLeft: 8,
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: '.7px' 
    }
}))
const LandingPage = props => {
const classes = useStyles();
  return (
    <Fragment>
        <Modal
            className={classes.modal}
            open={props.selectedMovie !== null}
            onClose={props.onDeselectMovie}
        >
            {
                props.selectedMovie 
                ?
                <FilmModal
                    onClose={props.onDeselectMovie}
                   staticData = {movies[props.selectedMovie.id]}
                   dynamicData = {props.selectedMovie.data}
                   username = {props.username}
                   onSaveReview = {props.onSaveReview}
                /> 
                :
                <div></div>
            
            }
            
        </Modal>
        <Grid container className={classes.content}>
            <Grid item xs={12} className={classes.appBar}>
                <Grid container>
                    <Grid item xs={8} style={{display:'flex',alignItem: 'center'}}>
                        <span className={classes.title}>{"Review Movies"}</span>
                    </Grid>
                    <Grid item xs={4} style={{display:'flex',justifyContent:'flex-end',alignItem: 'center'}}>
                        <span className={classes.username}>{props.username}</span>
                        <span className={classes.logout} onClick={props.onLogOut}><ExitToAppIcon /></span>
                    </Grid>
                </Grid> 
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.movieContainer}>
                    {Object.keys(movies).map((id)=>{
                        return(
                            <Grid item key={id} className={classes.filmCards}>
                                <FilmCard
                                   image={movies[id].image}
                                   name={movies[id].name}
                                   year={movies[id].year}
                                   genre={movies[id].genre}
                                   duration={movies[id].duration}
                                   onSelect={()=>props.onSelectMovie(id)}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    </Fragment>    
    
  )
}
 
export default LandingPage
 
LandingPage.displayName = "LandingPage"