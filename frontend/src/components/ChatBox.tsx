import { 
    Paper,
    TextField,
    InputAdornment, 
    IconButton
} from "@mui/material"
import SendIcon from '@mui/icons-material/Send'

const paperStyle = {
    width: '96%',
    height: '96vh',
    margin: '10px auto',
    background: '#1B1A55',
    color: '#9290C3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: '10px',
}

const textBar = {
    width: '98%',
    background: '#535C91',
    borderRadius: '10px',
    '& .MuiOutlinedInput-input': {
        '&:focus': {
          background: '#8088b9',
          borderRadius: '10px',
          transition: '0.3s ease-out'
        },
      },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          border: 'none',
          outline: 0,
        },
      },
}

const chatArea = {
    width: '98%',
    height: '70%',
}

const ChatBot = () => {

    return (
        <Paper sx={paperStyle}>
            <h3 style={{alignSelf: 'flex-start', marginLeft: '10px'}}>Logo</h3>
            <div style={chatArea}>
                
            </div>

            <TextField
                placeholder="Me faça uma pergunta..."
                sx={textBar}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton style={{color: '#1B1A55'}}>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
            />
        </Paper>
    )
}

export default ChatBot