import React ,{
  useState, 
  useRef,
  useEffect 
} from "react"
import { 
    Paper,
    TextField,
    InputAdornment, 
    IconButton
} from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import axios from "axios"
import './style.css'

// Esquema de cores


const paperStyle = {
    width: '25%',
    height: '400px',
    position: 'absolute' as 'absolute',
    background: '#FBF9F1',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    bottom: '100px',
    right: '45px',
    zIndex: 1,
    boxShadow: '1px 1px 3px 0px',
    transform: 'scale(0)'
}

const textBar = {
    width: '98%',
    background: '#3895d3',
    borderRadius: '4px',
    marginBottom: '5px',
    outlined: 'none',
    border: 'none',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '8px'
}

const chatArea = {
    width: '98%',
    maxHeight: '100%',
    overflowY: 'auto' as 'auto',
    overflowX: 'hidden' as 'hidden',
    display: 'flex',
    flexDirection: 'column' as 'column',
    paddingTop: '10px'
}

const chatBalloon = {
  maxWidth: '60%',
  background: '#3895d3',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '6px',
}

const userBalloon = {
  ...chatBalloon,
  alignSelf: 'flex-end',
  marginRight: '4px',
  background: '#E5E1DA',
  color: '#000',
}

const botIcon = {
  width: '68px',
  height: '68px',
  borderRadius: '34px',
  backgroundColor: '#fff',
  backgroundImage: `url('/bot.png')`,
  backgroundSize: 'cover' as 'cover',
  position: 'absolute' as 'absolute',
  bottom: '15px',
  right: '10px',
  margin: '10px',
  boxShadow: '0px 0px 3px 0px',
}

const userAnimation = {
  animation: 'fadeInOut 0.3s ease-in',
}

const chatAnimation = {
  animation: 'fadeInOut 0.5s ease-in',
}

const ChatBot = () => {
  const [input, setInput] = useState('')
  const [responses, setResponses] = useState<string[]>([])
  const [messagesSent, setMessagesSent] = useState<string[]>([])
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [newBalloonIndex, setNewBalloonIndex] = useState<number | null>(null)

  const fetchData = async() => {
    try {
      const response = await axios.post('http://localhost:8000/run', { input })
      console.log(response.data)
      const { answer } = response.data
      setMessagesSent(prevMessagesSent => [...prevMessagesSent, input])
      answer ? 
        setResponses(prevResponses => [...prevResponses, answer])
        :
        setResponses(prevResponses => [...prevResponses, 'Desculpe, não entendi o que quis dizer...'])
    } catch {
      console.log('Erro na requisição.')
    }
  }

  const runChatBot = async() => {
    if (!input) return
  
    await fetchData()
    setInput('')
    setNewBalloonIndex(responses.length)
  }

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [responses])

    return (
      <>
        <div
          style={botIcon} 
          onClick={() => open ? setOpen(false) : setOpen(true)}
        />
        <Paper sx={{
          ...paperStyle,
          transform: open ? 'scale(1)' : 'scale(0)',
          transformOrigin: 'bottom right',
          transition: 'transform 0.3s'
        }}>
            <div ref={chatAreaRef} style={chatArea}>
            {responses.map((response, index) => (
              <React.Fragment key={`message-response-${index}`}>
                <div style={
                    index !== newBalloonIndex ? userBalloon : 
                  { ...userBalloon,
                    ...userAnimation,
                  }}
                >
                  {messagesSent[index]}
                </div>
                <div style={
                    index !== newBalloonIndex ? chatBalloon : 
                  { ...chatBalloon,
                    ...chatAnimation,
                  }}>
                {response}
              </div>
            </React.Fragment>
          ))}
            </div>

            <TextField
                placeholder="Qual a sua dúvida sobre café?"
                variant="standard"
                sx={textBar}
                onChange={e => setInput(e.target.value)}
                value={input}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                      runChatBot();
                  }
                }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          style={{color: '#000'}}
                          onClick={runChatBot}
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
            />
        </Paper>
      </>
    )
}

export default ChatBot