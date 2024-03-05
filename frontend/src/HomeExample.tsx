import ChatBot from "./components/chatbot/ChatBox"

const homeBg = {
    width: '100%',
    height: '100vh',
    backgroundImage: `url('/sitebg.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
}

const Home = () => {

    return (
        <div style={homeBg}>
            <ChatBot />
        </div>
    )
}

export default Home