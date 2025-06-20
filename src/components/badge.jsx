export default function Badge({ status, message }) {
  const statusStyles = {
    applied: {
      color: '#FDBA40',
      textColor: '#000',
    },
    pending: {
      color: '#9379DF',
      textColor: '#fff',
    },
    progress: {
      color: '#0542D4',
      textColor: '#fff',
    },
    completed: {
      color: '#006E2C',
      textColor: '#fff',
    },
    saved_hustles: {
      color: '#006E2C',
      textColor: '#fff',
    }
  };

  const { color, textColor } = statusStyles[status]

  return (
    <button className={`flex badge-button justify-center items-center`} style={{ background: color}}>
      <h1 className={`badge-button-text`} style={{ color: textColor }}>
        {message}
      </h1>
    </button>
  );
}
