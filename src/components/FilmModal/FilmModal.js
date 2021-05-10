import React,{useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/styles'
import EventIcon from '@material-ui/icons/Event';
import CameraRollIcon from '@material-ui/icons/CameraRoll';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import WorkIcon from '@material-ui/icons/Work';
import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Rating from '@material-ui/lab/Rating';
const useStyles = makeStyles((theme)=>({
    content: {
        background: '#fff',
        borderRadius: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'calc(100% - 36px)',
        maxWidth: '900px',
        transform: 'translate(-50%,-50%)',
        padding: 16
    },
    flexEnd: {
        display: 'flex',justifyContent: 'flex-end',alignItem: 'center'
    },
    closeButtonSection: {
        position: 'relative',
        '&>button': {
            position: 'absolute',
            right: 0,
            '&>svg':{
                color: '#000'
            }
        }
    },
    title: {
        marginLeft: 16,
        fontSize: '22px',
        fontWeight: 600,
        letterSpacing: '.8px',
    },
    subtext: {
        fontSize: '16px', letterSpacing: '.6px',color: '#999'
    },
    imgSection: {
        width: 250,
        height: 400,
        boxShadow: '9px 14px 17px -10px rgba(166,161,166,1)',
        borderRadius: 6,
        '&>img': {
            border: '2px solid #777',
            width: '100%',
            height: '100%',
            borderRadius: 6,
        }
    },
    descriptionList: {
        maxWidth: 300
    },
    link: {
        cursor: 'pointer', 
        color: '#3bf'
    },
    reviewsSection: {
        // width: 300
    },
    starBox: {
        display: 'flex',
        alignItems: 'center',
    },
    commentBox: {
        marginTop: '20px'
    },
    reviewSubmitButton: {
        marginTop: '20px',
        textAlign: 'center'
    },
    reviewItem: {
        border: '1px solid #eee',
        borderRadius: '5px'
    },
    currentUserRatingBox: {
        paddingBottom: 26,
        borderBottom: '1px solid #eee'
    }
}))
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
const FilmModal = props => {
const classes = useStyles();
const [userRating,setUserRating] = useState({star: 0,comment: ''});
const [hoverStar,setHoverStar] = useState(-1);
const [showCommentBox,setShowCommentBox] = useState(false);
useEffect(()=>{
    if(props.dynamicData[props.username]){
        setUserRating(props.dynamicData[props.username]);
    }else{
        setUserRating({star:0,comment: ''});
    }
},[]);
const onSaveUserReview = ()=>{
    setShowCommentBox(false);
    props.onSaveReview(userRating);
}
  return (
    <Grid container className={classes.content}>
        <Grid item lg={11} xs={10}>
            <span className={classes.title}>{props.staticData.name}</span>
        </Grid>
        <Grid item lg={1} xs={2} className={classes.closeButtonSection}>
            <IconButton
                onClick = {props.onClose}  
            >
                <CloseOutlinedIcon />
            </IconButton>
        </Grid> 
        <Grid item xs={12} style={{marginTop: 8}}>
            <Grid container spacing={2}>
                <Grid item >
                    <div className={classes.imgSection}>
                        <img src={props.staticData.image} alt={props.staticData.name} />
                    </div>
                </Grid>
                <Grid item style={{marginLeft: 8}}>
                    <List className={classes.descriptionList}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <EventIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Release Date" secondary={props.staticData.more_info.rel_date} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Director" secondary={props.staticData.more_info.directors} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <AttachMoneyIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Box Office" secondary={props.staticData.more_info.box_office} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <CameraRollIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Plot" secondary={
                        <span>
                            {props.staticData.desc.slice(0,200) + '...'}
                            <a href={props.staticData.wikiPage} target='_blank' className={classes.link}>{'Read More'}</a>
                        </span>} 

                        />
                      </ListItem>
                    </List>
                </Grid>
                <Grid item className={classes.reviewsSection}>
                    {
                        <>
                        <div className={classes.currentUserRatingBox}>
                            <p>Your Review.</p>
                            <div className={classes.starBox}>
                              <Rating
                                name="hover-feedback"
                                value={userRating.star}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                  setUserRating({...userRating,star:newValue});
                                  setShowCommentBox(true);
                                }}
                                onChangeActive={(event, newHover) => {
                                  setHoverStar(newHover);
                                }}
                              />
                              {userRating.star !== null && <Box ml={2}>{labels[hoverStar !== -1 ? hoverStar : userRating.star]}</Box>}
                            </div>
                            {showCommentBox &&
                                <>
                                <div className={classes.commentBox}>
                                    <TextField
                                      id="filled-multiline-static"
                                      placeholder={'Want to comment anything'}
                                      multiline
                                      fullWidth={true}
                                      rows={4}
                                      value={userRating.comment}
                                      onChange={(e)=>setUserRating({...userRating,comment:e.target.value})}
                                    />
                                </div>
                                <div className={classes.reviewSubmitButton}>
                                    <Button color={'primary'} variant={'contained'} onClick={onSaveUserReview}>
                                        <DoneAllIcon />  Done
                                    </Button>
                                </div>
                                </>
                            }
                            
                        </div>
                        {!showCommentBox
                         &&
                        <div className={classes.recentComments}>
                            <p>Other Reviews</p>
                            <List style={{marginTop: 0,paddingTop: 0 }}>
                                {Object.keys(props.dynamicData).map((user_email)=>{
                                    return(user_email === props.username ?null:
                                        <ListItem alignItem={'flex-start'} key={user_email} style={{marginTop: 0,paddingTop: 0 }} className={classes.reviewItem}>
                                            <ListItemAvatar>
                                                <Avatar alt={user_email} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user_email}
                                                secondary={
                                                    <>
                                                    <div className={classes.starBox}>
                                                      <Rating
                                                        value={props.dynamicData[user_email].star}
                                                        precision={0.5}
                                                        size={'small'}
                                                        disabled
                                                      />
                                                    </div>
                                                    <span>{props.dynamicData[user_email].comment}</span>
                                                    </>
                                                }
                                            ></ListItemText>
                                        </ListItem>
                                    )
                                })}
                            </List>
                           
                        </div>
                        }
                        </>
                    }
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}
 
export default React.forwardRef((props,ref)=><FilmModal {...props} ref={ref} />)
 
FilmModal.displayName = "FilmModal"