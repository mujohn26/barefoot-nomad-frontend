

export const useStyles = theme => ({

	paper: {
		textAlign: "center",
		color: "#000000",
		whiteSpace: "nowrap",
		marginTop: "2vh",
		marginBottom: "2vh",
		width: '693px',
		height: '285px',
		boxShadow:' 0.2px 0.2px 2px rgba(0, 0, 0, 0.25)',
		['@media (max-width:780px)']: { 
			width: '368px',
            margin:'-100px',
			height:'350px',
		  },
		  ['@media (min-width:751px) and (max-width:980px)']: { 
			width: '600px',
			height: '357px',
			margin:'70px -300px',
		  }
		
      },
      	paper2: {
		textAlign: 'center',
		color: '#000000',
		whiteSpace: 'nowrap',
		marginTop: '2vh',
		marginBottom: '2vh',
		margin:'none',
		width: '693px',
		height: '357px',
        boxShadow: ' 0.2px 0.2px 2px rgba(0, 0, 0, 0.25)',
        ['@media (max-width:750px)']: { 
			width: '368px',
            margin:'-100px',
            height:'380px'
		  },
		  ['@media (min-width:751px) and (max-width:1024px)']: { 
			width: '600px',
			height: '357px',
			margin:'70px -300px',
		  }
	},
	  title: {
		fontFamily: [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(','),
	fontStyle: 'normal',
	fontWeight: '200',
	fontSize: '24px',
	lineHeight: '28px',
	textAlign: 'center',
	color: '#7D7D7D',
},
subtitle: {
	fontFamily: 'Roboto',
	fontStyle: 'normal',
	fontWeight: 'normal',
	fontSize: '14px',
	lineHeight: '16px',
	textAlign: 'center',
	color: '#C4C4C4',
},
inputField: {

    width:'350px',
	 height:'40px',
	 ['@media (max-width:750px)']: { 
		width: '308.77px',

	  }
  },
button: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    width:'350px',
     height:'40px',
    lineHeight: 1.5,
    color:'white',
    textAlign:'center',
	['@media (max-width:750px)']: { 
		width: '308.77px',

	  }
  },


});

