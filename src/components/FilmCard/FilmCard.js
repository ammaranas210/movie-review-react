import React from 'react'
import {makeStyles} from '@material-ui/styles'
const useStyles = makeStyles((theme)=>({
    imageSection: {
        width: "11rem",
        height: "11rem",
        cursor: 'pointer',
        clipPath: "circle(50% at 50% 50%)",
        position: "relative",
        "&:hover $imageSection_caption":{
            transform: "translate(-50%,-50%)",
            opacity: "1"
        },
        "&:hover $imageSection_img":{
            transform:"scale(1.2)",
            filter: "blur(3px) brightness(80%)"
        }
    },
    imageSection_img: {
        height: "100%",
        borderRadius: '50%',
        // outline: "4px solid red",
        // outlineOffset: "2px",
        width: '100%',
        transition: "all .5s",
        backfaceVisibility: "hidden",
        transform: "scale(1)"
    },
    imageSection_caption: {
        position: "absolute",
        color: '#fff',
        left: "50%" ,
        top: "50%",
        fontSize: "1rem",
        transform: "translate(-50%,20%)",
        opacity: "0",
        transition: "all .5s",
        backfaceVisibility: "hidden"
    },
    title: {
        fontSize: '.9rem',
        fontWeight: 600,
        textAlign: 'center'
    },
    subtext: {
        fontSize: '.8rem',
        textAlign: 'center'
    }

}))
const FilmCard = props => {
const classes = useStyles();
  return (
    <figure className={classes.imageSection} onClick={props.onSelect}>
        <img src={props.image} alt={props.name} className={classes.imageSection_img} />
        <figcaption className={classes.imageSection_caption}>
            <p className={classes.title}>{props.name}</p>
            <p className={classes.subtext}>{props.genre}</p>
            <p className={classes.subtext}>{props.duration}</p>
            <p className={classes.subtext}>{props.year}</p>
        </figcaption>
    </figure>
  )
}
 
export default FilmCard
 
FilmCard.displayName = "FilmCard"