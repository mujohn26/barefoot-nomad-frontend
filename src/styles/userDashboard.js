export const Styles = theme => ({
	TypographyTitle: {
        fontSize: '30px',
        color:'#C4C4C4',
        marginLeft:'6%',
        // overflowX: 'auto',
        ['@media (max-width:780px)']: {
           textAlign:'center'
		},
    },
    Typography:{
        fontSize:'26px',
        color:'#C4C4C4',
        marginLeft:'6%',
        ['@media (max-width:780px)']: {
           fontSize:'18px'
		},
    },
    chipContainer:{
        display:'inline-block',
        textAlign:"center",
        color:"#0094FF",
        marginLeft:"6%",
        ['@media (max-width:780px)']: {
            marginLeft:"3%",
		},
    },
    CircularProgress:{
      marginLeft:"50%",
    }

});