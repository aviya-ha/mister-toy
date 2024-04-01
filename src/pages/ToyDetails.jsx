import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'
import { Reviews } from '../cmps/Reviews.jsx'



function getEmptyMsg() {
  return {
    txt: '',
  }
}

export function ToyDetails() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const [msg, setMsg] = useState(getEmptyMsg())
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      showErrorMsg('Cant load toy')
      navigate('/toy')
    }
  }

  function handleMsgChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setMsg((msg) => ({ ...msg, [field]: value }))
  }

  async function onSaveMsg(ev) {
    ev.preventDefault()
    const savedMsg = await toyService.addMsg(toy._id, msg.txt)
    setToy((prevToy) => ({
      ...prevToy,
      msgs: [...(prevToy.msgs || []), savedMsg],
    }))
    setMsg(getEmptyMsg())
    showSuccessMsg('Msg saved!')
  }

  async function onRemoveMsg(msgId) {
    const removedMsgId = await toyService.removeMsg(toy._id, msgId)
    setToy((prevToy) => ({
      ...prevToy,
      msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
    }))
    showSuccessMsg('Msg removed!')
  }

  //msg example
  // {
  //     id: 'm101',
  //     txt: 'Great toy, how much',
  //     by: {
  //     _id: 'u101',
  //     fullname: 'Puki Ga'
  //     }
  // }

  const { txt } = msg
  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details"> 
    <img src={toy.img} alt={toy.name} />

    <section className='main-details'>
      
      <div className='head'>
        <h1>Toy name : {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      </div>

<section className='msgs'>
      <ul className='msg-list clean-list'>
        {toy.msgs &&
          toy.msgs.map((msg) => (
            <li key={msg.id}>
              By: {msg.by.fullname} - {msg.txt}
            { user && msg.by._id === user._id && <button className='btn' type="button" onClick={() => onRemoveMsg(msg.id)}>
                X
              </button>}
            </li>
          ))}
      </ul>

      <form className="login-form" onSubmit={onSaveMsg}>
        <input
          type="text"
          name="txt"
          value={txt}
          placeholder="Username"
          onChange={handleMsgChange}
          required
          autoFocus
        />
        <button className='btn'>Send</button>
      </form>
</section>
      <Reviews toy={toy}/>
      <Link className='back-btn' to={`/toy`}>Back</Link> 
      </section>
    </section>
  )
}
