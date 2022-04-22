import './Modal.css';

export default function Modal({ handleClose, children })  {

  return (
    <div >
        <div className='modal'>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
      </div>
    </div>
  );
};