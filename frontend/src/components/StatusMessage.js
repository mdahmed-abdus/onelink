function StatusMessage({ status }) {
  let style = 'italic opacity-50'; // style for info

  if (status.style === 'success') {
    style = 'text-success';
  }

  if (status.style === 'error') {
    style = 'text-danger';
  }

  return (
    status.message && (
      <p className={`mt-4 text-center ${style}`}>{status.message}</p>
    )
  );
}

export default StatusMessage;
