const Notification = ({message}) => {
  console.log(message)
  if (Object.keys(message).length === 0) {
    return null
  }
  if (message.type === 'success') {
    return (
      <div className='success'>
        {message.value}
      </div>
    )
  }
  return (
    <div className='error'>
      {message.value}
    </div>
  )

}

export default Notification