const Notification = ({message}) => {
  if (Object.keys(message).length === 0) {
    return null
  }
  return (
    <div>
      {message}
    </div>
  )

}

export default Notification