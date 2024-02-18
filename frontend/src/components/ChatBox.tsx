import React from "react"
import { 
    Paper,
    TextField,
    InputAdornment, 
    IconButton
} from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import axios from "axios"
import { 
  useState, 
  useRef,
  useEffect 
} from "react"

interface ChatResponse {
  generated_text: string;
}

const paperStyle = {
    width: '70%',
    height: '96vh',
    margin: '10px auto',
    background: '#1B1A55',
    color: '#9290C3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '10px',
}

const textBar = {
    width: '98%',
    background: '#535C91',
    borderRadius: '10px',
    marginBottom: '10px',
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
    maxHeight: '100%',
    overflowY: 'auto' as 'auto',
    overflowX: 'hidden' as 'hidden',
    display: 'flex',
    flexDirection: 'column' as 'column',
    paddingTop: '10px'
}

const chatBalloon = {
  maxWidth: '60%',
  background: '#070F2B',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '14px',
}

const userBalloon = {
  ...chatBalloon,
  alignSelf: 'flex-end',
  marginRight: '4px',
  background: '#666c92',
  color: '#000',
}

const ChatBot = () => {
  const [input, setInput] = useState('')
  const [responses, setResponses] = useState<ChatResponse[]>([])
  const [messagesSent, setMessagesSent] = useState<string[]>([])
  const chatAreaRef = useRef<HTMLDivElement>(null)

  const fetchData = async() => {
    try {
      const response = await axios.post('http://localhost:8000/run', { input })
      console.log(response.data)
      const justRes: { response: ChatResponse } = response.data
      setResponses(prevResponses => [...prevResponses, justRes.response])
      setMessagesSent(prevMessagesSent => [...prevMessagesSent, input])
    } catch {
      console.log('Error')
    }
  }

  const runChatBot = async() => {
    await fetchData()
    setInput('')
  }

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [responses])

    return (
        <Paper sx={paperStyle}>
            <div ref={chatAreaRef} style={chatArea}>
            {responses.map((response, index) => (
              <React.Fragment key={`message-response-${index}`}>
                <div style={userBalloon}>
                  {messagesSent[index]}
                </div>
                <div style={chatBalloon}>
                  {response.generated_text}
                </div>
              </React.Fragment>
            ))}
            </div>

            <TextField
                placeholder="Write something cool..."
                sx={textBar}
                variant="outlined"
                onChange={e => setInput(e.target.value)}
                value={input}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          style={{color: '#1B1A55'}}
                          onClick={runChatBot}
                        >
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